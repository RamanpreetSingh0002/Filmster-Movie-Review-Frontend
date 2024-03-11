import React from "react";
import { Link } from "react-router-dom";
import { getPoster } from "../../utils/helper";
import RatingStar from "../RatingStar";

const trimTitle = (text = "") => {
  if (text.length <= 20) return text;
  return text.substring(0, 20) + "..";
};

const ListItem = ({ movie }) => {
  const { id, title, responsivePosters, poster, reviews } = movie;

  return (
    <Link to={"/movie/" + id}>
      <img
        className="aspect-video object-cover w-full"
        src={getPoster(responsivePosters) || poster}
        alt={title}
      />

      <h1
        className="text-lg dark:text-white text-secondary font-semibold"
        title={title}
      >
        {trimTitle(title)}
      </h1>

      <RatingStar rating={reviews.ratingAvg} />
    </Link>
  );
};

export default ListItem;
