import { UserButton } from "@clerk/clerk-react";

const FeedPage = () => {
  return (
    <div>
      <button className="p-3 px-8 font-semibold bg-darkGrey rounded-[30px] text-white hover:brightness-125">
        Logout
      </button>
      <UserButton />
    </div>
  );
};

export default FeedPage;
