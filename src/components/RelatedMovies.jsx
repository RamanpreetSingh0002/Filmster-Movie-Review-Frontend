import React, { useEffect, useState } from "react";
import { useNotification } from "../hooks";
import { getRelatedMovies } from "../api/movie";
import MovieList from "./user/MovieList";

const RelatedMovies = ({ movieId }) => {
  const [movies, setMovies] = useState([]);

  const { updateNotification } = useNotification();

  const fetchRelatedMovies = async () => {
    const { error, movies } = await getRelatedMovies(movieId);
    if (error) return updateNotification("error", error);

    setMovies([...movies]);
  };

  useEffect(() => {
    if (movieId) fetchRelatedMovies();
  }, [movieId]);

  return <MovieList title="Related Movies" movies={movies} />;
};

export default RelatedMovies;
