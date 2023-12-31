import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updatePost } from "../redux/features/post/postSlice";
import axios from "../utils/axios";

export const EditPost = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [oldImage, setOldImage] = useState("");
  const [newImage, setNewImage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const getPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${id}`);
    setTitle(data.title);
    setText(data.text);
    setOldImage(data.imgUrl);
  }, [id]);

  const submitHandler = async () => {
    try {
      const updatedData = new FormData();
      updatedData.append("title", title);
      updatedData.append("text", text);
      updatedData.append("id", id);
      updatedData.append("image", newImage);
      dispatch(updatePost(updatedData));
      navigate("/posts");
    } catch (err) {
      console.log(err);
    }
  };

  const clearForm = () => {
    setText("");
    setTitle("");
  };

  useEffect(() => {
    getPost();
  }, [id]);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="w-1/3 mx-auto py-10">
      {/* <label className="text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer">
        Add Image */}
      <input
        id="fileInput"
        type="file"
        // className="hidden"
        accept="image/png, image/jpeg"
        onChange={(e) => {
          setNewImage(e.target.files[0]);
          setOldImage("");
        }}
      />
      {/* </label> */}
      <div className="flex object-cover py-2">
        {newImage && (
          <img
            className="object-cover w-full"
            src={URL.createObjectURL(newImage)}
            alt="new"
          />
        )}
        {oldImage && (
          <img
            className="object-cover w-full"
            src={`http://localhost:3002/${oldImage}`}
            alt="old"
          />
        )}
      </div>
      <label className="text-xs text-white opacity-70">
        Title
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
          placeholder="Title"
        />
      </label>
      <label className="text-xs text-white opacity-70">
        Text
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Title"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none h-40 placeholder:text-gray-700"
        />
      </label>
      <div className="flex gap-8 items-center justify-center mt-4">
        <button
          onClick={submitHandler}
          className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4"
        >
          Update
        </button>
        <button
          onClick={clearForm}
          className="flex justify-center items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
