import React from "react";
import { useSocialContext } from "../../context/SocialContext";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { FaHeart, FaPlay } from "react-icons/fa";
import FeedView from "../../components/FeedView";

const ProfileInfo = () => {
  const { userInfo, userPosts, setFeedViewInfo, feedViewInfo } =
    useSocialContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isShowFeed = searchParams.get("feedView");
  const location = useLocation();
  return (
    <div className="w-full">
      {/* Banner Img */}
      <div
        className="w-full h-[200px] md:h-[250px] rounded-b-2xl p-5 bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: userInfo?.banner_img
            ? `url(${userInfo?.banner_img?.fileUrl})`
            : "url('https://img.freepik.com/premium-photo/free-photo-background-dark-gradient_854787-16.jpg?semt=ais_hybrid')",
        }}
      >
        <button
          onClick={() => navigate("/feed")}
          className="text-white hover:text-gray-300"
        >
          <FaArrowLeftLong size={23} />
        </button>
      </div>
      <div className="py-2 pb-4 px-4">
        {/* Profile Info */}
        <div>
          {/* Profile Img */}
          <div className="flex gap-2 md:gap-4 items-center justify-between relative bottom-10">
            {userInfo && (
              <img
                src={userInfo?.photoUrl?.fileUrl}
                alt={userInfo?.name}
                className="w-28 h-28 rounded-[50%] object-cover"
              />
            )}
            <button
              onClick={() => navigate(`/edit/${userInfo?.id}`)}
              className="flex-1 h-fit mt-7 w-full p-2 md:p-3 rounded-3xl border md:border-2 border-gray-500 text-gray-500 font-medium max-w-72 transition-all hover:text-gray-800 hover:border-gray-800"
            >
              Edit Profile
            </button>
          </div>
          {/* Profile Bio */}
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">{userInfo?.name}</h2>
            <p>
              {userInfo?.bio
                ? userInfo?.bio
                : "There is no bio!!. Add your bio."}
            </p>
          </div>
        </div>
        {/* Feeds */}
        <div className="w-full mt-5">
          <h4 className="font-semibold text-2xl">My Posts</h4>
          {userPosts.length > 0 ? (
            <div className="grid grid-cols-2 gap-5 user--posts--wrapper mt-5">
              {userPosts?.map((post, index) => (
                <div
                  onClick={() => {
                    setFeedViewInfo(post);
                    navigate(`${location.pathname}?feedView=true`);
                  }}
                  className="w-full h-auto group text-center"
                  key={index}
                >
                  <div
                    style={{
                      backgroundImage: post?.post_url[0].includes(".mp4")
                        ? "url('https://img.freepik.com/free-photo/grunge-black-concrete-textured-background_53876-124541.jpg')"
                        : `url(${post?.post_url[0]})`,
                    }}
                    className="w-full min-h-[180px] h-auto object-cover rounded-3xl bg-center bg-cover bg-no-repeat flex justify-center items-center  group-hover:brightness-75 transition-all"
                  >
                    <div className="flex flex-col items-center bg-black/40 backdrop-blur-md gap-3 py-3 px-5 rounded-xl">
                      {post?.post_url[0].includes(".mp4") && (
                        <p>
                          <FaPlay size={15} className="text-white" />
                        </p>
                      )}
                      <p className="text-white flex items-center gap-1 font-medium">
                        {post.title}
                      </p>
                      <p className="text-white flex items-center gap-1">
                        <FaHeart /> {post?.likes.length}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full mt-5 p-3 flex text-center justify-center text-xl font-bold">
              There are no posts to show. Create One!!
            </div>
          )}
        </div>
      </div>
      {feedViewInfo && isShowFeed === "true" && <FeedView />}
    </div>
  );
};

export default ProfileInfo;
