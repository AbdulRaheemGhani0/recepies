import React, { lazy, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { AuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/Firebase";
import ProfileSection from "../Profile/profie";

export default function Header() {
  const { user, setUser } = useContext(AuthContext);

  const handleLogoutUser = async () => {
    await signOut(auth);
  };

  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <img
              src="https://www.logodee.com/wp-content/uploads/2021/12/49.jpg"
              className="mr-3 h-20"
              alt="Logo"
            />
          </Link>

          <div className="flex items-center lg:order-2">
            {user?.isLogin ? (
              <Space wrap size={40}>
                <Link to={"/profileSection"}>
                  <Avatar size="large"
                    src={<img src={user?.userInfo?.photoUrl} alt="avatar" />}
                  />
                </Link>
              </Space>
            ) : (
              <Link
                to="signup"
                className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
              >
                Sign up
              </Link>
            )}

            {user?.isLogin ? (
              <Link to={"/"}>
                {" "}
                <button
                  onClick={handleLogoutUser}
                  className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                >
                  Log Out
                </button>
              </Link>
            ) : (
              <Link
                to="signin"
                className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
              >
                Log in
              </Link>
            )}
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  to="/"
                  className={`block py-2 pr-4 pl-3 duration-200border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`}
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/recepie"
                  className={`block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`}
                >
                  Recepie
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/createrecepie"
                  className={`block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`}
                >
                  Add Recepie
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/blog"
                  className={`block py-2 pr-4 pl-3 duration-200  border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`}
                >
                  Blog
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={`block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`}
                >
                  About
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
