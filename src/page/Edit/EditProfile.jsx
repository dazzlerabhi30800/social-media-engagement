import React, { useEffect, useState } from "react";
import { useSocialContext } from "../../context/SocialContext";
import { FaArrowLeft, FaPencil } from "react-icons/fa6";
import ConfigFunc from "../../context/ConfigFunc";
import { useNavigate, useParams } from "react-router-dom";
import { RiLoader3Fill } from "react-icons/ri";
import toast from "react-hot-toast";

const EditProfile = () => {
  const { userInfo, setUserInfo, loading } = useSocialContext();

  const { id } = useParams();
  const navigate = useNavigate();
  const { saveUserEditedBio, getUserInfoWithoutFeeds } = ConfigFunc();

  const [bio, setBio] = useState("");
  const [name, setName] = useState("");

  const [bannerImg, setBannerImg] = useState("");
  const [bannerImageFile, setBannerImageFile] = useState();

  const [profileImg, setProfileImg] = useState("");
  const [newProfileImg, setNewProfileImg] = useState("");

  useEffect(() => {
    id && fetchUserInfo(id);
  }, []);

  async function fetchUserInfo(id) {
    let data = await getUserInfoWithoutFeeds(id);
    if (data) {
      // check everything is ok with data;
      setBio(data?.bio === "" ? "Add Bio Now!!" : data?.bio);
      setName(data?.name);
      setBannerImg(data?.banner_img ? data?.banner_img.fileUrl : null);
      setUserInfo(data);
      setProfileImg(data?.photoUrl.fileUrl);
    }
  }
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
            onClick={() => navigate(`/profile/${id}`)}
            className="text-white hover:text-gray-300"
          >
            <FaArrowLeft size={23} />
          </button>
          <p className="text-lg font-semibold text-white">Edit Profile</p>
        </div>
        <div
          style={{
            backgroundImage: profileImg
              ? `url(${profileImg})`
              : "url('https://img.freepik.com/premium-photo/free-photo-background-dark-gradient_854787-16.jpg?semt=ais_hybrid')",
          }}
          className="absolute left-6 -bottom-12 md:-bottom-14 w-24 h-24 md:w-28 md:h-28 rounded-[50%] bg-center bg-cover bg-no-repeat flex items-end justify-end"
        >
          <input
            onChange={(e) => {
              console.log(e.target.files[0].type);
              if (!e.target.files[0].type.includes("image/")) {
                toast.error("you can select only one image file");
                return;
              }
              const generated = URL.createObjectURL(e.target.files[0]);
              setProfileImg(generated);
              setNewProfileImg(e.target.files[0]);
            }}
            type="file"
            id="profileImg"
            accept="image/*"
            className="hidden"
          />
          <label
            className="text-darkGrey w-8 h-8 shadow-md flex justify-center items-center rounded-[50%] text-base font-bold mb-4 bg-slate-200 hover:bg-slate-300 relative left-2 cursor-pointer"
            htmlFor="profileImg"
          >
            <FaPencil />
          </label>
        </div>
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
            accept="image/*"
            onChange={(e) => {
              if (!e.target.files[0].type.includes("image/")) {
                toast.error("you can select image files");
              }
              const generated = URL.createObjectURL(e.target.files[0]);
              setBannerImg(generated);
              setBannerImageFile(e.target.files[0]);
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
            disabled={loading}
            onClick={() =>
              saveUserEditedBio(
                id,
                name,
                bio,
                bannerImageFile,
                userInfo?.banner_img,
                userInfo?.photoUrl,
                newProfileImg
              )
            }
            className="flex items-center gap-5 justify-center p-3 bg-black text-white w-full hover:bg-gray-800 rounded-3xl shadow-md font-bold md:text-lg disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading && <RiLoader3Fill className="animate-spin" size={30} />}
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
