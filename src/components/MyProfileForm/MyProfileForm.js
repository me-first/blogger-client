import React, { useRef, useState } from "react";
import { Image } from "cloudinary-react";
import api from "../../api/api";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";

// import Button from "../Button/Button";
// import userImg from "../../assets/img/lightbulb-1875247.jpg";
const cookies = new Cookies();
const MyProfileForm = (props) => {
  const history = useHistory();
  const [progress, setProgress] = useState(0);
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const fileInputRef = useRef();
  const currentPasswordInputRef = useRef();
  const newPasswordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const { name, email, photo } = props;
  const [url, setUrl] = useState(photo);

  const token = cookies.get("jwt");
  const uploadFileHandler = async (e) => {
    const imageFile = e.target.files[0];
    const form = new FormData();
    form.append("file", imageFile);

    try {
      const response = await api.post("/api/v1/upload", form, {
        headers: {
          authorization: `Bearer ${token}`,
        },
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percent = Math.floor((loaded * 100) / total);
          if (percent < 86) setProgress(percent);
        },
      });
      console.log(response);
      setProgress(100);
      setUrl(response?.data?.data?.url);
    } catch (error) {
      const message = error.response.data.message;
      alert(message);
    }
  };

  const profileSubmitHandler = async (e) => {
    e.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const photo = url;
    try {
      const response = await api.patch(
        "/api/v1/users/updateMe",
        {
          name: enteredName,
          email: enteredEmail,
          photo: photo,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.setItem("user", JSON.stringify(response?.data?.data?.user));
      setTimeout(() => {
        history.push("/");
      }, 1500);
    } catch (error) {
      const message = error.response.data.message;
      alert(message);
    }
  };

  const updatePasswordHandler = async (e) => {
    e.preventDefault();

    const enteredCurrentPass = currentPasswordInputRef.current.value;
    const enteredNewPass = newPasswordInputRef.current.value;
    const enteredConfirmPass = confirmPasswordInputRef.current.value;

    try {
      const response = await api.post(
        "/api/v1/users/updatePassword",
        {
          passwordCurrent: enteredCurrentPass,
          password: enteredNewPass,
          passwordConfirm: enteredConfirmPass,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      const message = error.response.data.message;
      alert(message);
    }
  };

  return (
    <React.Fragment>
      <form
        onSubmit={profileSubmitHandler}
        className="flex flex-col w-10/12 mx-auto mt-10"
      >
        <input
          ref={nameInputRef}
          className="p-2 mb-2 rounded-lg"
          id="name"
          type="text"
          defaultValue={name}
        ></input>
        <input
          ref={emailInputRef}
          className="p-2 mb-2 rounded-lg"
          id="email"
          type="email"
          defaultValue={email}
        ></input>
        <div className="grid grid-cols-2 grid-rows-2 gap-y-2">
          <Image
            className="w-16 h-16 rounded-full"
            cloudName="ds9vpuvdm"
            secure="true"
            publicId={photo}
            type="fetch"
            alt="user-img"
          ></Image>
          <label
            htmlFor="photo"
            className="h-10 col-start-2 col-end-3 row-start-1 row-end-2 py-2 mt-3 text-sm text-center bg-gray-600 link"
          >
            Upload Photo
          </label>
          <input
            ref={fileInputRef}
            className="w-11/12 col-start-1 col-end-3 row-start-2"
            id="file"
            type="file"
            onInput={uploadFileHandler}
          ></input>
          {progress > 0 && (
            <p>
              <span className="text-blue-600">
                {progress < 100 ? "Uploading " : "Uploaded "}
              </span>
              <span className="text-green-600">{progress}%</span>{" "}
            </p>
          )}
        </div>
        <button className="text-white bg-gray-700">Update Profile</button>
      </form>
      <form
        onSubmit={updatePasswordHandler}
        className="flex flex-col w-10/12 mx-auto mt-5"
      >
        <div className="mb-4">Update Password</div>
        <input
          ref={currentPasswordInputRef}
          className="p-2 mb-2 rounded-lg"
          id="current-password"
          type="password"
          placeholder="current password"
          minLength={8}
        ></input>
        <input
          ref={newPasswordInputRef}
          className="p-2 mb-2 rounded-lg"
          id="password"
          type="password"
          placeholder="new-password"
          minLength={8}
        ></input>
        <input
          ref={confirmPasswordInputRef}
          className="p-2 mb-2 rounded-lg"
          id="password-confirm"
          type="password"
          placeholder="password confirm"
          minLength={8}
        ></input>
        <button className="text-white bg-gray-600">Update</button>
      </form>
    </React.Fragment>
  );
};

export default MyProfileForm;
