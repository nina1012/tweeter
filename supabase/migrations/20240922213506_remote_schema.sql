

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."reply_info" AS (
	"reply_id" "uuid",
	"replier_id" "uuid",
	"content" "text",
	"image" "text"
);


ALTER TYPE "public"."reply_info" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."add_bookmark"("p_user_id" "uuid", "p_tweet_id" "uuid") RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  -- Initialize bookmarks array if it's NULL
  UPDATE users
  SET bookmarks = COALESCE(bookmarks, '{}')
  WHERE user_id = p_user_id
  AND bookmarks IS NULL;

  -- Add the tweet_id to the user's bookmarks array if not already present
  IF NOT EXISTS (
    SELECT 1
    FROM unnest((SELECT bookmarks FROM users WHERE user_id = p_user_id)) AS bookmark_id
    WHERE bookmark_id = p_tweet_id
  ) THEN
    UPDATE users
    SET bookmarks = array_append(bookmarks, p_tweet_id)
    WHERE user_id = p_user_id;
  END IF;

  -- Initialize bookmarks array in tweets table if it's NULL (after renaming saves to bookmarks)
  UPDATE tweets
  SET bookmarks = COALESCE(bookmarks, '{}')
  WHERE tweet_id = p_tweet_id
  AND bookmarks IS NULL;

  -- Add the user_id to the tweet's bookmarks array
  UPDATE tweets
  SET bookmarks = array_append(bookmarks, p_user_id)
  WHERE tweet_id = p_tweet_id;
END;
$$;


