# Social Media Engagement App

## LIVE URL :- _[Social Media Engagement](https://social-media-engagement.vercel.app/)_

## Tech Used

1. Framework - React
2. React Icons - React Icons
3. Tailwind CSS - CSS Framework
4. Google Firebase - Google Authentication
5. Supabase - For database & cloud storage
6. Moment - to format timestamps
7. React Router Dom - for page routes & navigation
8. Swiper - smooth carousel
9. React Infinite Scroll Component - For infinite post component loading
10. Motion - to determine when the video element is in view inside post component.
11. Compressor js - to compress image files.
12. React Hot Toast - for toast notifications.

## How to run locally

1. first clone or download the repo.
2. Inside the root folder run the command `npm install` to install all the dependencies & after that make `.env.local` file in root dir.
3. In the .env.local file paste the code below, for this project to run it locally you can use my api keys.

```
   VITE_SECRET_SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsdWF0YWVvb3drY3VjZHZsd2dsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNDI3Nzk4OCwiZXhwIjoyMDQ5ODUzOTg4fQ.VUAvjvNe20ebViLo6FD2yRiF5UT5wfilCW36mFpaFEM
   VITE_FIREBASE_KEY=AIzaSyAfYNJDfie4tBbwbL0HxIU0e4c0TzXy2Z4

```

4. After doing everything above mentioned, run the server using `npm run dev`.

## Features of this application

1. Users can authenticate using google auth & data will be stored in the database.
2. Create Post by posting images/video with title.
3. Users can view & edit their profile by updating their bio, name, profile & banner image.
4. Logout functionality.
5. Smooth navigation & interaction, plus all the post feed doesn't get loaded at once, only when user scroll further.

## Challenge I've faced

### Authentication

1. The main challenge is completing the project but rather to find correct tools for things you want to build.
2. First thing was authentication, I was thinking to make the whole app with only google firebase but they have removed free tier plan to use their cloud storage, which was a bummer to me. Then the only option which was left to me was `Appwrite`, but I thought I should try something different, because I wanted the google auth for authentication.
3. Therefore I decided that I will clerk for authentication & supabase for database & cloud storage. I've never worked with supabase only heard it's name a few times, but I can say it is something work out, I mean it's awesome,fast,easy to setup & there's so much for.
4. Another issue was after deploying the app on vercel clerk after sign in didn't redirect to feed page, it rather redirects to some `unknown page`. And there goes my very basic feature in the trash can. Then I decided if I can't get it work on next day until afternoon I'll have to look for different options. Hence I chose `google firebase` for google auth & it had no issues & worked flawlessly with only minor changes in my code.

### Uploading Multiple Files

1. I've worked with uploading files on cloud storage in my chat app, but never with handling multiple files saving them to cloud storage using `input` tag.
2. But I just need to checkout the documentation & stack overflow, it was smooth as butter.
3. Then the problem came with compressing image files because some image files can be huge, maybe more than `5 mbs` & the compression should be done on client side. I used compressor js for it but the problem arised that I can't get `compressorjs` to return the compressed file. I tried with functions, making another component & using hooks like `useState` & `useEffect` but nothing works. That is when the promise came to play, it solved the problem entire, I just have to return resolve on success of compression.

<span style="color:red">### It's a puzzle</span>

1. Why did I say that making something from scratch is like solving a `puzzle`, you have to put piece together in a way that it looks right & meaningful.
