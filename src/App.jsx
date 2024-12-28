import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./page/Home/HomePage";
import FeedPage from "./page/Feed/Feed";
import CreatePost from "./page/createPost/CreatePost";
import UserProfile from "./page/Profile/UserProfile";
import EditProfile from "./page/Edit/EditProfile";
import CreateButton from "./components/CreateButton";
import SharePostDialog from "./components/SharePostDialog";
import { useSocialContext } from "./context/SocialContext";
import PostViewPage from "./page/PostView/PostViewPage";
import ConfirmCreatePost from "./page/confirmPost/ConfirmCreatePost";
import { Toaster } from "react-hot-toast";
import ScrollToTopBtn from "./components/ScrollToTopBtn";

function App() {
  const { sharePostData, userInfo } = useSocialContext();
  return (
    <>
      <main className="flex w-full flex-1 h-inherit relative">
        <ScrollToTopBtn />
        <Toaster />
        <CreateButton />
        {sharePostData?.showDialog === true && <SharePostDialog />}
        <Routes>
          <Route
            path="/"
            element={userInfo ? <Navigate to={"/feed"} /> : <Home />}
          />

          <Route
            path="/create-post"
            element={userInfo ? <CreatePost /> : <Navigate to={"/"} />}
          />
          <Route path="/confirm-post" element={<ConfirmCreatePost />} />
          <Route path="/post/:postId" element={<PostViewPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/profile/:id" element={<UserProfile />} />
          <Route path="/edit/:id" element={<EditProfile />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
