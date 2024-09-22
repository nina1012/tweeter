grant delete on table "storage"."s3_multipart_uploads" to "postgres";

grant insert on table "storage"."s3_multipart_uploads" to "postgres";

grant references on table "storage"."s3_multipart_uploads" to "postgres";

grant select on table "storage"."s3_multipart_uploads" to "postgres";

grant trigger on table "storage"."s3_multipart_uploads" to "postgres";

grant truncate on table "storage"."s3_multipart_uploads" to "postgres";

grant update on table "storage"."s3_multipart_uploads" to "postgres";

grant delete on table "storage"."s3_multipart_uploads_parts" to "postgres";

grant insert on table "storage"."s3_multipart_uploads_parts" to "postgres";

grant references on table "storage"."s3_multipart_uploads_parts" to "postgres";

grant select on table "storage"."s3_multipart_uploads_parts" to "postgres";

grant trigger on table "storage"."s3_multipart_uploads_parts" to "postgres";

grant truncate on table "storage"."s3_multipart_uploads_parts" to "postgres";

grant update on table "storage"."s3_multipart_uploads_parts" to "postgres";

create policy "Allow authenticated users to insert images 1rp6lws_0"
on "storage"."objects"
as permissive
for insert
to authenticated
with check (((bucket_id = 'user_images'::text) AND (auth.role() = 'authenticated'::text)));


create policy "Allow authenticated users to insert images"
on "storage"."objects"
as permissive
for insert
to authenticated
with check (((auth.role() = 'authenticated'::text) AND (bucket_id = 'tweet_images'::text)));


create policy "Allow authenticated users to read images 1rp6lws_0"
on "storage"."objects"
as permissive
for select
to authenticated
using (((bucket_id = 'user_images'::text) AND (auth.role() = 'authenticated'::text)));


create policy "Allow authenticated users to read images"
on "storage"."objects"
as permissive
for select
to authenticated
using (((auth.role() = 'authenticated'::text) AND (bucket_id = 'tweet_images'::text)));



