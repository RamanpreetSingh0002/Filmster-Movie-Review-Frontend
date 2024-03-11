import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "./hooks";
import NotFound from "./components/NotFound";
import AdminNavigator from "./navigator/AdminNavigator";
import SingleMovie from "./components/user/SingleMovie";
import MovieReviews from "./components/user/MovieReviews";
import SearchMovies from "./components/user/SearchMovies";
import Navbar from "./components/user/navbar";
import Home from "./components/Home";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import EmailVerification from "./components/auth/EmailVerification";
import ForgetPassword from "./components/auth/ForgetPassword";
import ConfirmPassword from "./components/auth/ConfirmPassword";
import TypeRelatedMovies from "./components/user/TypeRelatedMovies";

export const App = () => {
  const { authInfo } = useAuth();
  const isAdmin = authInfo.profile?.role === "admin";

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (isAdmin) return <AdminNavigator />;
  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="pt-14">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/sign-in" element={<SignIn />} />
          <Route path="/auth/sign-up" element={<SignUp />} />
          <Route path="/auth/verification" element={<EmailVerification />} />
          <Route path="/auth/forget-password" element={<ForgetPassword />} />
          <Route path="/auth/reset-password" element={<ConfirmPassword />} />
          <Route path="/movie/:movieId" element={<SingleMovie />} />
          <Route path="/movie/reviews/:movieId" element={<MovieReviews />} />
          <Route path="/movie/search" element={<SearchMovies />} />
          <Route path="/movie/type-related" element={<TypeRelatedMovies />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};
