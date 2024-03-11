import React, { useEffect, useState } from "react";
import { useNotification } from "../../hooks";
import { getTypeRelatedMovies } from "../../api/movie";
import GridContainer from "../GridContainer";
import ListItem from "./ListItem";
import { useSearchParams } from "react-router-dom";
import NextAndPrevButton from "../NextAndPrevButton";
import { ImSpinner3 } from "react-icons/im";

let currentPageNo = 0;
const limit = 20;

const TypeRelatedMovies = () => {
  const [movies, setMovies] = useState([]);
  const [reachedToEnd, setReachedToEnd] = useState(false);
  const [busy, setBusy] = useState(false);

  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  const { updateNotification } = useNotification();

  const fetchMovies = async (pageNo, signal) => {
    setBusy(true);

    const { error, movies } = await getTypeRelatedMovies(
      type,
      pageNo,
      limit,
      signal
    );
    setBusy(false);

    if (error) return updateNotification("error", error);

    console.log(movies.length);
    if (!movies.length) {
      currentPageNo = pageNo - 1;
      return setReachedToEnd(true);
    }

    setMovies([...movies]);
  };

  const handleOnNextClick = () => {
    if (reachedToEnd) return;

    currentPageNo += 1;
    const ac = new AbortController();
    fetchMovies(currentPageNo, ac.signal);
  };

  const handleOnPrevClick = () => {
    if (currentPageNo <= 0) return;
    if (reachedToEnd) setReachedToEnd(false);

    currentPageNo -= 1;
    const ac = new AbortController();
    fetchMovies(currentPageNo, ac.signal);
  };

  useEffect(() => {
    const ac = new AbortController();
    fetchMovies(currentPageNo, ac.signal);

    return () => {
      ac.abort();
    };
  }, []);

  return (
    <>
      {busy ? (
        <div className="dark:bg-primary bg-white flex justify-center items-center min-h-screen -mt-14">
          <p className="text-primary dark:text-white text-xl flex items-center space-x-2">
            <ImSpinner3 className="animate-spin" />
            <span>Please Wait</span>
          </p>
        </div>
      ) : (
        <div className="dark:bg-primary bg-white min-h-screen p-5">
          <h1 className="lg:text-4xl md:text-3xl text-2xl dark:text-white text-secondary font-semibold mb-5 text-center">
            {type === "Film" ? "Movies" : type}
          </h1>
          <GridContainer>
            {movies.map(movie => {
              return <ListItem key={movie.id} movie={movie} />;
            })}
          </GridContainer>
          {movies.length && (
            <NextAndPrevButton
              className="mt-5"
              OnNextClick={handleOnNextClick}
              OnPrevClick={handleOnPrevClick}
            />
          )}
        </div>
      )}
    </>
  );
};

export default TypeRelatedMovies;
