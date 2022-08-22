import React from "react";
import Moment from "react-moment";
import {
  AiFillEye,
  AiOutlineMessage,
  AiTwotoneEdit,
  AiFillDelete,
} from "react-icons/ai";
import axios from "../utils/axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removePost } from "../redux/slices/auth/postSlice";
import { toast } from "react-toastify";
import {
  createComment,
  getPostComments,
} from "../redux/slices/comments/commentSlice";
import { CommentItem } from "../components/CommentItem";
import { checkIsAuth } from "../redux/slices/auth/authSlice";

export const PostPage = () => {
  const [post, setPost] = React.useState(null);
  const [comment, setComment] = React.useState("");
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { comments } = useSelector((state) => state.comment);
  const isAuth = useSelector(checkIsAuth);

  const fetchPost = React.useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`);
    setPost(data);
  }, [params.id]);

  const fetchComments = React.useCallback(async () => {
    try {
      dispatch(getPostComments(params.id));
    } catch (error) {
      console.log(error);
    }
  }, [params.id, dispatch]);

  React.useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  React.useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  if (!post) {
    return (
      <div className="text-xl text-center text-white py-10">Загрузка...</div>
    );
  }

  const removePostHandler = () => {
    try {
      if (window.confirm("Ви точно хочете видали пост?")) {
        dispatch(removePost(params.id));
        toast.success("Пост був успішно видалений");
        navigate("/");
      } else {
        toast.error("Ви відмінили видалення поста");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    try {
      const postId = params.id;
      dispatch(createComment({ postId, comment }));
      console.log({ postId, comment });
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4">
        <Link to={"/"}>Назад</Link>
      </button>
      <div className="flex gap-10 py-8">
        <div className="w-2/3 ">
          <div className="flex flex-col basis-1/4 flex-grow">
            <div
              className={
                post?.imgUrl ? "flex rounded-sm h-80" : "flex rounded-sm"
              }
            >
              {post?.imgUrl && (
                <img
                  src={`http://localhost:3003/${post.imgUrl}`}
                  alt="img"
                  className="object-cover w-full"
                />
              )}
            </div>
          </div>
          <div className="flex justify-between items-center pt-2">
            <div className="text-xs text-white opacity-50">
              {post?.username}
            </div>
            <div className="text-xs text-white opacity-50">
              <Moment date={post?.createdAt} format="D MM YYYY" />
            </div>
          </div>
          <div className="text-white text-xl">{post?.title}</div>
          <p className="text-white opacity-50 text-xs pt-4">{post?.text}</p>

          <div className="flex gap-3 items-center mt-2 justify-between">
            <div className="flex gap-3 mt-4">
              <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                <AiFillEye /> <span>{post?.views}</span>
              </button>
              <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                <AiOutlineMessage /> <span>{post?.comments?.length}</span>
              </button>
            </div>
            {/* Проверяем равен ли юзер автору поста, если да - показываем удаление и редактирование */}
            {user?._id === post.author && (
              <div className="flex gap-3 mt-4">
                <button className="flex items-center justify-center gap-2 text-white opacity-50">
                  <Link to={`/${params.id}/edit`}>
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
        <div className="w-1/3 p-8 bg-white bg-opacity-20 flex flex-col gap-2 rounded-sm">
          <p className="text-white text-lg">Коментарі:</p>
          {isAuth && (
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Введіть коментар..."
                className="text-black w-full rounded-sm bg-gray-400 border p-2 text-xs outline-none placeholder:text-gray-700"
              />
              <button
                type="submit"
                onClick={handleSubmit}
                className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4"
              >
                Відправити
              </button>
            </form>
          )}
          {comments?.map((comment, id) => (
            <CommentItem comment={comment} key={id} />
          ))}
        </div>
      </div>
    </div>
  );
};
