import React, { useEffect, useState } from "react";
import CustomButtonLink from "../CustomButtonLink";
import RatingStar from "../RatingStar";
import { useParams } from "react-router-dom";
import { useAuth, useNotification } from "../../hooks";
import { deleteReview, getReviewByMovie } from "../../api/review";
import { BsTrash, BsPencilSquare } from "react-icons/bs";
import ConfirmModal from "../../models/ConfirmModal";
import NotFoundText from "../NotFoundText";
import EditRatingModal from "../../models/EditRatingModal";
import Container from "../Container";

const getNameInitial = (name = "") => {
  return name[0].toUpperCase();
};

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [movieTitle, setMovieTitle] = useState("");
  const [profileOwnersReview, setProfileOwnersReview] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [busy, setBusy] = useState(false);

  const { movieId } = useParams();
  const { authInfo } = useAuth();
  const profileId = authInfo.profile?.id;

  const { updateNotification } = useNotification();

  const fetchReviews = async () => {
    const { error, movie } = await getReviewByMovie(movieId);
    if (error) return updateNotification("error", error);

    setReviews([...movie.reviews]);
    setMovieTitle(movie.title);
  };

  const findProfileOwnersReview = () => {
    if (profileOwnersReview) return setProfileOwnersReview(null);

    const matched = reviews.find(review => review.owner.id === profileId);

    if (!matched)
      return updateNotification("error", "You don't have any review!");

    setProfileOwnersReview(matched);
  };

  const handleOnEditClick = async () => {
    const { id, content, rating } = profileOwnersReview;
    setSelectedReview({ id, content, rating });
    setShowEditModal(true);
  };

  const handleOnDeleteConfirm = async () => {
    setBusy(true);
    const { error, message } = await deleteReview(profileOwnersReview.id);
    setBusy(false);

    if (error) return updateNotification("error", error);

    updateNotification("success", message);

    const updatedReviews = reviews.filter(r => r.id !== profileOwnersReview.id);

    setReviews([...updatedReviews]);
    setProfileOwnersReview(null);
    hideConfirmModal();
  };

  const handleOnReviewUpdate = review => {
    const updatedReview = {
      ...profileOwnersReview,
      rating: review.rating,
      content: review.content,
    };

    setProfileOwnersReview({ ...updatedReview });

    const newReviews = reviews.map(r => {
      if (r.id === updatedReview.id) return updatedReview;
      return r;
    });

    setReviews([...newReviews]);
  };

  const displayConfirmModal = () => setShowConfirmModal(true);
  const hideConfirmModal = () => setShowConfirmModal(false);
  const hideEditModal = () => {
    setShowEditModal(false);
    setSelectedReview(null);
  };

  useEffect(() => {
    if (movieId) fetchReviews();
  }, [movieId]);

  return (
    <div className="dark:bg-primary bg-white min-h-screen pb-10">
      <Container className="xl:px-0 px-2 py-8">
        {/* movie review header(title, view all or find my review) */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold dark:text-white text-secondary">
            <span className="text-light-subtle dark:text-dark-subtle font-normal">
              Reviews for:{" "}
            </span>
            {movieTitle}
          </h1>

          {profileId ? (
            <CustomButtonLink
              label={profileOwnersReview ? "View All" : "Find My Review"}
              onClick={findProfileOwnersReview}
            />
          ) : null}
        </div>

        {/* if reviews are not there */}
        <NotFoundText text="No Reviews!" visible={!reviews.length} />

        {/* showing all reviews */}
        {profileOwnersReview ? (
          <div className="space-y-3 mt-3">
            <ReviewCard review={profileOwnersReview} />
            <div className="flex space-x-3 dark:text-white text-primary text-xl p-3">
              <button onClick={displayConfirmModal} type="button">
                <BsTrash />
              </button>
              <button onClick={handleOnEditClick} type="button">
                <BsPencilSquare />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3 mt-3">
            {reviews.map(review => (
              <ReviewCard review={review} key={review.id} />
            ))}
          </div>
        )}
      </Container>

      <ConfirmModal
        title="Are you sure?"
        subTitle="This action will remove this review permanently!"
        visible={showConfirmModal}
        busy={busy}
        onConfirm={handleOnDeleteConfirm}
        onCancel={hideConfirmModal}
      />

      <EditRatingModal
        visible={showEditModal}
        initialState={selectedReview}
        onSuccess={handleOnReviewUpdate}
        onClose={hideEditModal}
      />
    </div>
  );
};

const ReviewCard = ({ review }) => {
  if (!review) return null;

  const { owner, content, rating } = review;

  return (
    <div className="flex space-x-3 items-center">
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-light-subtle dark:bg-dark-subtle text-white text-xl select-none">
        {getNameInitial(owner.name)}
      </div>

      <div className="w-9/12">
        <h1 className="dark:text-white text-secondary font-semibold text-lg">
          {owner.name}
        </h1>

        <RatingStar rating={rating} />

        <p className="text-light-subtle dark:text-dark-subtle text-justify">
          {content}
        </p>
      </div>
    </div>
  );
};

export default MovieReviews;
