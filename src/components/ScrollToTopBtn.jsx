import React from "react";
import { FaChevronUp } from "react-icons/fa";
import useScroll from "../config/useScroll";

const ScrollToTopBtn = () => {
  const { scroll } = useScroll();
  return (
    <button
      onClick={() => window.scrollTo(0, 0)}
      className={`fixed  left-5 p-2 sm:p-3 md:left-[20%] lg:left-[25%] xl:left-[32%] z-50 rounded-md text-white bg-darkGrey hover:bg-gray-600 ${scroll > 1500 ? "bottom-10 scale-100" : "bottom-28 scale-0"} transition-all`}
    >
      <FaChevronUp size={20} />
    </button>
  );
};

export default ScrollToTopBtn;
