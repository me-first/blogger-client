import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";

const Popup = (props) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, 1500);
  }, []);

  let Alert = () => {
    const type = props.type;
    return (
      <div
        className={`${
          type === "success" ? "bg-green-500" : "bg-red-500"
        } flex items-center justify-center p-2 mx-auto `}
      >
        <p className="text-sm text-white">{props.children}</p>
      </div>
    );
  };

  if (!visible)
    Alert = () => {
      return <div />;
    };

  return (
    <React.Fragment>
      {ReactDom.createPortal(<Alert />, document.getElementById("popup"))}
    </React.Fragment>
  );
};

export default Popup;
