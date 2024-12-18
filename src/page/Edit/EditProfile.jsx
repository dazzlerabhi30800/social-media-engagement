import React, { useEffect, useState } from "react";
import { useSocialContext } from "../../context/SocialContext";
import { FaArrowLeft, FaPencil } from "react-icons/fa6";
import ConfigFunc from "../../context/ConfigFunc";
import { useNavigate, useParams } from "react-router-dom";

const EditProfile = () => {
  const { userInfo, setUserInfo } = useSocialContext();

  const { id } = useParams();
  const navigate = useNavigate();
  const { saveUserEditedBio, getUserInfoWithoutFeeds } = ConfigFunc();

  useEffect(() => {
    id && fetchUserInfo(id);
  }, []);

  async function fetchUserInfo(id) {
    let data = await getUserInfoWithoutFeeds(id);
    if (data) {
      let bannerData = JSON.parse(data.banner_img);
      setBio(data?.bio === "" ? "Add Bio Now!!" : data?.bio);
      setName(data?.name);
      setBannerImg(bannerData ? bannerData?.fileUrl : null);
      setUserInfo({ ...data, banner_img: bannerData });
    }
  }
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const [bannerImg, setBannerImg] = useState("");
  const [imageFile, setImageFile] = useState();
  return (
    <div className="w-full flex-1 flex flex-col h-full">
      <div
        className={`w-full h-[200px] md:h-[250px] rounded-b-2xl p-5 relative bg-center bg-no-repeat bg-cover`}
        style={{
          backgroundImage: bannerImg
            ? `url(${bannerImg})`
            : "url('https://img.freepik.com/premium-photo/free-photo-background-dark-gradient_854787-16.jpg?semt=ais_hybrid')",
        }}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="text-white hover:text-gray-300"
          >
            <FaArrowLeft size={23} />
          </button>
          <p className="text-lg font-semibold text-white">Edit Profile</p>
        </div>
        <img
          src={userInfo?.photoUrl}
          alt={userInfo?.name}
          className="absolute left-6 -bottom-12 md:-bottom-14 w-24 h-24 md:w-28 md:h-28 rounded-[50%]"
        />
        <div className="absolute bottom-5 right-5 ">
          <label
            htmlFor="bannerImg"
            className="text-black cursor-pointer w-9 h-9 flex justify-center items-center bg-white  rounded-[50%] hover:bg-white/50"
          >
            <FaPencil size={16} />
          </label>
          <input
            type="file"
            id="bannerImg"
            className="hidden"
            onChange={(e) => {
              const generated = URL.createObjectURL(e.target.files[0]);
              setBannerImg(generated);
              setImageFile(e.target.files[0]);
            }}
          />
        </div>
      </div>
      {/* Info */}
      <div className="p-5 flex-1 flex h-inherit w-full mt-16">
        <div className="flex flex-col w-full h-full gap-10 justify-between relative">
          <div className="flex flex-col gap-5 text-lg">
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-gray-600 font-medium">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="font-bold border-b border-gray-400 focus:border-b-black focus:outline-none p-1"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-600 font-medium" htmlFor="bio">
                Bio
              </label>
              <input
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="font-bold border-b border-gray-400 focus:border-b-black focus:outline-none p-1"
              />
            </div>
          </div>
          <button
            onClick={() =>
              saveUserEditedBio(
                id,
                name,
                bio,
                imageFile,
                userInfo?.banner_img?.path
              )
            }
            className="p-3 bg-black text-white w-full hover:bg-gray-800 rounded-3xl shadow-md font-bold md:text-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
