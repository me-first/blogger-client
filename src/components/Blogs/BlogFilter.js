import React from "react";
import Button from "../Button/Button";

const BlogFilter = (props) => {
  // const history = useHistory();
  const sortResultHandler = (e) => {
    const value = e.target.textContent.toLowerCase();
    // history.push(`?sort=${value}`);
    props.onSort(value);
  };
  const filterResultHandler = (e) => {
    let value = e.target.textContent.toLowerCase();
    if (value === "design") value = "ui-ux";
    // history.push(`?filter=${value}`);
    props.onFilter(value);
  };

  return (
    <React.Fragment>
      <div className="flex items-center overflow-x-scroll">
        <Button onClick={filterResultHandler} className="bg-gray-800 link">
          MERN
        </Button>
        <Button onClick={filterResultHandler} className="bg-gray-800 link">
          Technology
        </Button>
        <Button onClick={filterResultHandler} className="bg-gray-800 link">
          Fiction
        </Button>
        <Button onClick={filterResultHandler} className="bg-gray-800 link">
          Design
        </Button>
        <Button onClick={filterResultHandler} className="bg-gray-800 link">
          Entertainment
        </Button>
        <Button onClick={filterResultHandler} className="bg-gray-800 link">
          Sports
        </Button>
      </div>
      <div className="flex items-center justify-evenly">
        <span>Sort: </span>
        <Button
          onClick={sortResultHandler}
          className="mt-2 ml-3 bg-yellow-500 border-none"
        >
          New
        </Button>
        <Button
          onClick={sortResultHandler}
          className="mt-2 ml-3 bg-yellow-500 border-none"
        >
          Old
        </Button>
        <Button
          onClick={sortResultHandler}
          className="mt-2 ml-3 bg-yellow-500 border-none"
        >
          Popular
        </Button>
      </div>
    </React.Fragment>
  );
};

export default BlogFilter;
