import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProfileInfo from "./ProfileInfo";
import ConfigFunc from "../../config/ConfigFunc";

const UserProfile = () => {
  const { id } = useParams();
  const { getUserInfo } = ConfigFunc();
  useEffect(() => {
    id && getUserInfo(id);
  }, []);
  return (
    <div className="flex-1">
      <ProfileInfo />
    </div>
  );
};

export default UserProfile;
