import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../redux/features/post/postSlice";
import { useNavigate } from "react-router-dom";

export const AddPostPage = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addPost = () => {
    try {
      const data = new FormData();
      data.append("title", title);
      data.append("text", text);
      data.append("image", image);
      dispatch(createPost(data));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const cancelForm = () => {
    setTitle("");
    setText("");
    setImage("");
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="w-1/3 mx-auto py-10">
      {/* <label className="text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer">
        Add Image */}
      <input
        id="fileInput"
        type="file"
        // className="hidden"
        accept="image/png, image/jpeg"
        onChange={(e) => setImage(e.target.files[0])}
      />
      {/* </label> */}
      <div className="flex object-cover py-2">
        {image && <img src={URL.createObjectURL(image)} alt="image" />}
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
          onClick={addPost}
          className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4"
        >
          Save
        </button>
        <button
          onClick={cancelForm}
          className="flex justify-center items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
