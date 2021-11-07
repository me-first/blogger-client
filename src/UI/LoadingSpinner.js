import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = (props) => {
  return (
    <div
      className={`flex items-center justify-center ${
        props.updateClass ? props.updateClass : "h-screen"
      } `}
    >
      <div className={`${classes.spinner}`}></div>
    </div>
  );
};

export default LoadingSpinner;
