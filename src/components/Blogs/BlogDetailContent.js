import React from "react";

const BlogDetailContent = (props) => {
  let { title, about, author, updatedAt, blogType } = props;

  return (
    <section className="p-2 m-1 bg-white rounded-md">
      <div className="text-center">
        <h2 className="text-2xl font-semibold border-b-2">{title}</h2>
      </div>
      <div className="flex items-center justify-between">
        <h3 className="text-lg">{blogType}</h3>
        <div className="flex flex-col text-gray-500">
          <span>{author}</span>
          <span>
            {new Date(updatedAt).toLocaleDateString("en-uk", {
              day: "2-digit",
              month: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
      <div className="mt-2 text-gray-600">
        <p className="text-justify">{about}</p>
      </div>
    </section>
  );
};

export default BlogDetailContent;
