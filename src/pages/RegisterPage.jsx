import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { checkIsAuth, registerUser } from "../redux/slices/auth/authSlice";
import { toast } from "react-toastify";

export const RegisterPage = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const isAuth = useSelector(checkIsAuth);

  React.useEffect(() => {
    if (status) {
      toast.info(status);
    }
    if (isAuth) {
      navigate("/");
    }
  }, [status, isAuth, navigate]);

  const handleSubmit = () => {
    try {
      dispatch(
        registerUser({
          username,
          password,
        })
      );
      setPassword("");
      setUsername("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-1/4 h-60 mx-auto mt-40"
    >
      <h1 className="text-lg text-white text-center">РЕГІСТРАЦІЯ</h1>
      <label className="text-xs text-gray-400">
        Логін:
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Введіть логін..."
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        />
      </label>
      <label className="text-xs text-gray-400">
        Пароль:
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Введіть пароль..."
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        />
      </label>
      <div className="flex gap-8 justify-center mt-4 items-center">
        <button
          onClick={handleSubmit}
          type="submit"
          className="flex justify-center items-center text-xs bg-gray-600 text-white rounded-sm py-2 px-4"
        >
          Створити
        </button>
        <Link
          to="/login"
          className="felx justify-center items-center text-xs text-white"
        >
          Є акаунт? <span className="border-b">Увійти</span>
        </Link>
      </div>
    </form>
  );
};
