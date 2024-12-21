# Social Media Engagement App

## LIVE :- _[Social Media Engagement](https://social-media-engagement.vercel.app/)_

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

## How to run locally

1. first clone the repo or download the repo.
2. then inside the root folder run the command `npm install` all the dependencies & after that make `.env.local` file in root dir.
3. In the .env.local file paste this, for this project to run it locally you can use my api keys.
```
   VITE_SECRET_SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsdWF0YWVvb3drY3VjZHZsd2dsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNDI3Nzk4OCwiZXhwIjoyMDQ5ODUzOTg4fQ.VUAvjvNe20ebViLo6FD2yRiF5UT5wfilCW36mFpaFEM
   VITE_FIREBASE_KEY=AIzaSyAfYNJDfie4tBbwbL0HxIU0e4c0TzXy2Z4

```
4. After doing everything above mentioned, run the server using `npm run dev`.


## Features of this application
1. Users can authenticate using google auth & data will be stored in the database.
2. Create Post by posting images/video with title.
3. Users can view &  edit their profile by updating their bio, name, profile & banner image.
4. Logout functionality.
5. Smooth navigation & interaction, plus all the post feed doesn't get loaded at any time, only when user scroll further.
