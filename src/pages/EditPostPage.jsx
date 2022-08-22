import axios from "../utils/axios";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updatePost } from "../redux/slices/auth/postSlice";

export const EditPostPage = () => {
  const [title, setTitle] = React.useState("");
  const [text, setText] = React.useState("");
  const [oldImg, setOldImg] = React.useState("");
  const [newImg, setNewImg] = React.useState("");

  const params = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchPost = React.useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`);
    setTitle(data.title);
    setText(data.text);
    setOldImg(data.imgUrl);
  }, [params.id]);

  React.useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const clearFormData = () => {
    navigate('/posts')
  };

  const submitHandler = () => {
    try {
      const updatedPost = new FormData();
      updatedPost.append("title", title);
      updatedPost.append("text", text);
      updatedPost.append("id", params.id);
      updatedPost.append("img", newImg);
      dispatch(updatePost(updatedPost));
      navigate("/posts");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="w-1/3 mx-auto py-10" onSubmit={(e) => e.preventDefault()}>
      <label
        className="text-gray-300 
     py-2
    bg-gray-600
     text-xs
     mt-2
     flex 
     items-center
     justify-center
     border-2
     border-dotted
     cursor-pointer
     "
      >
        Прикріпити зображення:
        <input
          type="file"
          className="hidden"
          onChange={(e) => {
            setNewImg(e.target.files[0]);
            setOldImg("");
          }}
        />
      </label>
      <div className="flex object-cover py-2">
        {oldImg && (
          <img src={`http://localhost:3003/${oldImg}`} alt={oldImg.name} />
        )}
        {newImg && <img src={URL.createObjectURL(newImg)} alt={newImg.name} />}
      </div>

      <label className="text-xs text-white opacity-70">
        Заголовок:
        <input
          type="text"
          value={title}
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
          placeholder="Введіть заголовок поста"
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <label className="text-xs text-white opacity-70">
        Текст:
        <textarea
          value={text}
          className="mt-1 text-black w-full resize-none h-40 rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
          placeholder="Введіть текст поста"
          onChange={(e) => setText(e.target.value)}
        />
      </label>

      <div className="flex gap-8 items-center justify-center mt-4">
        <button
          className="flex items-center bg-gray-500 text-xs text-white rounded-sm py-2 px-4"
          onClick={submitHandler}
        >
          Оновити
        </button>
        <button
          className="flex items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4"
          onClick={clearFormData}
        >
          Відмінити
        </button>
      </div>
    </form>
  );
};
