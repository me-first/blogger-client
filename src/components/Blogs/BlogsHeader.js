import React from "react";
import Cookies from "universal-cookie";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import coverImg from "../../assets/img/lightbulb-1875247.jpg";
// import Button from "../Button/Button";

const cookies = new Cookies();
const BlogsHeader = () => {
  const jwt = cookies.get("jwt");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn) || !!jwt;
  const history = useHistory();

  return (
    <header>
      <figure className="relative">
        <img src={coverImg} alt="cover"></img>
        <figcaption className="absolute text-white top-20 left-4">
          <div className="text-xl font-pacifico ">
            Share your imense knowledge here
          </div>
          <div className={`${isLoggedIn ? "hidden" : ""}`}>
            <div className="flex w-8/12 mt-4 justify-evenly">
              <Link to="/login" className="link">
                Login
              </Link>
              <Link to="/signup" className="text-gray-800 bg-white link">
                Sign up
              </Link>
            </div>
          </div>
          <div className={`${isLoggedIn ? "" : "hidden"}`}>
            <div className="flex justify-between mt-4">
              <div
                onClick={() => {
                  history.push("/blog-post");
                }}
                className="flex px-8 pt-1 text-gray-300 bg-white rounded-xl"
              >
                <div className="w-0.5 h-6 mr-1 bg-gray-700"></div>
                <span>Create your blog</span>
              </div>
              <Link to="/blog-post" className="text-gray-800 bg-white link">
                Create
              </Link>
            </div>
          </div>
        </figcaption>
      </figure>
    </header>
  );
};

export default BlogsHeader;
