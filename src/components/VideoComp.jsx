import React, { useEffect, useRef } from "react";
import { useInView } from "motion/react";

const VideoComp = ({ link }) => {
  const ref = useRef(null);
  const visible = useInView(ref);

  useEffect(() => {
    if (!ref?.current) return;
    if (visible) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }, [visible]);

  return (
    <div className="h-full w-full">
      <video
        width="100%"
        className="w-full h-full rounded-xl object-cover"
        controls
        loop
        ref={ref}
      >
        <source src={link} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoComp;
