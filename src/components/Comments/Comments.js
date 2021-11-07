import React from "react";
import { Image } from "cloudinary-react";
// import userImg from "../../assets/img/lightbulb-1875247.jpg";
const Comments = (props) => {
  const { userPhoto, userName, updatedAt, comment } = props;

  return (
    <div className="flex items-center mx-4 mt-2 bg-gray-200 rounded-xl">
      <Image
        className="w-12 h-12 m-2 rounded-full"
        cloudName="ds9vpuvdm"
        secure="true"
        publicId={userPhoto}
        type="fetch"
        alt="blog img"
      />
      <div className="ml-2">
        <div className="flex items-center justify-between text-blue-500 w-60">
          <p>{userName}</p>
          <p className="text-sm text-gray-500">
            {new Date(updatedAt).toLocaleDateString("en-uk", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>
        </div>
        <div>{comment}</div>
      </div>
    </div>
  );
};

export default Comments;
