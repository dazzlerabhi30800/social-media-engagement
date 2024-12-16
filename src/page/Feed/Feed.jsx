import { useUser } from "@clerk/clerk-react";
import Header from "./Header";
import { useEffect } from "react";
import { useSocialContext } from "../../context/SocialContext";

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
