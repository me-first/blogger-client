import React, { useState, useEffect, useRef } from "react";
import Cookies from "universal-cookie";
import Comments from "../Comments/Comments";
import LoadingSpinner from "../../UI/LoadingSpinner";
import api from "../../api/api";

const cookies = new Cookies();

const BlogDetailLikeAndComment = (props) => {
  const [showComments, setShowComments] = useState(false);
  const [like, setLike] = useState(false);
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const [likedId, setLikedId] = useState("");
  const [commentsArr, setCommentsArr] = useState([]);
  const [newComment, setNewComment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const commentInputRef = useRef();
  const { blogId, comments } = props;
  let { likes } = props;

  const token = cookies.get("jwt");
  //GET COMMENTS
  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      const response = await api.get(`/api/v1/blogs/${blogId}/comments`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setIsLoading(false);

      setCommentsArr(response?.data?.data?.comments);
    };
    if (showComments || newComment) {
      sendRequest();
    }
  }, [showComments, blogId, newComment, token]);

  //GET LIKES
  useEffect(() => {
    const sendRequest = async () => {
      const response = await api.get(`/api/v1/blogs/${blogId}/likes`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const likedBlog = response?.data?.data?.likedBlog;
      // console.log(likedBlog);
      setAlreadyLiked(!!likedBlog);
    };

    try {
      blogId && sendRequest();
    } catch (error) {
      console.log(error.response.data);
    }
  }, [token, blogId]);

  useEffect(() => {
    const deleteLike = async () => {
      try {
        const response = await api.delete(
          `/api/v1/likes/${likedId}`,
          {},
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
      } catch (error) {
        console.log(error.response.data);
      }
    };

    if (likedId && !like) {
      deleteLike();
    }
  }, [likedId, like, token]);

  const showCommentHandler = () => {
    setShowComments((prevState) => !prevState);
  };
  const likeChangeHandler = () => {
    setLike((prevState) => !prevState);
  };

  const createLikeRequest = async () => {
    try {
      const response = await api.post(
        `/api/v1/blogs/${blogId}/likes`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setLikedId(response?.data?.data?.newLike?._id);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  // const throttle = (fun, limit) => {
  //   let flag = true;
  //   return function () {
  //     if (flag) {
  //       fun();
  //       flag = false;
  //       setTimeout(() => {
  //         // fun();
  //         flag = true;
  //       }, limit);
  //     }
  //   };
  // };

  // const advanceRequest = throttle(createLikeRequest, 3000);

  if (like) likes = likes + 1;
  if (like) {
    createLikeRequest();
  }

  const commentPostHandler = async (e) => {
    e.preventDefault();
    const enteredComment = commentInputRef.current.value;
    try {
      const response = api.post(
        `/api/v1/blogs/${blogId}/comments`,
        { comment: enteredComment },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
      commentInputRef.current.value = "";
      setNewComment(true);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const allComments = commentsArr?.map((comment) => (
    <Comments
      key={comment._id}
      comment={comment.comment}
      userName={comment.user.name}
      userPhoto={comment.user.photo}
      updatedAt={comment.updatedAt}
    />
  ));

  return (
    <React.Fragment>
      <div>
        <form
          onSubmit={commentPostHandler}
          className="flex items-center justify-between mx-1"
        >
          <textarea
            ref={commentInputRef}
            className="w-10/12 border-2 border-gray-400 border-solid h-7"
            type="text"
            defaultValue={commentInputRef?.current?.value}
            autoFocus
            minLength={1}
          ></textarea>
          <button className="px-3 py-1 text-white bg-blue-500 rounded-lg cursor-pointer">
            Post
          </button>
        </form>
      </div>
      <div className="flex items-center justify-between mx-4">
        <div
          onClick={likeChangeHandler}
          className="flex items-center cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={` mr-2 fill-current feather feather-thumbs-up ${
              like || alreadyLiked ? "text-blue-600" : "text-gray-400"
            }`}
          >
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
          </svg>
          <span className="mt-1">{likes}</span>
        </div>
        <div
          className="text-blue-600 cursor-pointer"
          onClick={showCommentHandler}
          id="comments"
        >
          {newComment ? commentsArr.length : comments} comments
        </div>
      </div>

      {isLoading && <LoadingSpinner updateClass="h-20" />}

      {showComments && allComments}
    </React.Fragment>
  );
};

export default BlogDetailLikeAndComment;
