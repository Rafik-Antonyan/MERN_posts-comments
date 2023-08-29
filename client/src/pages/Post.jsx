import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import {
  createComment,
  getComments,
} from "../redux/features/comment/commentSlice";
import Moment from "react-moment";
import {
  AiFillEye,
  AiOutlineMessage,
  AiTwotoneEdit,
  AiFillDelete,
} from "react-icons/ai";
import { deletePost } from "../redux/features/post/postSlice";
import { toast } from "react-toastify";
import { CommentItem } from "../components/CommentItem";

export const Post = () => {
  const [comment, setComment] = useState("");
  const [post, setPost] = useState({});
  const { comments } = useSelector((state) => state.comment);
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    getPost();
    getCommentsById();
  }, [id]);

  const getPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${id}`);
    setPost(data);
  }, [id]);

  const getCommentsById = useCallback(() => {
    try {
      dispatch(getComments(id));
    } catch (err) {
      console.log(err);
    }
  }, [id, dispatch]);

  const removePostHandler = () => {
    try {
      dispatch(deletePost(id));
      toast("Post was deleted successfully.");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = () => {
    try {
      dispatch(createComment({ postId: id, comment }));
      setComment("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <button className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4">
        <Link className="flex" to={"/"}>
          Back
        </Link>
      </button>
      <div className="flex gap-10 py-8">
        <div className="w-2/3">
          <div className="flex flex-col basis-1/4 flex-grow">
            <div
              className={
                post?.imgUrl ? "flex rouded-sm h-80" : "flex rounded-sm"
              }
            >
              {post?.imgUrl && (
                <img
                  src={`http://localhost:3002/${post.imgUrl}`}
                  alt="img"
                  className="object-cover w-full"
                />
              )}
            </div>
          </div>
          <div className="flex justify-between items-center pt-2">
            <div className="text-xs text-white opacity-50">{post.username}</div>
            <div className="text-xs text-white opacity-50">
              <Moment date={post.createdAt} format="D MMM YYYY" />
            </div>
          </div>
          <div className="text-white text-xl">{post.title}</div>
          <p className="text-white opacity-60 text-xs pt-4 line-clamp-4">
            {post.text}
          </p>

          <div className="flex gap-3 items-center mt-2 justify-between">
            <div className="flex gap-3 mt-4">
              <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                <AiFillEye /> <span>{post.views}</span>
              </button>
              <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                <AiOutlineMessage /> <span>{post.comments?.length || 0} </span>
              </button>
            </div>
            {user?._id === post.author && (
              <div className="flex gap-3 mt-4">
                <button className="flex items-center justify-center gap-2 text-white opacity-50">
                  <Link to={`/${id}/edit`}>
                    <AiTwotoneEdit />
                  </Link>
                </button>
                <button
                  onClick={removePostHandler}
                  className="flex items-center justify-center gap-2 text-white opacity-50"
                >
                  <AiFillDelete />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="w-1/3 p-8 bg-gray-700 flex flex-col gap-2 rounded-sm">
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="comment"
              className="text-black w-full rounded-sm bg-gray-400 border p-2 text-xs outline-none placeholder:text-gray-700"
            />
            <button
              onClick={handleSubmit}
              className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4"
              type="submit"
            >
              Send
            </button>
          </form>

          {comments.map((com) => {
            return <CommentItem key={com._id} com={com} />;
          })}
        </div>
      </div>
    </div>
  );
};
