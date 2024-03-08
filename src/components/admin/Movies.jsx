import React, { useEffect, useState } from "react";
import MovieListItem from "../MovieListItem";
import { useMovies, useNotification } from "../../hooks";
import { deleteMovie, getMovieForUpdate, getMovies } from "../../api/movie";
import NextAndPrevButton from "../NextAndPrevButton";
import UpdateMovie from "../../models/UpdateMovie";
import ConfirmModal from "../../models/ConfirmModal";

let currentPageNo = 0;
const limit = 10;

const Movies = () => {
  // const [movies, setMovies] = useState([]);
  // const [reachedToEnd, setReachedToEnd] = useState(false);
  // const [busy, setBusy] = useState(false);
  // const [showUpdateModal, setShowUpdateModal] = useState(false);
  // const [showConfirmModal, setShowConfirmModal] = useState(false);
  // const [selectedMovie, setSelectedMovie] = useState(null);

  // const { updateNotification } = useNotification();

  const {
    fetchMovies,
    fetchNextPage,
    fetchPrevPage,
    movies: newMovies,
  } = useMovies();

  // const handleOnEditClick = async ({ id }) => {
  //   const { movie, error } = await getMovieForUpdate(id);
  //   if (error) return updateNotification("error", error);

  //   setSelectedMovie(movie);

  //   setShowUpdateModal(true);
  // };

  // const handleOnDeleteClick = movie => {
  //   setSelectedMovie(movie);
  //   setShowConfirmModal(true);
  // };

  // const handleOnDeleteConfirm = async () => {
  //   setBusy(true);
  //   const { error, message } = await deleteMovie(selectedMovie.id);
  //   setBusy(false);

  //   if (error) return updateNotification("error", error);

  //   updateNotification("success", message);
  //   hideConfirmModal();
  //   fetchMovies(currentPageNo);
  // };

  // const handleOnUpdate = movie => {
  //   const updatedMovies = movies.map(m => {
  //     if (m.id === movie.id) return movie;
  //     return m;
  //   });

  //   setMovies([...updatedMovies]);
  // };

  // const hideUpdateForm = () => setShowUpdateModal(false);
  // const hideConfirmModal = () => setShowConfirmModal(false);

  const handleUIUpdate = () => fetchMovies();

  useEffect(() => {
    fetchMovies(currentPageNo);
  }, []);

  return (
    <>
      <div className="space-y-3 p-5">
        {newMovies.map(movie => {
          return (
            <MovieListItem
              key={movie.id}
              movie={movie}
              afterDelete={handleUIUpdate}
              afterUpdate={handleUIUpdate}
              // onEditClick={() => handleOnEditClick(movie)}
              // onDeleteClick={() => handleOnDeleteClick(movie)}
            />
          );
        })}

        <NextAndPrevButton
          className="mt-5"
          OnNextClick={fetchNextPage}
          OnPrevClick={fetchPrevPage}
        />

        {/* <ConfirmModal
          title="Are you sure?"
          subTitle="This action will remove this movie permanently!"
          visible={showConfirmModal}
          onConfirm={handleOnDeleteConfirm}
          onCancel={hideConfirmModal}
          busy={busy}
        />

        <UpdateMovie
          visible={showUpdateModal}
          initialState={selectedMovie}
          onSuccess={handleOnUpdate}
          onClose={hideUpdateForm}
        /> */}
      </div>
    </>
  );
};

export default Movies;
