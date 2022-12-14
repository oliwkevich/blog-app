import React from "react";
import axios from "../utils/axios";
import { PostItem } from "../components/PostItem";

export const PostsPage = ({ post }) => {
  const [posts, setPosts] = React.useState([]);

  const fetchMyPosts = async () => {
    try {
      const { data } = await axios.get("/posts/user/me");
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchMyPosts();
  }, []);

  return (
    <div className="w-1/2 mx-auto py-10 flex flex-col gap-10">
      {posts?.map((post, idx) => (
        <PostItem post={post} key={idx} />
      ))}
    </div>
  );
};
