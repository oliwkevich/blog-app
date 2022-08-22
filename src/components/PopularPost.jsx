import React from "react";

export const PopularPost = ({ post }) => {
  return (
    <div className="bg-gray-600 my-1">
      <div className="flex text-xs text-gray-300 hover:bg-gray-800 hover:text-white cursor-pointer p-2">
        {post.title}
      </div>
    </div>
  );
};
