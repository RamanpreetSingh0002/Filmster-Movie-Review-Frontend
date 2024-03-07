import React from "react";
import { ImTree } from "react-icons/im";

const GenresSelector = ({ badge, onClick }) => {
  const renderBadge = () => {
    if (!badge) return null;

    return (
      <span className="dark:bg-dark-subtle bg-light-subtle text-white absolute top-0 right-11 translate-x-2 -translate-y-1 text-xs w-5 h-5 rounded-full flex justify-center items-center">
        {badge <= 9 ? badge : "9+"}
      </span>
    );
  };
  return (
    <div className="relative ">
      <button
        type="button"
        onClick={onClick}
        className="flex items-center space-x-2 py-1 px-3 border-2 dark:border-dark-subtle border-light-subtle dark:hover:border-white hover:border-primary transition dark:text-dark-subtle text-light-subtle dark:hover:text-white hover:text-primary rounded"
      >
        <ImTree />
        <span>Select Genres</span>
      </button>
      {renderBadge()}
    </div>
  );
};

export default GenresSelector;
