import React from "react";

export const Container = ({ children, className }) => {
  return (
    <div className={"max-w-screen-xl mx-auto " + className}>{children}</div>
  );
};
