import React, { useState } from "react";
import api from "../../api/api";
import Cookies from "universal-cookie";

import Button from "../Button/Button";
import { useHistory, useLocation } from "react-router-dom";

const cookies = new Cookies();
const Blog = (props) => {
  const [showOptions, setShowOptions] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const pathname = location.pathname; ///my-blogs
  const date = new Date(props.updatedAt).toLocaleDateString("en-uk", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const readMoreHandler = () => {
    history.push(`/blogs/${props.id}`);
  };

  const editBlogHandler = () => {
    history.push(`/update-blog/${props.id}`);
  };

  const deleteBlogHandler = () => {
    const token = cookies.get("jwt");

    api.delete(`/api/v1/blogs/${props.id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    setTimeout(() => {
      history.push("/");
    }, 1500);
  };

  return (
    <div
      onClick={pathname !== "/my-blogs" ? readMoreHandler : undefined}
      className="relative w-11/12 p-2 mx-auto mt-4 bg-white shadow-lg rounded-xl"
    >
      <div className="flex justify-between">
        <h2 className="text-xl font-base ">{props.title}</h2>
        <svg
          onClick={() => {
            setShowOptions((prevState) => !prevState);
          }}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`${
            pathname === "/my-blogs" ? "" : "hidden"
          } text-gray-400 fill-current feather feather-more-vertical cursor-pointer`}
        >
          <circle cx="12" cy="12" r="1"></circle>
          <circle cx="12" cy="5" r="1"></circle>
          <circle cx="12" cy="19" r="1"></circle>
        </svg>
      </div>
      <div
        className={` cursor-pointer absolute ${
          showOptions ? "" : "hidden"
        } w-1/3 text-sm text-center text-white bg-gray-400 right-4 rounded-xl top-8`}
      >
        <div onClick={editBlogHandler} className="p-1 hover:text-gray-900">
          Edit
        </div>
        <div onClick={deleteBlogHandler} className="p-1 hover:text-gray-900">
          Delete
        </div>
      </div>
      <div className="flex justify-between">
        <p className="text-gray-400">{props.author}</p>
        <p className="text-gray-400">{date}</p>
      </div>
      <div>
        <p className="mt-2 mb-2 text-gray-600">
          {`${props.about}`.slice(0, 80)}...
        </p>
        <Button onClick={readMoreHandler} className="bg-gray-800">
          Read more
        </Button>
      </div>
    </div>
  );
};

export default Blog;
