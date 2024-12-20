import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./page/Home/HomePage";
import FeedPage from "./page/Feed/Feed";
import SignInPage from "./page/SignIn/SignIn";
import { useUser } from "@clerk/clerk-react";
import CreatePost from "./page/createPost/CreatePost";
import UserProfile from "./page/Profile/UserProfile";
import EditProfile from "./page/Edit/EditProfile";
import CreateButton from "./components/CreateButton";
import SharePostDialog from "./components/SharePostDialog";
import { useSocialContext } from "./context/SocialContext";
import PostViewPage from "./page/PostView/PostViewPage";

function App() {
  const { user } = useUser();
  const { sharePostData } = useSocialContext();
  return (
    <>
      <main className="flex w-full flex-1 h-inherit relative">
        <CreateButton />
        {sharePostData?.showDialog === true && <SharePostDialog />}
        {/* <SharePostDialog /> */}
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to={"/feed"} /> : <Home />}
          />

          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/post/:postId" element={<PostViewPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/profile/:id" element={<UserProfile />} />
          <Route path="/edit/:id" element={<EditProfile />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
