import React, { useEffect, useState } from "react";
import { getTopRatedMovies } from "../../api/movie";
import { useNotification } from "../../hooks";
import MovieList from "./MovieList";

const TopRatedTVSeries = () => {
  const [movies, setMovies] = useState([]);

  const { updateNotification } = useNotification();

  const fetchMovies = async signal => {
    // const { error, movies } = await getTopRatedMovies("TV Series",signal);
    const { error, movies } = await getTopRatedMovies(null, signal);
    if (error) return updateNotification("error", error);

    setMovies([...movies]);
  };

  useEffect(() => {
    const ac = new AbortController();
    fetchMovies(ac.signal);

    return () => {
      ac.abort();
    };
  }, []);

  return <MovieList title="Viewers choice (TV Series)" movies={movies} />;
};

export default TopRatedTVSeries;
