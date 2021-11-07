import React, { useState } from "react";
import Cookies from "universal-cookie";
import { NavLink, Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth-token";
import { Image } from "cloudinary-react";

import Button from "../Button/Button";
// import userImg from "../../assets/img/lightbulb-1875247.jpg";
const cookies = new Cookies();
const MainNavigation = () => {
  const history = useHistory();
  //storing jwt in cookie and user in localstorage so data not lost on refresh
  const jwt = cookies.get("jwt");
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [dropDown, setDropDown] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.token) || !!jwt;
  // const token = useSelector((state) => state.auth.token) || !!jwt;
  const user = currentUser;
  const dispatch = useDispatch();
  // console.log(user);
  const photo = user?.photo;

  const dropDownHandler = () => {
    setDropDown((prevState) => !prevState);
  };
  const logoutHandler = () => {
    cookies.remove("jwt", { path: "/" });
    localStorage.removeItem("user");

    // so that page does not get back and redirected to login
    setTimeout(() => {
      dispatch(authActions.logout());
      history.replace("/");
    }, 500);
  };

  return (
    <header className="flex items-center justify-between h-10 bg-gray-700">
      <NavLink to="/" className="ml-2 text-xl text-white">
        Blogger
      </NavLink>
      <nav className={`${isLoggedIn ? "hidden" : ""} w-1/2 mx-2`}>
        <ul className="flex justify-evenly">
          <li className="mr-1">
            <NavLink
              className="px-4 py-1 text-white border-2 border-white border-solid rounded-md"
              to="/login"
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              className="px-4 py-1 text-gray-800 bg-white border-2 border-white border-solid rounded-md"
              to="/signup"
            >
              Sign up
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={`${isLoggedIn ? "" : "hidden"} `}>
        <nav className="relative flex items-center">
          <div
            onClick={dropDownHandler}
            className="flex items-center mr-4 text-white cursor-pointer "
          >
            <Image
              cloudName="ds9vpuvdm"
              secure="true"
              publicId={photo}
              type="fetch"
              alt="blog img"
              className="w-10 h-10 mr-2 rounded-full"
            ></Image>
            <span>{user?.name?.split(" ")[0]}</span>
          </div>
          <div
            className={`${
              dropDown ? "block" : "hidden"
            } absolute left-0 z-20 w-1/2 text-sm text-center text-white bg-gray-400 rounded-xl top-8`}
          >
            <Link
              to="/my-profile"
              className="inline-block p-1 hover:text-gray-900"
            >
              My Profile
            </Link>
            <Link
              to="/my-blogs"
              className="inline-block p-1 hover:text-gray-900"
            >
              My Blogs
            </Link>
            <div
              onClick={logoutHandler}
              className="p-1 cursor-pointer hover:text-gray-900"
            >
              Logout
            </div>
          </div>
          <div className="mr-2">
            <Button onClick={logoutHandler} className="text-gray-800 bg-white">
              Logout
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default MainNavigation;
