import React from "react";

const NextAndPrevButton = ({ className = "", OnPrevClick, OnNextClick }) => {
  const getClasses = () => "flex justify-end items-center space-x-3 ";
  return (
    <div className={getClasses() + className}>
      <Button onClick={OnPrevClick} title="Prev" />
      <Button onClick={OnNextClick} title="Next" />
    </div>
  );
};

export default NextAndPrevButton;

const Button = ({ title, onClick }) => {
  return (
    <button
      type="button"
      className="text-primary dark:text-white hover:underline"
      onClick={onClick}
    >
      {title}
    </button>
  );
};
