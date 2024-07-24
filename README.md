# Tweeter - A Twitter Clone

## Project Description

Tweeter is a Twitter clone built to replicate the core functionalities of Twitter.
The design of this app is from [devchallenges.io]('https://legacy.devchallenges.io/challenges/rleoQc34THclWx1cFFKH').

## Features

- [x] User authentication and authorization
- [x] Create, read, update, and delete tweets
- [x] Like and retweet tweets
- [x] Bookmark tweets for later viewing
- [x] Upload and display images in tweets
- [ ] Follow and unfollow users
- [ ] View user profiles and their tweets
- [x] Real-time updates with Supabase

## User Stories

- [x] I can see my profile or others' profile
- When I am on a profile, I can see Tweets and Retweets. I can also filter by Tweets, Tweets and replies, Media and Likes
- When I am on a profile, I can see followers and following
- When I am on a profile, I can see follow or unfollow the user
- [x] I can navigate between Home, Explore and Bookmarks
- I can navigate to My Profile, Group Chat (optional), Setting/Authentication App
- [x] When I am on Home, I can post a new Tweet
- [x] When I post a new Tweet, I can choose to upload an image
- When I am on Home, I can see Tweets of people who I follow
- I can Comment, Retweet, Like or Save a Tweet
- I can Comment with image and I can like a comment
- I can see the posted time of the Comments and Tweets
- When I am on Home, I can see the most popular hashtags and people I should follow (it's up to you how to implement this)
- When I am on Explore, I can see the Top, Latest Tweet, or Tweet with Media. I can also choose to see the most popular people
- When I am on Bookmarks, I can see the Saved Tweet
- (optional): I can search for a group

## Tech Stack

- **Frontend:** React, TypeScript, Vite.js, Tailwind CSS, ShadCN UI
- **Backend:** Supabase (PostgreSQL)
- **State Management:** React Query, Zustand
- **Form Management:** React Hook Form
- **Validation:** Zod
- **Testing:** ...

## Installation and Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/nina1012/tweeter.git
   cd tweeter
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   ```bash
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```
