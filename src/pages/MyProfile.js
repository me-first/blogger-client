import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendRequest } from "../store/send-request";

import Layout from "../components/Layout/Layout";
import MyProfileForm from "../components/MyProfileForm/MyProfileForm";
import LoadingSpinner from "../UI/LoadingSpinner";

const MyProfile = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.request.isLoading);
  const data = useSelector((state) => state.request.data);
  // console.log(data?.data);
  const user = data?.data?.user;

  useEffect(() => {
    dispatch(sendRequest("GET", "/api/v1/users/getMe"));
  }, [dispatch]);

  return (
    <Layout>
      <h2 className="mt-2 ml-4 text-lg font-bold">My Profile</h2>
      {isLoading && <LoadingSpinner />}
      <MyProfileForm
        name={user?.name}
        email={user?.email}
        photo={user?.photo}
      />
    </Layout>
  );
};

export default MyProfile;
