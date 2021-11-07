import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendRequest } from "../store/send-request";
import Layout from "../components/Layout/Layout";
import BlogDetailHeader from "../components/Blogs/BlogDetailHeader";
import BlogDetailContent from "../components/Blogs/BlogDetailContent";
import BlogDetailLikeAndComment from "../components/Blogs/BlogDetailLikeAndComment";
import LoadingSpinner from "../UI/LoadingSpinner";

const BlogDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.request.isLoading);
  const data = useSelector((state) => state.request.data);
  const error = useSelector((state) => state.request.error);
  const { blogId } = params;
  const blog = data?.data?.blog;
  useEffect(() => {
    dispatch(sendRequest("GET", `/api/v1/blogs/${blogId}`));
  }, [dispatch, blogId]);

  if (error)
    return (
      <Layout>
        <p>Error finding blog</p>
      </Layout>
    );

  return (
    <Layout>
      {isLoading && <LoadingSpinner />}
      <BlogDetailHeader image={blog?.image} />

      <BlogDetailContent
        title={blog?.title}
        author={blog?.author.name}
        blogType={blog?.blogType}
        updatedAt={blog?.updatedAt}
        about={blog?.about}
      />
      <section>
        <BlogDetailLikeAndComment
          blogId={blog?._id}
          likes={blog?.likes}
          comments={blog?.comments}
        />
      </section>
    </Layout>
  );
};

export default BlogDetail;
