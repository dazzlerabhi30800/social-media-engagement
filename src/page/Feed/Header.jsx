import { UserButton, useUser } from "@clerk/clerk-react";
import React from "react";

const Header = () => {
  const { user } = useUser();
  return (
    <header className="w-full flex items-center gap-4">
      <UserButton />
      <div className="flex flex-col gap-0">
        <p className="text-gray-400 text-xs">Welcome Back</p>
        <h4 className="text-sm font-bold text-darkGrey">{user?.fullName}</h4>
      </div>
    </header>
  );
};

export default Header;
