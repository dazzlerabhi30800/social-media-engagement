import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./page/Home/HomePage";
import FeedPage from "./page/Feed/Feed";
import SignInPage from "./page/SignIn/SignIn";
import { useUser } from "@clerk/clerk-react";

function App() {
  const { user } = useUser();
  return (
    <>
      <main className="flex w-full py-6 px-10">
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to={"/feed"} /> : <Home />}
          />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
