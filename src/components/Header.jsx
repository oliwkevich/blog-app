import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { checkIsAuth, logOut } from "../redux/slices/auth/authSlice";

export const Header = () => {
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logOut());
    window.localStorage.removeItem("token");
    toast.success("Ви успішно вийшли з профілю!");
  };

  const activeStyle = {
    color: "white",
  };

  return (
    <div className="flex py-4 justify-between items-center">
      <span className="flex justify-center items-center w-12 h-8 bg-gray-600 text-xs text-white rounded-sm cursor-pointer">
        <Link to="/">BLOG.</Link>
      </span>

      {isAuth && (
        <ul className="flex gap-8">
          <li>
            <NavLink
              to="/"
              className="text-xs text-gray-400 hover:text-white"
              style={({ isActive }) => (isActive ? activeStyle : null)}
            >
              ГОЛОВНА
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/posts"
              className="text-xs text-gray-400 hover:text-white"
              style={({ isActive }) => (isActive ? activeStyle : null)}
            >
              МОЇ ПОСТИ
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/new"
              className="text-xs text-gray-400 hover:text-white"
              style={({ isActive }) => (isActive ? activeStyle : null)}
            >
              ДОДАТИ ПОСТ
            </NavLink>
          </li>
        </ul>
      )}

      <div className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2 cursor-pointer">
        {isAuth ? (
          <button onClick={logoutHandler}>Вийти</button>
        ) : (
          <Link to={"/login"}>Увійти</Link>
        )}
      </div>
    </div>
  );
};
