import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import PropTypes from "prop-types";
import { useInView } from "motion/react";

const VideoComp = ({ link }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const ref = useRef(null);
  const visible = useInView(ref);

  useEffect(() => {
    if (!ref?.current) return;
    const videoEl = ref.current.querySelector("video");
    if (!videoEl) return;
    if (visible) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [visible]);

  return (
    <div className="h-full w-full rounded-xl" ref={ref}>
      <ReactPlayer
        url={link}
        style={{
          width: "100%",
          height: "100%",
        }}
        playing={isPlaying}
        width={"100%"}
        height={"100%"}
        controls={true}
      />
    </div>
  );
};

VideoComp.propTypes = {
  link: PropTypes.string.isRequired,
};

export default VideoComp;
