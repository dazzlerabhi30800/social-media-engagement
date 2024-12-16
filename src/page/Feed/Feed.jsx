import { useUser } from "@clerk/clerk-react";
import Header from "./Header";
import { useSocialContext } from "../../context/SocialContext";
import { useEffect } from "react";

const FeedPage = () => {
  const { registerNewUser } = useSocialContext();
  const { user } = useUser();
  useEffect(() => {
    user && registerNewUser();
  }, [user]);
  return (
    <div className="w-full">
      <Header />
    </div>
  );
};

export default FeedPage;
