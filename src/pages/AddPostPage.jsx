import React from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../redux/slices/auth/postSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


//TODO: https://youtu.be/QxTeE5EMiWI?t=12379


export const AddPostPage = () => {
  const [title, setTitle] = React.useState("");
  const [text, setText] = React.useState("");
  const [img, setImg] = React.useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const submitHandler = () => {
    try {
      const data = new FormData();
      data.append("title", title);
      data.append("text", text);
      data.append("img", img);
      dispatch(createPost(data));
      navigate("/");
      toast.success("Ви успішно створили пост!");
    } catch (error) {
      console.log(error);
      toast.error("Щось пішло не так, спробуйте пізніше!");
    }
  };

  const clearFormData = () => {
    if (window.confirm("Ви впевнені, що хочете відмінити створення поста?")) {
      setText("");
      setTitle("");
      setImg("");
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
          onChange={(e) => setImg(e.target.files[0])}
        />
      </label>
      <div className="flex object-cover py-2">
        {img ? (
          <img src={URL.createObjectURL(img)} alt={img.name} />
        ) : (
          <p className="text-gray-800 mt-2">Ви ще не завантажили нічого...</p>
        )}
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
          Добавити пост
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