ALTER FUNCTION "public"."add_bookmark"("p_user_id" "uuid", "p_tweet_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."add_new_tweet"("user_id" "uuid", "tweet_content" "text", "tweet_image" "text", "is_reply" boolean, "is_retweet" boolean, "original_tweet_id" "uuid" DEFAULT NULL::"uuid", "original_author_id" "uuid" DEFAULT NULL::"uuid") RETURNS "jsonb"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    new_tweet_id UUID;
    new_tweet_created_at TIMESTAMPTZ := now();
    new_tweet JSONB;
BEGIN
    -- Insert the tweet into the database
    INSERT INTO tweets (
        author_id, created_at, content, image, is_reply, is_retweet
    )
    VALUES (
        user_id, new_tweet_created_at, tweet_content, tweet_image, is_reply, is_retweet
    )
    RETURNING tweet_id INTO new_tweet_id;

    -- Update the new tweet with original_tweet_id and original_author_id
    UPDATE tweets AS t
    SET
        original_tweet_id = COALESCE(add_new_tweet.original_tweet_id, t.tweet_id),
        original_author_id = COALESCE(add_new_tweet.original_author_id, t.author_id)
    WHERE t.tweet_id = new_tweet_id;

    -- Construct the JSON object for the tweet
    new_tweet := jsonb_build_object(
        'id', new_tweet_id,
        'author_id', user_id,
        'created_at', new_tweet_created_at,
        'content', tweet_content,
        'image', tweet_image,
        'hashtags', jsonb '[]', -- Initialize empty arrays
        'replies', jsonb '[]',
        'retweets', jsonb '[]',
        'likes', jsonb '[]',
        'saves', jsonb '[]',
        'isRetweet', is_retweet,
        'isReply', is_reply,
        'original_tweet_id', COALESCE(original_tweet_id, new_tweet_id),
        'original_author_id', COALESCE(original_author_id, user_id)
    );

    -- Return the JSON object along with the user_id
    RETURN jsonb_build_object('tweet', new_tweet, 'user_id', user_id);
END;
$$;


ALTER FUNCTION "public"."add_new_tweet"("user_id" "uuid", "tweet_content" "text", "tweet_image" "text", "is_reply" boolean, "is_retweet" boolean, "original_tweet_id" "uuid", "original_author_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."add_retweet"("p_tweet_id" "uuid", "p_user_id" "uuid", "p_original_tweet_id" "uuid", "p_original_author_id" "uuid") RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    -- Insert the retweet
    INSERT INTO retweets (tweet_id, user_id, original_tweet_id, original_author_id)
    VALUES (p_tweet_id, p_user_id, p_original_tweet_id, p_original_author_id);
    
    -- Update the original tweet's retweets array
    UPDATE tweets
    SET retweets = array_append(tweets.retweets, p_user_id)
    WHERE tweets.tweet_id = p_original_tweet_id;
    
    -- Update the isRetweeted field to true
    UPDATE tweets
    SET is_retweet = true
    WHERE tweet_id = p_original_tweet_id;
END;
$$;


ALTER FUNCTION "public"."add_retweet"("p_tweet_id" "uuid", "p_user_id" "uuid", "p_original_tweet_id" "uuid", "p_original_author_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."add_retweet"("p_user_id" "uuid", "p_tweet_id" "uuid", "p_original_tweet_id" "uuid", "p_original_author_id" "uuid", "p_images" "text"[]) RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  -- Initialize retweets array if it's NULL
  UPDATE users
  SET retweets = COALESCE(retweets, '{}')
  WHERE user_id = p_user_id
  AND retweets IS NULL;

  -- Add the tweet_id to the user's retweets array if not already present
  IF NOT EXISTS (
    SELECT 1
    FROM unnest((SELECT retweets FROM users WHERE user_id = p_user_id)) AS retweet_id
    WHERE retweet_id = p_tweet_id
  ) THEN
    UPDATE users
    SET retweets = array_append(retweets, p_tweet_id)
    WHERE user_id = p_user_id;
  END IF;

  -- Initialize retweets array in tweets table if it's NULL
  UPDATE tweets
  SET retweets = COALESCE(retweets, '{}')
  WHERE tweet_id = p_original_tweet_id
  AND retweets IS NULL;

  -- Add the user_id to the tweet's retweets array
  UPDATE tweets
  SET retweets = array_append(retweets, p_user_id),
      images = p_images
  WHERE tweet_id = p_original_tweet_id;
END;
$$;


ALTER FUNCTION "public"."add_retweet"("p_user_id" "uuid", "p_tweet_id" "uuid", "p_original_tweet_id" "uuid", "p_original_author_id" "uuid", "p_images" "text"[]) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."bookmark_tweet"("p_tweet_id" "uuid", "p_user_id" "uuid") RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  -- Update the tweet to add the user_id to the saves array if not already present
  IF NOT EXISTS (
    SELECT 1
    FROM unnest(ARRAY(
      SELECT saves
      FROM tweets
      WHERE tweet_id = p_tweet_id
    )) AS save_user_id
    WHERE save_user_id = p_user_id
  ) THEN
    UPDATE tweets
    SET saves = array_append(saves, p_user_id)
    WHERE tweet_id = p_tweet_id;
  ELSE
    -- Remove the user_id from the saves array if already present
    UPDATE tweets
    SET saves = array_remove(saves, p_user_id)
    WHERE tweet_id = p_tweet_id;
  END IF;
END;
$$;


ALTER FUNCTION "public"."bookmark_tweet"("p_tweet_id" "uuid", "p_user_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."delete_tweet"("original_author_id" "uuid", "tweet_id" "uuid") RETURNS TABLE("deleted_tweet_id" "uuid", "deleted_author_id" "uuid", "deleted_content" "text", "deleted_image" "text", "deleted_created_at" timestamp with time zone)
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  -- Delete the tweet and capture the deleted tweet details
  RETURN QUERY
  DELETE FROM tweets
  WHERE tweets.tweet_id = delete_tweet.tweet_id
  RETURNING
    tweets.tweet_id AS deleted_tweet_id,
    tweets.author_id AS deleted_author_id,
    tweets.content AS deleted_content,
    tweets.image AS deleted_image,
    tweets.created_at AS deleted_created_at;

  -- Delete all replies to the tweet
  DELETE FROM tweets
  WHERE tweets.original_tweet_id = delete_tweet.tweet_id
    AND tweets.is_reply = true;

  -- Delete all retweets of the tweet
  DELETE FROM tweets
  WHERE tweets.original_tweet_id = delete_tweet.tweet_id
    AND tweets.is_retweet = true;
END;
$$;


ALTER FUNCTION "public"."delete_tweet"("original_author_id" "uuid", "tweet_id" "uuid") OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."tweets" (
    "tweet_id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "image" "text",
    "likes" "uuid"[] DEFAULT '{}'::"uuid"[],
    "content" "text" NOT NULL,
    "is_reply" boolean DEFAULT false,
    "retweets" "uuid"[] DEFAULT '{}'::"uuid"[],
    "is_retweet" boolean DEFAULT false,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "author_id" "uuid" NOT NULL,
    "original_tweet_id" "uuid",
    "original_author_id" "uuid",
    "bookmarks" "uuid"[],
    "replies" "jsonb"[] DEFAULT ARRAY[]::"jsonb"[]
);

ALTER TABLE ONLY "public"."tweets" FORCE ROW LEVEL SECURITY;


ALTER TABLE "public"."tweets" OWNER TO "postgres";


COMMENT ON TABLE "public"."tweets" IS 'Table for storing users'' tweets';



CREATE OR REPLACE FUNCTION "public"."get_recent_tweets"("user_id" "uuid", "last_created_tweet" timestamp with time zone, "tweets_limit" integer) RETURNS SETOF "public"."tweets"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  RETURN QUERY
  SELECT * FROM tweets
  WHERE author_id = user_id
  AND created_at < last_created_tweet
  ORDER BY created_at DESC
  LIMIT tweets_limit;
END;
$$;


ALTER FUNCTION "public"."get_recent_tweets"("user_id" "uuid", "last_created_tweet" timestamp with time zone, "tweets_limit" integer) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."like_tweet"("p_tweet_id" "uuid", "p_user_id" "uuid") RETURNS SETOF "public"."tweets"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  -- Update the likes array in the tweets table
  UPDATE tweets
  SET likes = array_append(likes, p_user_id)
  WHERE tweet_id = p_tweet_id
  AND NOT (p_user_id = ANY(likes));

  -- Update the likes array in the users table
  UPDATE users
  SET likes = array_append(likes, p_tweet_id)
  WHERE user_id = p_user_id
  AND NOT (p_tweet_id = ANY(likes));

  -- Return the updated tweet
  RETURN QUERY
  SELECT * FROM tweets WHERE tweet_id = p_tweet_id;
END;
$$;


ALTER FUNCTION "public"."like_tweet"("p_tweet_id" "uuid", "p_user_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."remove_bookmark"("p_user_id" "uuid", "p_tweet_id" "uuid") RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  -- Remove the tweet_id from the user's bookmarks array
  UPDATE users
  SET bookmarks = array_remove(bookmarks, p_tweet_id)
  WHERE user_id = p_user_id;

  -- Remove the user_id from the tweet's bookmarks array
  UPDATE tweets
  SET bookmarks = array_remove(bookmarks, p_user_id)
  WHERE tweet_id = p_tweet_id;
END;
$$;


ALTER FUNCTION "public"."remove_bookmark"("p_user_id" "uuid", "p_tweet_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."remove_retweet"("p_user_id" "uuid", "p_tweet_id" "uuid") RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  -- Remove the tweet_id from the user's retweets array
  UPDATE users
  SET retweets = array_remove(retweets, p_tweet_id)
  WHERE user_id = p_user_id;

  -- Remove the user_id from the tweet's retweets array
  UPDATE tweets
  SET retweets = array_remove(retweets, p_user_id)
  WHERE tweet_id = p_tweet_id;
END;
$$;


ALTER FUNCTION "public"."remove_retweet"("p_user_id" "uuid", "p_tweet_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."unbookmark_tweet"("p_tweet_id" "uuid", "p_user_id" "uuid") RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  UPDATE tweets
  SET saves = array_remove(saves, p_user_id)
  WHERE tweet_id = p_tweet_id;
END;
$$;


ALTER FUNCTION "public"."unbookmark_tweet"("p_tweet_id" "uuid", "p_user_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."unlike_tweet"("p_tweet_id" "uuid", "p_user_id" "uuid") RETURNS TABLE("tweet_id" "uuid", "author_id" "uuid", "content" "text", "created_at" timestamp with time zone, "likes" "uuid"[])
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  -- Update the likes array in the tweets table
  UPDATE tweets
  SET likes = array_remove(tweets.likes, p_user_id)
  WHERE tweets.tweet_id = p_tweet_id
  AND p_user_id = ANY(tweets.likes);

  -- Return the updated tweet
  RETURN QUERY
  SELECT tweets.tweet_id, tweets.author_id, tweets.content, tweets.created_at, tweets.likes
  FROM tweets
  WHERE tweets.tweet_id = p_tweet_id;
END;
$$;


ALTER FUNCTION "public"."unlike_tweet"("p_tweet_id" "uuid", "p_user_id" "uuid") OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."hashtags" (
    "id" integer NOT NULL,
    "name" "text" NOT NULL
);


ALTER TABLE "public"."hashtags" OWNER TO "postgres";


COMMENT ON TABLE "public"."hashtags" IS 'Table for storing all unique hashtags that are ever used';



CREATE SEQUENCE IF NOT EXISTS "public"."hashtags_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."hashtags_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."hashtags_id_seq" OWNED BY "public"."hashtags"."id";



CREATE TABLE IF NOT EXISTS "public"."retweets" (
    "retweet_id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "tweet_id" "uuid" NOT NULL,
    "user_id" "uuid" NOT NULL,
    "original_tweet_id" "uuid" NOT NULL,
    "original_author_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."retweets" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."tweet_hashtags" (
    "tweet_id" "uuid" NOT NULL,
    "hashtag_id" integer NOT NULL
);


ALTER TABLE "public"."tweet_hashtags" OWNER TO "postgres";


COMMENT ON TABLE "public"."tweet_hashtags" IS 'Table that links tweets to hashtags, managing the many-to-many relationship between tweets and hashtags.';



CREATE TABLE IF NOT EXISTS "public"."users" (
    "username" character varying(50) NOT NULL,
    "bio" "text",
    "retweets" "uuid"[],
    "replies" "uuid"[],
    "likes" "uuid"[],
    "following_count" integer DEFAULT 0,
    "following" "uuid"[],
    "followers_count" integer DEFAULT 0,
    "followers" "uuid"[],
    "bookmarks" "uuid"[],
    "background_image" "text" DEFAULT 'https://tvodynbovdqrnjidbykk.supabase.co/storage/v1/object/public/user_images/defaultbanner.jpg'::"text",
    "avatar_image" "text" DEFAULT 'https://tvodynbovdqrnjidbykk.supabase.co/storage/v1/object/public/user_images/avatar-placeholder.png'::"text",
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "email" character varying DEFAULT ''::character varying NOT NULL,
    "firstName" "text" DEFAULT ''::"text",
    "lastName" "text" DEFAULT ''::"text",
    "user_id" "uuid" DEFAULT "auth"."uid"() NOT NULL
);


ALTER TABLE "public"."users" OWNER TO "postgres";


COMMENT ON TABLE "public"."users" IS 'Table for storing users'' profile information';



ALTER TABLE ONLY "public"."hashtags" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."hashtags_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."hashtags"
    ADD CONSTRAINT "hashtags_name_key" UNIQUE ("name");



ALTER TABLE ONLY "public"."hashtags"
    ADD CONSTRAINT "hashtags_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."retweets"
    ADD CONSTRAINT "retweets_pkey" PRIMARY KEY ("retweet_id");



ALTER TABLE ONLY "public"."tweet_hashtags"
    ADD CONSTRAINT "tweet_hashtags_pkey" PRIMARY KEY ("tweet_id", "hashtag_id");



ALTER TABLE ONLY "public"."tweets"
    ADD CONSTRAINT "tweets_pkey" PRIMARY KEY ("tweet_id");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("user_id");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_username_key" UNIQUE ("username");



ALTER TABLE ONLY "public"."retweets"
    ADD CONSTRAINT "retweets_original_author_id_fkey" FOREIGN KEY ("original_author_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."retweets"
    ADD CONSTRAINT "retweets_original_tweet_id_fkey" FOREIGN KEY ("original_tweet_id") REFERENCES "public"."tweets"("tweet_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."retweets"
    ADD CONSTRAINT "retweets_tweet_id_fkey" FOREIGN KEY ("tweet_id") REFERENCES "public"."tweets"("tweet_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."retweets"
    ADD CONSTRAINT "retweets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."tweet_hashtags"
    ADD CONSTRAINT "tweet_hashtags_hashtag_id_fkey" FOREIGN KEY ("hashtag_id") REFERENCES "public"."hashtags"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."tweet_hashtags"
    ADD CONSTRAINT "tweet_hashtags_tweet_id_fkey" FOREIGN KEY ("tweet_id") REFERENCES "public"."tweets"("tweet_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."tweets"
    ADD CONSTRAINT "tweets_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."tweets"
    ADD CONSTRAINT "tweets_original_author_id_fkey" FOREIGN KEY ("original_author_id") REFERENCES "public"."users"("user_id");



ALTER TABLE ONLY "public"."tweets"
    ADD CONSTRAINT "tweets_original_tweet_id_fkey" FOREIGN KEY ("original_tweet_id") REFERENCES "public"."tweets"("tweet_id");



CREATE POLICY "Allow all users to view/select user's data" ON "public"."users" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "Allow authenticated users to create tweets" ON "public"."tweets" FOR INSERT TO "authenticated" WITH CHECK (("auth"."uid"() = "author_id"));



CREATE POLICY "Allow authenticated users to delete their own tweets" ON "public"."tweets" FOR DELETE TO "authenticated" USING (("auth"."uid"() = "author_id"));



CREATE POLICY "Allow authenticated users to interact with tweets" ON "public"."tweets" FOR UPDATE TO "authenticated" USING (true) WITH CHECK (true);



CREATE POLICY "Allow authenticated users to update their own tweets" ON "public"."tweets" FOR UPDATE TO "authenticated" USING (("auth"."uid"() = "author_id"));



CREATE POLICY "Allow authenticated users to view tweets" ON "public"."tweets" FOR SELECT TO "authenticated" USING (("auth"."uid"() IS NOT NULL));



CREATE POLICY "Allow users to delete their own data" ON "public"."users" FOR DELETE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Allow users to register" ON "public"."users" FOR INSERT TO "authenticated" WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Allow users to update their own data" ON "public"."users" FOR UPDATE TO "authenticated" USING (("auth"."uid"() = "user_id"));



ALTER TABLE "public"."hashtags" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."retweets" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."tweet_hashtags" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."tweets" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "update_replies_policy" ON "public"."tweets" FOR UPDATE USING (("auth"."uid"() = "author_id"));



ALTER TABLE "public"."users" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."users";



GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";
































































































































































































GRANT ALL ON FUNCTION "public"."add_bookmark"("p_user_id" "uuid", "p_tweet_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."add_bookmark"("p_user_id" "uuid", "p_tweet_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."add_bookmark"("p_user_id" "uuid", "p_tweet_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."add_new_tweet"("user_id" "uuid", "tweet_content" "text", "tweet_image" "text", "is_reply" boolean, "is_retweet" boolean, "original_tweet_id" "uuid", "original_author_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."add_new_tweet"("user_id" "uuid", "tweet_content" "text", "tweet_image" "text", "is_reply" boolean, "is_retweet" boolean, "original_tweet_id" "uuid", "original_author_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."add_new_tweet"("user_id" "uuid", "tweet_content" "text", "tweet_image" "text", "is_reply" boolean, "is_retweet" boolean, "original_tweet_id" "uuid", "original_author_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."add_retweet"("p_tweet_id" "uuid", "p_user_id" "uuid", "p_original_tweet_id" "uuid", "p_original_author_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."add_retweet"("p_tweet_id" "uuid", "p_user_id" "uuid", "p_original_tweet_id" "uuid", "p_original_author_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."add_retweet"("p_tweet_id" "uuid", "p_user_id" "uuid", "p_original_tweet_id" "uuid", "p_original_author_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."add_retweet"("p_user_id" "uuid", "p_tweet_id" "uuid", "p_original_tweet_id" "uuid", "p_original_author_id" "uuid", "p_images" "text"[]) TO "anon";
GRANT ALL ON FUNCTION "public"."add_retweet"("p_user_id" "uuid", "p_tweet_id" "uuid", "p_original_tweet_id" "uuid", "p_original_author_id" "uuid", "p_images" "text"[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."add_retweet"("p_user_id" "uuid", "p_tweet_id" "uuid", "p_original_tweet_id" "uuid", "p_original_author_id" "uuid", "p_images" "text"[]) TO "service_role";



GRANT ALL ON FUNCTION "public"."bookmark_tweet"("p_tweet_id" "uuid", "p_user_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."bookmark_tweet"("p_tweet_id" "uuid", "p_user_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."bookmark_tweet"("p_tweet_id" "uuid", "p_user_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."delete_tweet"("original_author_id" "uuid", "tweet_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."delete_tweet"("original_author_id" "uuid", "tweet_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."delete_tweet"("original_author_id" "uuid", "tweet_id" "uuid") TO "service_role";



GRANT ALL ON TABLE "public"."tweets" TO "anon";
GRANT ALL ON TABLE "public"."tweets" TO "authenticated";
GRANT ALL ON TABLE "public"."tweets" TO "service_role";



GRANT ALL ON FUNCTION "public"."get_recent_tweets"("user_id" "uuid", "last_created_tweet" timestamp with time zone, "tweets_limit" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."get_recent_tweets"("user_id" "uuid", "last_created_tweet" timestamp with time zone, "tweets_limit" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_recent_tweets"("user_id" "uuid", "last_created_tweet" timestamp with time zone, "tweets_limit" integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."like_tweet"("p_tweet_id" "uuid", "p_user_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."like_tweet"("p_tweet_id" "uuid", "p_user_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."like_tweet"("p_tweet_id" "uuid", "p_user_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."remove_bookmark"("p_user_id" "uuid", "p_tweet_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."remove_bookmark"("p_user_id" "uuid", "p_tweet_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."remove_bookmark"("p_user_id" "uuid", "p_tweet_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."remove_retweet"("p_user_id" "uuid", "p_tweet_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."remove_retweet"("p_user_id" "uuid", "p_tweet_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."remove_retweet"("p_user_id" "uuid", "p_tweet_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."unbookmark_tweet"("p_tweet_id" "uuid", "p_user_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."unbookmark_tweet"("p_tweet_id" "uuid", "p_user_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."unbookmark_tweet"("p_tweet_id" "uuid", "p_user_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."unlike_tweet"("p_tweet_id" "uuid", "p_user_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."unlike_tweet"("p_tweet_id" "uuid", "p_user_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."unlike_tweet"("p_tweet_id" "uuid", "p_user_id" "uuid") TO "service_role";





















GRANT ALL ON TABLE "public"."hashtags" TO "anon";
GRANT ALL ON TABLE "public"."hashtags" TO "authenticated";
GRANT ALL ON TABLE "public"."hashtags" TO "service_role";



GRANT ALL ON SEQUENCE "public"."hashtags_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."hashtags_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."hashtags_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."retweets" TO "anon";
GRANT ALL ON TABLE "public"."retweets" TO "authenticated";
GRANT ALL ON TABLE "public"."retweets" TO "service_role";



GRANT ALL ON TABLE "public"."tweet_hashtags" TO "anon";
GRANT ALL ON TABLE "public"."tweet_hashtags" TO "authenticated";
GRANT ALL ON TABLE "public"."tweet_hashtags" TO "service_role";



GRANT ALL ON TABLE "public"."users" TO "anon";
GRANT ALL ON TABLE "public"."users" TO "authenticated";
GRANT ALL ON TABLE "public"."users" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
