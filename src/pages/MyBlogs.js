import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendRequest } from "../store/send-request";

import Layout from "../components/Layout/Layout";
import Blog from "../components/Blogs/Blog";
import LoadingSpinner from "../UI/LoadingSpinner";

const MyBlogs = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.request.isLoading);
  const data = useSelector((state) => state.request.data);
  const blog = data?.data?.blogs?.map((blog) => (
    <Blog
      key={blog._id}
      id={blog._id}
      author={blog.author.name}
      title={blog.title}
      updatedAt={blog.updatedAt}
      about={blog.about}
    />
  ));

  useEffect(() => {
    dispatch(sendRequest("GET", `/api/v1/users/myBlogs`));
  }, [dispatch]);

  return (
    <Layout>
      <h2 className="mt-2 ml-4 text-lg font-bold">My Blogs</h2>
      {isLoading && <LoadingSpinner />}
      {blog?.length === 0 && (
        <p className="text-xl text-center text-blue-600">
          Seems you don't have any blog. Create One!
        </p>
      )}
      {blog}
    </Layout>
  );
};

export default MyBlogs;
