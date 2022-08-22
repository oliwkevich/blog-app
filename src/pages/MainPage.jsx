import React from "react";
import { PopularPost } from "../components/PopularPost";
import { PostItem } from "../components/PostItem";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../redux/slices/auth/postSlice";

export const MainPage = () => {
  const dispatch = useDispatch();
  const { posts, popularPosts } = useSelector((state) => state.post);

  React.useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  if (!posts.length) {
    return (
      <div className="text-xl text-center text-white py-10">
        Поки що, немає ніяких постів...
      </div>
    );
  }

  return (
    <div className="max-w-[900px] mx-auto py-10">
      <div className="flex justify-between gap-8">
        <div className="flex flex-col gap-10 basis-4/5">
          {posts?.map((post, index) => (
            <PostItem key={index} post={post} />
          ))}
        </div>
        <div className="basis-1/5">
          <div className="text-xs uppercase text-white">Популярні:</div>

          {popularPosts?.map((post, index) => (
            <PopularPost key={index} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};
