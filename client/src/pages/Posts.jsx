import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import { PostItem } from "../components/PostItem";

export const Posts = () => {
  const [posts, setPosts] = useState([]);
  const fetchMyPosts = async () => {
    try {
      const { data } = await axios.get("/posts/user/me");
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  return (
    <div className="w-1/2 mx-auto py-10 flex flex-col gap-10">
      {posts.map((post, index) => {
        return <PostItem post={post} key={index} />;
      })}
    </div>
  );
};
