import React from "react";
import NotVerified from "./user/NotVerified";
import TopRatedMovies from "./user/TopRatedMovies";
import TopRatedWebSeries from "./user/TopRatedWebSeries";
import TopRatedTVSeries from "./user/TopRatedTvSeries";
import HeroSlideShow from "./user/HeroSlideShow";
import Container from "./Container";

const Home = () => {
  return (
    <div className="dark:bg-primary bg-white min-h-screen ">
      <Container className="px-2 xl:p-0">
        <NotVerified />

        {/* slider */}
        <HeroSlideShow />

        {/* Most rated movies */}
        <div className="space-y-3 py-8">
          <TopRatedMovies />
          <TopRatedWebSeries />
          <TopRatedTVSeries />
        </div>
      </Container>
    </div>
  );
};

export default Home;
