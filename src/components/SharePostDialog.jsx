import React, { useEffect, useState } from "react";
import { useSocialContext } from "../context/SocialContext";
import { IoClose } from "react-icons/io5";
import {
  FaDiscord,
  FaFacebook,
  FaFacebookMessenger,
  FaInstagram,
  FaReddit,
  FaTelegram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { FaCheckDouble } from "react-icons/fa6";
import { MdOutlineContentCopy } from "react-icons/md";
import { Link } from "react-router-dom";

const SharePostDialog = () => {
  const { sharePostData, setSharePostData } = useSocialContext();
  const [copied, setCopied] = useState(false);
  const postUrls = [
    {
      icon: <FaTwitter />,
      colorClass: "text-sky-500",
      url: "https://www.twitter.com/",
    },
    {
      icon: <FaFacebook />,
      colorClass: "text-blue-500",
      url: "https://www.linkedin.com/",
    },
    {
      icon: <FaDiscord />,
      colorClass: "text-violet-400",
      url: "https://www.discord.com/",
    },
    {
      icon: <FaReddit />,
      colorClass: "text-orange-500",
      url: "https://www.reddit.com/",
    },
    {
      icon: <FaWhatsapp />,
      colorClass: "text-green-500",
      url: "https://wa.me/",
    },
    {
      icon: <FaFacebookMessenger />,
      colorClass: "text-sky-600",
      url: "https://www.messenger.com/",
    },
    {
      icon: <FaTelegram />,
      colorClass: "text-sky-600",
      url: "https://telegram.me",
    },
    {
      icon: <FaInstagram />,
      colorClass: "text-pink-500",
      url: "http://instagram.com/",
    },
  ];

  useEffect(() => {
    if (!copied) return;
    let timeout = setTimeout(() => {
      setCopied(false);
    }, 4000);
    return () => clearTimeout(timeout);
  }, [copied]);
  return (
    <div className="flex items-center justify-center fixed top-0 left-0 h-full z-50  bg-black/60 px-3 w-full">
      <div className="rounded-lg flex flex-col gap-8 shadow-md bg-white p-5 h-auto min-w-[300px] w-[90%] max-w-[500px]">
        <div className="flex items-center justify-between gap-3">
          <h1>Share Post</h1>
          <button
            onClick={() =>
              setSharePostData((prev) => ({
                ...prev,
                showDialog: false,
                postData: null,
              }))
            }
            className="w-8 h-8 sm:w-10 sm:h-10 text-xl sm:text-2xl rounded-[50%] bg-blue-100 flex justify-center items-center hover:bg-blue-400"
          >
            <IoClose />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-5 place-items-center mt-5">
          {postUrls.map((data, index) => (
            <Link
              className={`w-10 h-10 sm:w-12 sm:h-12 text-xl sm:text-2xl  flex justify-center items-center rounded-[50%] bg-blue-100/60 hover:bg-blue-100 text-2xl ${data.colorClass}`}
              key={index}
              to={data.url}
              target="_blank"
            >
              {data.icon}
            </Link>
          ))}
        </div>
        <div className="flex items-center justify-between mt-5 bg-gray-200 rounded-lg p-2 text-gray-400">
          <p>{`/post/${sharePostData.postData}`.substring(0, 26)}...</p>
          <button
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}/post/${sharePostData.postData}`,
              );
              setCopied(true);
            }}
          >
            {copied ? (
              <FaCheckDouble size={22} />
            ) : (
              <MdOutlineContentCopy size={22} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SharePostDialog;
