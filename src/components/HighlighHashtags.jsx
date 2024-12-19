import React from "react";
import { Link } from "react-router-dom";

const HighlighHashtags = ({ title }) => {
  if (!title) return;
  const highlightComp = title.split(/\s/).map((word, index) => {
    const hashtagRegex = /(^|\n)(^|\s)(#[a-z\d-]+)/gi;
    const urlRegex =
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
    if (hashtagRegex.test(word)) {
      return (
        <span key={index} className="text-blue-500">
          {word}
        </span>
      );
    } else if (urlRegex.test(word)) {
      return (
        <Link
          key={index}
          target="_blank"
          to={word}
          className="text-sky-500 hover:underline"
        >
          {word}
        </Link>
      );
    } else {
      return (
        <span key={index} className="text-darkGrey">
          {word}
        </span>
      );
    }
  });
  return (
    <div className="flex text-lg font-medium items-center gap-[5px]">
      {highlightComp}
    </div>
  );
};

export default HighlighHashtags;
