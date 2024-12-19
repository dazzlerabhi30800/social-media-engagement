import { UserButton, useUser } from "@clerk/clerk-react";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSocialContext } from "../../context/SocialContext";

const Header = () => {
  const { user } = useUser();
  const { userInfo } = useSocialContext();
  return (
    <header className="w-full flex items-center justify-between">
      <Link to={`/profile/${user?.id}`} className="flex items-center gap-4">
        {userInfo && (
          <img
            src={userInfo?.photoUrl?.fileUrl}
            className="w-12 h-12 rounded-[50%] object-cover"
            alt={userInfo.name}
          />
        )}
        <div className="flex flex-col gap-0 group">
          <p className="text-gray-400 text-xs md:group-hover:underline">
            Welcome Back
          </p>
          <h4 className="text-sm font-bold text-darkGrey md:group-hover:underline">
            {userInfo?.name}
          </h4>
        </div>
      </Link>
    </header>
  );
};

export default Header;
