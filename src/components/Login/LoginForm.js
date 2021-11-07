import React, { useRef, useEffect } from "react";
import Cookies from "universal-cookie";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { formActions } from "../../store/validate-form";
import { sendRequest } from "../../store/send-request";
import { authActions } from "../../store/auth-token";
import Popup from "../../UI/Popup";
// import Button from "../Button/Button";
const cookies = new Cookies();

const LoginForm = () => {
  const history = useHistory();
  const emailIsValid = useSelector((state) => state.form.emailIsValid);
  const passwordIsValid = useSelector((state) => state.form.passwordIsValid);
  const data = useSelector((state) => state.request.data);
  const error = useSelector((state) => state.request.error); // initial null
  const dispatch = useDispatch();

  const token = data?.token;
  const user = data?.data?.user;
  console.log(error);

  useEffect(() => {
    if (user && token) {
      cookies.set("jwt", token, {
        path: "/",
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      });
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(authActions.login({ token: token, user: user }));
    }
  }, [dispatch, user, token]);

  useEffect(() => {
    if (token)
      setTimeout(() => {
        history.replace("/");
      }, 2000);
  }, [history, token]);

  const formIsValid = emailIsValid && passwordIsValid;

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const emailBlurHandler = () => {
    const enteredEmail = emailInputRef.current.value;
    dispatch(formActions.validEmail(enteredEmail));
  };
  const passwordBlurHandler = () => {
    const enteredPassword = passwordInputRef.current.value;
    dispatch(formActions.validPassword(enteredPassword));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!formIsValid) return;
    console.log("Form is valid");

    // form valid then send login request
    dispatch(
      sendRequest("POST", `/api/v1/users/login`, {
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
      })
    );
  };

  return (
    <React.Fragment>
      {data.token && <Popup type="success">Logged in successfully!</Popup>}
      {error && <Popup type="error">{error}</Popup>}
      <form
        onSubmit={submitHandler}
        className="flex flex-col w-10/12 mx-auto mt-44"
      >
        <input
          ref={emailInputRef}
          className="p-2 mb-2 rounded-lg"
          id="email"
          type="email"
          placeholder="email"
          onBlur={emailBlurHandler}
        ></input>
        <input
          ref={passwordInputRef}
          className="p-2 mb-2 rounded-lg"
          id="password"
          type="password"
          placeholder="password"
          onBlur={passwordBlurHandler}
        ></input>
        {!formIsValid && <p className="text-red-500">Form is not valid</p>}
        <button className="text-white bg-gray-700">Login</button>
      </form>
    </React.Fragment>
  );
};

export default LoginForm;
