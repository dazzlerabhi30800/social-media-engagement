import { useUser } from "@clerk/clerk-react";
import Header from "./Header";
import { useEffect } from "react";
import { useSocialContext } from "../../context/SocialContext";
import ConfigFunc from "../../context/ConfigFunc";
import Posts from "./Posts";

const FeedPage = () => {
  const { registerNewUser, userInfo, page } = useSocialContext();
  const { fetchFeed, paddingStyles } = ConfigFunc();
  const { user } = useUser();
  useEffect(() => {
    user && registerNewUser();
  }, [user]);

  useEffect(() => {
    fetchFeed();
  }, [page]);

  if (!userInfo) return <div>Loading...</div>;
  return (
    <div className={`w-full ${paddingStyles}`}>
      <Header />
      <Posts />
    </div>
  );
};

export default FeedPage;
