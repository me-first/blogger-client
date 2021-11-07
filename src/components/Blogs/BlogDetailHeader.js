import React from "react";
import { Image } from "cloudinary-react";
// import coverImg from "../../assets/img/lightbulbm -1875247.jpg";

const BlogDetailHeader = (props) => {
  let { image } = props;

  return (
    <React.Fragment>
      <header>
        <Image
          className="mx-auto h-11/12"
          cloudName="ds9vpuvdm"
          secure="true"
          publicId={image}
          type="fetch"
          alt="blog img"
        ></Image>
      </header>
    </React.Fragment>
  );
};

export default BlogDetailHeader;
