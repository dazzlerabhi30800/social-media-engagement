import React from "react";
import { Link } from "react-router-dom";
import { useSocialContext } from "../../context/SocialContext";
import { signOut } from "firebase/auth";
import { auth } from "../../config/FirebaseConfig";

const Header = () => {
  const { userInfo, logoutSession } = useSocialContext();
  const handleLogout = async () => {
    await signOut(auth)
      .then((_) => logoutSession())
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <header className="w-full flex items-center justify-between">
      <Link
        to={`/profile/${userInfo?.id}`}
        className="flex items-center gap-2 sm:gap-4"
      >
        {userInfo?.photoUrl ? (
          <img
            src={userInfo?.photoUrl?.fileUrl}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-[50%] object-cover"
            alt={userInfo.name}
          />
        ) : (
          <span className="w-12 h-12 rounded-[50%] bg-gray-500"></span>
        )}
        <div className="flex flex-col gap-0 group">
          <p className="text-gray-400 text-[10px] sm:text-xs md:group-hover:underline">
            Welcome Back
          </p>
          <h4 className="text-[12px] sm:text-sm font-bold text-darkGrey md:group-hover:underline">
            {userInfo?.name}
          </h4>
        </div>
      </Link>
      {userInfo && (
        <button
          onClick={handleLogout}
          className="text-white text-sm sm:text-base bg-darkGrey py-[6px] sm:py-2 px-4 sm:px-6 rounded-md hover:bg-gray-600"
        >
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
