import React, { useEffect, useState } from "react";
import { getSingleMovie } from "../../api/movie";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth, useNotification } from "../../hooks";
import { Container } from "../Container";
import RatingStar from "../RatingStar";
import RelatedMovies from "../RelatedMovies";
import AddRatingModal from "../../models/AddRatingModal";
import CustomButtonLink from "../CustomButtonLink";
import ProfileModal from "../../models/ProfileModal";
import { convertReviewCount } from "../../utils/helper";

const convertDate = date => {
  return date.split("T")[0];
};

const SingleMovie = () => {
  const [ready, setReady] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState({});
  const [movie, setMovie] = useState({});

  const { movieId } = useParams();
  const navigate = useNavigate();

  const { updateNotification } = useNotification();
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;

  const fetchMovie = async () => {
    const { error, movie } = await getSingleMovie(movieId);
    if (error) return updateNotification("error", error);

    setReady(true);
    setMovie(movie);
  };

  const handleOnRateMovie = () => {
    if (!isLoggedIn) return navigate("/auth/sign-in");

    setShowRatingModal(true);
  };

  const hideRatingModal = () => {
    setShowRatingModal(false);
  };

  const handleOnRatingSuccess = reviews => {
    setMovie({ ...movie, reviews: { ...reviews } });
  };

  const handleProfileClick = profile => {
    setSelectedProfile(profile);
    setShowProfileModal(true);
  };

  const hideProfileModal = () => {
    setShowProfileModal(false);
  };

  useEffect(() => {
    if (movieId) fetchMovie();
  }, [movieId]);

  if (!ready)
    return (
      <div className="h-screen flex justify-center items-center dark:bg-primary bg-white">
        <p className="text-secondary dark:text-dark-subtle animate-pulse">
          Please wait...
        </p>
      </div>
    );

  const {
    id,
    trailer,
    poster,
    title,
    storyLine,
    language,
    releaseDate,
    type,
    director = {},
    reviews = {},
    writers = [],
    cast = [],
    genres = [],
  } = movie;

  return (
    <div className="dark:bg-primary bg-white min-h-screen pb-10">
      <Container className="xl:px0 px-2">
        <video poster={poster} controls src={trailer}></video>

        {/* Movie Review */}
        <div className="flex justify-between">
          <h1 className="xl:text-4xl lg:text-3xl text-2xl text-highlight dark:text-highlight-dark font-semibold py-3">
            {title}
          </h1>

          <div className="flex flex-col items-end">
            <RatingStar rating={reviews.ratingAvg} />

            <CustomButtonLink
              label={convertReviewCount(reviews.reviewCount) + " Reviews"}
              onClick={() => navigate("/movie/reviews/" + id)}
            />

            <CustomButtonLink
              label="Rate The Movie"
              onClick={handleOnRateMovie}
            />
          </div>
        </div>

        {/* Movie information */}
        <div className="space-y-3">
          {/* Story Line */}
          <p className="text-light-subtle dark:text-dark-subtle">{storyLine}</p>

          {/* Director */}
          <ListWithLabel label="Director:">
            <CustomButtonLink
              label={director.name}
              onClick={() => handleProfileClick(director)}
            />
          </ListWithLabel>

          {/* Writers */}
          <ListWithLabel label="Writers:">
            {writers.map(w => (
              <CustomButtonLink
                key={w.id}
                label={w.name}
                onClick={() => handleProfileClick(w)}
              />
            ))}
          </ListWithLabel>

          {/* Cast Names */}
          <ListWithLabel label="Cast:">
            {cast.map(({ id, profile, leadActor }) => {
              return (
                leadActor && (
                  <CustomButtonLink
                    key={id}
                    label={profile.name}
                    onClick={() => handleProfileClick(profile)}
                  />
                )
              );
            })}
          </ListWithLabel>

          {/* Language */}
          <ListWithLabel label="Language:">
            <CustomButtonLink label={language} clickable={false} />
          </ListWithLabel>

          {/* Release Date */}
          <ListWithLabel label="Release Date:">
            <CustomButtonLink
              label={convertDate(releaseDate)}
              clickable={false}
            />
          </ListWithLabel>

          {/* Genres */}
          <ListWithLabel label="Genres:">
            {genres.map(g => (
              <CustomButtonLink key={g} label={g} clickable={false} />
            ))}
          </ListWithLabel>

          {/* Type */}
          <ListWithLabel label="Type:">
            <CustomButtonLink label={type} clickable={false} />
          </ListWithLabel>

          {/* Cast with photo and role */}
          <CastProfiles cast={cast} onClick={handleProfileClick} />

          <RelatedMovies movieId={movieId} />
        </div>
      </Container>

      <ProfileModal
        visible={showProfileModal}
        onClose={hideProfileModal}
        profileId={selectedProfile.id}
      />

      <AddRatingModal
        visible={showRatingModal}
        onClose={hideRatingModal}
        onSuccess={handleOnRatingSuccess}
      />
    </div>
  );
};

const ListWithLabel = ({ label, children }) => {
  return (
    <div className="flex space-x-2">
      <p className="text-light-subtle dark:text-dark-subtle font-semibold">
        {label}
      </p>
      {children}
    </div>
  );
};

const CastProfiles = ({ cast, onClick }) => {
  return (
    <div>
      <h1 className="text-light-subtle dark:text-dark-subtle font-semibold text-2xl mb-2">
        Cast:
      </h1>
      <div className="flex flex-wrap space-x-4">
        {cast.map(({ id, profile, roleAs }) => {
          return (
            <div
              key={id}
              className="basis-28 flex flex-col items-center text-center mb-4"
            >
              <img
                className="w-24 h-24 aspect-square object-cover rounded-full"
                src={profile.avatar}
                alt=""
              />

              <CustomButtonLink
                label={profile.name}
                onClick={() => onClick(profile)}
              />

              <span className="text-light-subtle dark:text-dark-subtle text-sm">
                as
              </span>

              <p className="text-light-subtle dark:text-dark-subtle">
                {roleAs}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SingleMovie;
