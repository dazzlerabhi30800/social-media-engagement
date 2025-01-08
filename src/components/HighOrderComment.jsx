import React from "react";

const HighOrderComment = (WrappedComp) => {
  const highOrder = (props) => {
    return <WrappedComp {...props} />;
  };
  return highOrder;
};

export default HighOrderComment;
