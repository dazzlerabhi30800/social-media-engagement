import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ConfigFunc from "../../context/ConfigFunc";
import ProfileInfo from "./ProfileInfo";
import FeedView from "../../components/FeedView";

const UserProfile = () => {
  const { id } = useParams();
  const { getUserInfo } = ConfigFunc();
  useEffect(() => {
    id && getUserInfo(id);
  }, []);
  return (
    <div className="flex-1">
      <ProfileInfo />
      <FeedView />
    </div>
  );
};

export default UserProfile;
