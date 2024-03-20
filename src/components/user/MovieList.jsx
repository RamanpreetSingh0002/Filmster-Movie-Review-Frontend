import React from "react";
import GridContainer from "../GridContainer";
import { useNavigate } from "react-router-dom";
import CustomButtonLink from "../CustomButtonLink";
import ListItem from "./ListItem";

const MovieList = ({ title, movies = [], query = "" }) => {
  const navigate = useNavigate();

  if (!movies.length) return null;

  const findAllMovieList = () => {
    navigate("/movie/type-related?type=" + query);
  };

  return (
    <div>
      {title && (
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl dark:text-white text-secondary font-semibold">
            {title}
          </h1>
          <CustomButtonLink label={"View All"} onClick={findAllMovieList} />
        </div>
      )}

      <GridContainer>
        {movies.map(movie => {
          return <ListItem key={movie.id} movie={movie} />;
        })}
      </GridContainer>
    </div>
  );
};

export default MovieList;
