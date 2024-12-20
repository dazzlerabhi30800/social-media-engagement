import React from "react";
import { Link } from "react-router-dom";
import { useSocialContext } from "../../context/SocialContext";

const Header = () => {
  const { userInfo, logoutSession } = useSocialContext();
  return (
    <header className="w-full flex items-center justify-between">
      <Link to={`/profile/${userInfo?.id}`} className="flex items-center gap-4">
        {userInfo?.photoUrl ? (
          <img
            src={userInfo?.photoUrl?.fileUrl}
            className="w-12 h-12 rounded-[50%] object-cover"
            alt={userInfo.name}
          />
        ) : (
          <span className="w-12 h-12 rounded-[50%] bg-gray-500"></span>
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
      <button
        onClick={logoutSession}
        className="text-white bg-darkGrey py-2 px-6 rounded-md hover:bg-gray-600"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
