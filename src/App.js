import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";

import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import BlogPost from "./pages/BlogPost";
import MyBlogs from "./pages/MyBlogs";
import MyProfile from "./pages/MyProfile";
import BlogUpdate from "./pages/BlogUpdate";
import NotFound from "./pages/NotFound";
const cookies = new Cookies();

function App() {
  const jwt = cookies.get("jwt");
  const isLoggedIn = useSelector((state) => state.auth.token) || !!jwt;

  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/blogs" />
      </Route>
      <Route exact path="/blogs">
        <Blogs />
      </Route>
      <Route exact path="/blogs/:blogId">
        {isLoggedIn && <BlogDetail />}
        {!isLoggedIn && <Redirect to="/login" />}
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/blog-post">
        {isLoggedIn && <BlogPost />}
        {!isLoggedIn && <Redirect to="/login" />}
      </Route>
      <Route exact path="/my-blogs">
        {isLoggedIn && <MyBlogs />}
        {!isLoggedIn && <Redirect to="/login" />}
      </Route>
      <Route exact path="/my-profile">
        {isLoggedIn && <MyProfile />}
        {!isLoggedIn && <Redirect to="/login" />}
      </Route>
      <Route exact path="/update-blog/:blogId">
        {isLoggedIn && <BlogUpdate />}
        {!isLoggedIn && <Redirect to="/login" />}
      </Route>
      <Route exact path="*">
        <NotFound />
      </Route>
    </Switch>
  );
}

export default App;
