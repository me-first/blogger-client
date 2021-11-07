import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { sendRequest } from "../store/send-request";
import Layout from "../components/Layout/Layout";
import BlogUpdateForm from "../components/Blogs/BlogUpdateForm";
import LoadingSpinner from "../UI/LoadingSpinner";

const BlogUpdate = () => {
  const params = useParams();
  const isLoading = useSelector((state) => state.request.isLoading);
  const data = useSelector((state) => state.request.data);
  const error = useSelector((state) => state.request.error);
  const dispatch = useDispatch();
  const { blogId } = params;
  const blog = data?.data?.blog;
  useEffect(() => {
    dispatch(sendRequest("GET", `/api/v1/blogs/${blogId}`));
  }, [dispatch, blogId]);

  return (
    <Layout>
      {isLoading && <LoadingSpinner />}
      {error && <p className="text-red-500">{error}</p>}
      <BlogUpdateForm
        title={blog?.title || ""}
        about={blog?.about || ""}
        blogId={blogId}
        imageBlog={blog?.image}
      />
    </Layout>
  );
};

export default BlogUpdate;
