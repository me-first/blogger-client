import React, { useRef, useEffect } from "react";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { sendRequest } from "../../store/send-request";
import { formActions } from "../../store/validate-form";
import { authActions } from "../../store/auth-token";
// import Button from "../Button/Button";
import Popup from "../../UI/Popup";

const cookies = new Cookies();
const SignupForm = () => {
  const history = useHistory();
  const nameIsValid = useSelector((state) => state.form.inputIsValid);
  const emailIsValid = useSelector((state) => state.form.emailIsValid);
  const passwordIsValid = useSelector((state) => state.form.passwordIsValid);
  const error = useSelector((state) => state.request.error);
  const data = useSelector((state) => state.request.data);
  const dispatch = useDispatch();
  // console.log(data);
  const token = data?.token;
  const user = data?.data?.user;

  useEffect(() => {
    if (token && user) {
      cookies.set("jwt", token, {
        path: "/",
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      });
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(authActions.login({ token, user }));
    }
  }, [dispatch, user, token]);

  useEffect(() => {
    if (token) {
      setTimeout(() => {
        history.replace("/");
      }, 2500);
    }
  }, [history, token]);

  // console.log(token, user);

  const formIsValid = nameIsValid && emailIsValid && passwordIsValid;

  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const passwordConfirmInputRef = useRef();

  const nameBlurHanlder = () => {
    const enteredName = nameInputRef.current.value;
    dispatch(formActions.validName(enteredName));
  };
  const emailBlurHanlder = () => {
    const enteredEmail = emailInputRef.current.value;
    dispatch(formActions.validEmail(enteredEmail));
  };
  const passwordBlurHandler = () => {
    const enteredPassword = passwordInputRef.current.value;
    dispatch(formActions.validPassword(enteredPassword));
  };
  const passwordConfirmBlurHandler = () => {
    const enteredPasswordConfirm = passwordConfirmInputRef.current.value;
    dispatch(formActions.validPassword(enteredPasswordConfirm));
  };

  const submitHanlder = (e) => {
    e.preventDefault();
    if (!formIsValid) return;

    console.log("Form is Valid");
    dispatch(
      sendRequest("POST", "/api/v1/users/signup", {
        name: nameInputRef.current.value,
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
        passwordConfirm: passwordConfirmInputRef.current.value,
      })
    );
  };

  return (
    <React.Fragment>
      {token && <Popup type="error">Signed up successfully</Popup>}
      {error && <Popup type="error">{error}</Popup>}
      <form
        onSubmit={submitHanlder}
        className="flex flex-col w-10/12 mx-auto mt-44"
      >
        <input
          onBlur={nameBlurHanlder}
          ref={nameInputRef}
          className="p-2 mb-2 rounded-lg"
          id="name"
          type="text"
          placeholder="name"
        ></input>
        <input
          onBlur={emailBlurHanlder}
          ref={emailInputRef}
          className="p-2 mb-2 rounded-lg"
          id="email"
          type="email"
          placeholder="email"
        ></input>
        <input
          onBlur={passwordBlurHandler}
          ref={passwordInputRef}
          className="p-2 mb-2 rounded-lg"
          id="password"
          type="password"
          placeholder="password"
        ></input>
        <input
          onBlur={passwordConfirmBlurHandler}
          ref={passwordConfirmInputRef}
          className="p-2 mb-2 rounded-lg"
          id="password-confirm"
          type="password"
          placeholder="password confirm"
        ></input>
        {!formIsValid && <p className="text-red-500">Form is not valid</p>}
        <button className="text-white bg-gray-700">Sign Up</button>
      </form>
    </React.Fragment>
  );
};

export default SignupForm;
