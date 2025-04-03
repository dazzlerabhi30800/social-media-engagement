import Header from "./Header";
import { useLayoutEffect } from "react";
import { useSocialContext } from "../../context/SocialContext";
import Posts from "./Posts";
import { RiLoader3Fill } from "react-icons/ri";
import ConfigFunc from "../../config/ConfigFunc";

const FeedPage = () => {
  const { userInfo, page } = useSocialContext();
  const { fetchFeed, paddingStyles } = ConfigFunc();

  useLayoutEffect(() => {
    fetchFeed();
  }, [page]);

  if (!userInfo)
    return (
      <div className="w-full p-10 flex justify-center items-center">
        <RiLoader3Fill className="animate-spin text-[30px]" />
      </div>
    );
  return (
    <div className={`w-full ${paddingStyles}`}>
      <Header />
      <Posts />
    </div>
  );
};

export default FeedPage;
