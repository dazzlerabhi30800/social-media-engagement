import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./page/Home/HomePage";
import FeedPage from "./page/Feed/Feed";
import SignInPage from "./page/SignIn/SignIn";
import { useUser } from "@clerk/clerk-react";
import CreatePost from "./page/createPost/CreatePost";

function App() {
  const { user } = useUser();
  return (
    <>
      <main className="flex w-full p-4 sm:p-6 md:px-10">
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to={"/feed"} /> : <Home />}
          />

          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
