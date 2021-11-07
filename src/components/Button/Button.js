import React from "react";

const Button = (props) => {
  const onClickHanlder = (e) => {
    // let value = e.target.textContent.toLowerCase();

    // if (value === "design") value = "ui-ux";

    props.onClick(e);
  };

  const classes =
    props.className +
    " px-6 w-30 py-1 text-white border-2 border-white border-solid rounded-md text-sm active:shadow-lg";

  return (
    <button onClick={onClickHanlder} className={classes}>
      {props.children}
    </button>
  );
};

export default Button;
