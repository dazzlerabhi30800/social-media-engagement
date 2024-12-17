import { useUser } from "@clerk/clerk-react";
import Header from "./Header";
import { useEffect } from "react";
import { useSocialContext } from "../../context/SocialContext";
import ConfigFunc from "../../context/ConfigFunc";
import Posts from "./Posts";

const FeedPage = () => {
  const { registerNewUser } = useSocialContext();
  const { fetchFeed } = ConfigFunc();
  const { user } = useUser();
  useEffect(() => {
    user && registerNewUser();
    fetchFeed();
  }, [user]);
  return (
    <div className="w-full">
      <Header />
      <Posts />
    </div>
  );
};

export default FeedPage;
