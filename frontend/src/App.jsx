import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/login/LoginPage";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import NotificationPage from "./pages/notification/NotificationPage";
import ProfilePage from "./pages/profile/ProfilePage";

import Sidebar from "./components/common/Sidebar";
import RightPanel from "./components/common/RightPanel";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./components/common/LoadingSpinner";
import { QUERY_KEYS } from "./constants";
import useAuthUser from "./hooks/useAuthUser";

const App = () => {
  const { authUser, isLoading } = useAuthUser();

  if (isLoading) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <LoadingSpinner size='lg' />
      </div>
    );
  }

  return (
    <div className="flex max-w-6xl mx-auto">
      {authUser && <Sidebar />}

      <Routes>
        <Route path={"/"} element={authUser ? <HomePage /> : <Navigate to={"/signup"} />} />
        <Route path={"/login"} element={authUser ? <Navigate to={"/"} /> : <LoginPage />} />
        <Route path={"/signup"} element={authUser ? <Navigate to={"/"} /> : <SignUpPage />} />
        <Route path={"/notifications"} element={authUser ? <NotificationPage /> : <Navigate to={"/signup"} />} />
        <Route path={"/profile/:username"} element={authUser ? <ProfilePage /> : <Navigate to={"/signup"} />} />
      </Routes>

      {authUser && <RightPanel />}
      <Toaster />
    </div>
  );
};

export default App;