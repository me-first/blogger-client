import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendRequest } from "../store/send-request";

import Layout from "../components/Layout/Layout";
import BlogsHeader from "../components/Blogs/BlogsHeader";
import Blog from "../components/Blogs/Blog";
import BlogFilter from "../components/Blogs/BlogFilter";
import LoadingSpinner from "../UI/LoadingSpinner";

const Blogs = () => {
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("-updatedAt");
  const [page, setPage] = useState(1);
  const isLoading = useSelector((state) => state.request.isLoading); // initial false
  const data = useSelector((state) => state.request.data); // initial []
  const error = useSelector((state) => state.request.error); // initial []
  const dispatch = useDispatch();

  const filterQuery = filter.length === 0 ? "" : `&blogType=${filter}`;

  let sortQuery = `sort=-updatedAt`;
  if (sort === "new") sortQuery = "sort=-updatedAt";
  if (sort === "old") sortQuery = "sort=updatedAt";
  if (sort === "popular") sortQuery = "sort=-likes";

  useEffect(() => {
    dispatch(
      sendRequest(
        "GET",
        `/api/v1/blogs?${sortQuery}${filterQuery}&page=${page}&limit=5`
      )
    );
  }, [dispatch, filterQuery, sortQuery, page]);

  const filterHanlder = (value) => {
    setFilter(value);
  };
  const sortHanlder = (value) => {
    setSort(value);
  };

  const previousClickHandler = () => {
    if (page > 1) setPage((prevState) => prevState - 1);
    return;
  };

  const nextClickHandler = () => {
    const results = data?.data?.blogs.length;
    // 14-->20 which allows to click the next btn
    if (results >= 5) setPage((prevState) => prevState + 1);
    return;
  };
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

  return (
    <Layout>
      <BlogsHeader />
      {isLoading && <LoadingSpinner />}
      <section className="mt-2 ">
        <BlogFilter onFilter={filterHanlder} onSort={sortHanlder} />
      </section>
      {error && <p className="mt-10 text-red-500">{error}</p>}
      <section>{data && blog}</section>
      <section className="flex justify-between mx-4 my-4 ">
        <button
          onClick={previousClickHandler}
          className="px-6 py-1 text-sm text-white bg-gray-800 cursor-pointer rounded-xl"
        >
          Prev
        </button>
        <button
          onClick={nextClickHandler}
          className="px-6 py-1 text-sm text-white bg-gray-800 cursor-pointer rounded-xl"
        >
          Next
        </button>
      </section>
    </Layout>
  );
};

export default Blogs;
