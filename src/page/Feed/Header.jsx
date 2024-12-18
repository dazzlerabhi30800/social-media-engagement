import { UserButton, useUser } from "@clerk/clerk-react";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  const { user } = useUser();
  return (
    <header className="w-full flex items-center justify-between">
      <div className="flex items-center gap-4">
        <UserButton />
        <Link to={`/profile/${user?.id}`} className="flex flex-col gap-0 group">
          <p className="text-gray-400 text-xs md:group-hover:underline">
            Welcome Back
          </p>
          <h4 className="text-sm font-bold text-darkGrey md:group-hover:underline">
            {user?.fullName}
          </h4>
        </Link>
      </div>
      <Link
        to="/create-post"
        className="flex items-center gap-1 text-white py-2 px-4 rounded-lg bg-darkGrey hover:bg-gray-600"
      >
        <FaPlus size={12} /> Create
      </Link>
    </header>
  );
};

export default Header;
