// Visible.jsx
import { useEffect, useState } from "react";

const VisibleElement = (ref) => {
  const [visible, setVisible] = useState(false);
  const callbackFunc = (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(callbackFunc, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return visible;
};

export default VisibleElement;
