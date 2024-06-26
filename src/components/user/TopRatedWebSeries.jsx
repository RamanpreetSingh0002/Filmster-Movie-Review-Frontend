import React, { useEffect, useState } from "react";
import { getTopRatedMovies } from "../../api/movie";
import { useNotification } from "../../hooks";
import MovieList from "./MovieList";

const TopRatedWebSeries = () => {
  const [movies, setMovies] = useState([]);

  const { updateNotification } = useNotification();

  const fetchMovies = async signal => {
    const { error, movies } = await getTopRatedMovies("Web Series", signal);
    // const { error, movies } = await getTopRatedMovies(null, signal);
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

  return <MovieList title="Web Series" movies={movies} query="Web Series" />;
};

export default TopRatedWebSeries;
