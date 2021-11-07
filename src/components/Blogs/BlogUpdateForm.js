import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../../api/api";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import { formActions } from "../../store/validate-form";
import { sendRequest } from "../../store/send-request";

import Button from "../Button/Button";

const cookies = new Cookies();
const BlogPostForm = (props) => {
  const history = useHistory();

  //UPLOADING IMAGE
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);
  // INPUT VALIDATION
  const titleIsValid = useSelector((state) => state.form.inputIsValid); //boolean
  const aboutIsValid = useSelector((state) => state.form.aboutIsValid); //boolean
  // GET BLOG DATA FROM SERVER

  // INPUT REF
  const blogTypeInputRef = useRef();
  const titleInputRef = useRef();
  const aboutInputRef = useRef();

  const dispatch = useDispatch();

  const { title, about, blogId, imageBlog } = props;

  const formIsValid = titleIsValid && aboutIsValid;

  const titleBlurHandler = () => {
    dispatch(formActions.validName(titleInputRef.current.value));
  };
  const aboutBlurHandler = () => {
    dispatch(formActions.validAbout(aboutInputRef.current.value));
  };

  const imageUploadHandler = async (e) => {
    e.preventDefault();
    const token = cookies.get("jwt");
    const imageFile = e.target.files[0];

    const form = new FormData();
    form.append("file", imageFile);

    try {
      const response = await api.post(`/api/v1/upload`, form, {
        headers: {
          authorization: `Bearer ${token}`,
        },
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          let percentage = Math.floor((loaded * 100) / total);
          if (percentage < 100) setProgress(percentage);
        },
      });
      setError(null);
      setProgress(100);
      setImageUrl(response?.data?.data?.url);
    } catch (error) {
      console.log(error.response);
      setError(error.response.data.message);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!formIsValid) return;

    //form is valid
    console.log("Form is valid");

    let enteredBlogType = blogTypeInputRef.current.value;
    if (enteredBlogType === "design") enteredBlogType = "ui-ux";
    const enteredTitle = titleInputRef.current.value;
    const enteredAbout = aboutInputRef.current.value;
    let image = imageBlog; //imageBlog->previous img url
    if (imageUrl) image = imageUrl;

    dispatch(
      sendRequest("PATCH", `/api/v1/blogs/${blogId}`, {
        blogType: enteredBlogType,
        title: enteredTitle,
        about: enteredAbout,
        image: image,
      })
    );

    setTimeout(() => {
      history.replace("/");
    }, 2000);
  };

  return (
    <form onSubmit={submitHandler} className="w-10/12 mx-auto mt-2">
      <div>
        <label htmlFor="type">Blog Type: </label>
        <select ref={blogTypeInputRef} id="type">
          <option value="technology">Technology</option>
          <option value="mern">MERN</option>
          <option value="design">Design</option>
          <option value="sports">Sports</option>
          <option value="entertainment">Entertainment</option>
          <option value="fiction">Fiction</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="title">Title</label>
        <input
          ref={titleInputRef}
          className="p-1 mt-1 outline-none"
          id="title"
          type="text"
          defaultValue={title}
          onBlur={titleBlurHandler}
        ></input>
        {!titleIsValid && <p className="text-red-500">Please provide title</p>}
      </div>
      <div className="flex flex-col mt-2">
        <label htmlFor="about">About</label>
        <textarea
          ref={aboutInputRef}
          className="p-1 mt-1 outline-none"
          id="about"
          type="text"
          defaultValue={about}
          rows="15"
          onBlur={aboutBlurHandler}
        ></textarea>
        {!aboutIsValid && (
          <p className="text-red-500">Please provide blog detail</p>
        )}
      </div>
      <div className="flex flex-col mt-2">
        <label htmlFor="file">Upload (Optional) </label>
        <input
          className="p-1 mt-1 outline-none"
          id="file"
          type="file"
          name="file"
          accept="image/*"
          onChange={imageUploadHandler}
        ></input>
        {error && <p className="text-red-500">{error}</p>}
        {progress > 0 && (
          <p className="text-blue-600">
            {progress < 100 ? "Uploading" : "Uploaded"}
            <span className="text-green-500">{progress}</span>%
          </p>
        )}
      </div>
      <Button onClick={submitHandler} className="mt-2 bg-gray-700">
        Post
      </Button>
    </form>
  );
};

export default BlogPostForm;
