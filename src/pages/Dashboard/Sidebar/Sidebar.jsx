import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";

import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";
import { BsFillHouseAddFill } from "react-icons/bs";
import { FaChalkboardTeacher, FaHome, FaWallet } from "react-icons/fa";
import useSelected from "../../../hooks/useSelected";


import useAdmin from "../../../hooks/useAdmin";
import useInstructor from "../../../hooks/useInstructor";



const Sidebar = () => {
  const [bookedCourse] = useSelected();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  // TODO load data from the server to have dynamic isAdmin based on Data

  const [isAdmin] = useAdmin();
  
  console.log("This is admin dashboard dekisnaaaaaaaaaa", isAdmin);

  const [isInstructor] = useInstructor();
  console.log('This is Instructor dashboard', isInstructor);
  
  
  
  const [isActive, setActive] = useState("false");
  const toggleHandler = (event) => {
    setToggle(event.target.checked);
  };
  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };
  const handleLogOut = () => {
    logOut();
    navigate("/");
  };
  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold"></div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>
      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-72 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          {/* Branding & Profile Info */}
          <div>
            <div className="w-full hidden md:flex py-2 justify-center items-center  mx-auto"></div>
            <div className="flex flex-col items-center mt-6 -mx-2">
              <Link to="/dashboard">
                <img
                  className="object-cover w-24 h-24 mx-2 rounded-full"
                  src={user?.photoURL}
                  alt="avatar"
                  referrerPolicy="no-referrer"
                />
              </Link>
              <Link to="/dashboard">
                <h4 className="mx-2 mt-2 font-medium text-gray-800  hover:underline">
                  {user?.displayName}
                </h4>
              </Link>
              <Link to="/dashboard">
                <p className="mx-2 mt-1 text-sm font-medium text-gray-600  hover:underline">
                  {user?.email}
                </p>
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav>
              <>
                {/* <label
                  htmlFor="Toggle3"
                  className="inline-flex w-full justify-center items-center px-2 rounded-md cursor-pointer text-gray-800"
                >
                  <input
                    onChange={toggleHandler}
                    id="Toggle3"
                    type="checkbox"
                    className="hidden peer"
                  />
                  <span className="px-4 py-1 rounded-l-md bg-blue-400 peer-checked:bg-gray-300">
                    Guest
                  </span>
                  <span className="px-4 py-1 rounded-r-md bg-gray-300 peer-checked:bg-blue-400">
                    Host
                  </span>
                </label> */}

                {/* Menu Links */}
                {/* //TODO: it is the instructor route after the making the student page then it will uncommment */}

                {/* Menu Links */}
                <>
                  {isAdmin ? (
                    <div>
                      {/* Admin Menu Links */}
                      <NavLink
                        to="/dashboard/admin-manage-classes"
                        className={({ isActive }) =>
                          `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                            isActive
                              ? "bg-gray-300  text-gray-700"
                              : "text-gray-600"
                          }`
                        }
                      >
                        <BsFillHouseAddFill className="w-5 h-5" />

                        <span className="mx-4 font-medium">Manage Classes</span>
                      </NavLink>
                      {/* Menu Links */}
                      <NavLink
                        to="/dashboard/admin-manage-users"
                        className={({ isActive }) =>
                          `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                            isActive
                              ? "bg-gray-300  text-gray-700"
                              : "text-gray-600"
                          }`
                        }
                      >
                        <FaWallet className="w-5 h-5" />

                        <span className="mx-4 font-medium">Manage Users</span>
                      </NavLink>
                    </div>
                  ) : isInstructor ? (
                    <div>
                      {/* isInstructor Menu Links */}
                      <NavLink
                        to="/dashboard/add-class"
                        className={({ isActive }) =>
                          `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                            isActive
                              ? "bg-gray-300  text-gray-700"
                              : "text-gray-600"
                          }`
                        }
                      >
                        <BsFillHouseAddFill className="w-5 h-5" />

                        <span className="mx-4 font-medium">Add a Class</span>
                      </NavLink>
                      {/* isInstructor Menu Links */}
                      <NavLink
                        to="/dashboard/my-classes"
                        className={({ isActive }) =>
                          `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                            isActive
                              ? "bg-gray-300  text-gray-700"
                              : "text-gray-600"
                          }`
                        }
                      >
                        <FaWallet className="w-5 h-5" />

                        <span className="mx-4 font-medium">My Classes</span>
                      </NavLink>
                     
                    </div>
                  ) : (
                    <div>
                      {/* Student Links */}
                      <NavLink
                        to="/dashboard/my-selected-course"
                        className={({ isActive }) =>
                          `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                            isActive
                              ? "bg-gray-300  text-gray-700"
                              : "text-gray-600"
                          }`
                        }
                      >
                        <BsFillHouseAddFill className="w-5 h-5" />

                        <span className="mx-4 font-medium">
                          My Selected Classes
                        </span>
                        <span className="badge inl bg-blue-400 h-7 w-7">
                          +{bookedCourse?.length || 0}
                        </span>
                      </NavLink>

                      {/* Menu Links */}
                      <NavLink
                        to="/dashboard/payment-history"
                        className={({ isActive }) =>
                          `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                            isActive
                              ? "bg-gray-300  text-gray-700"
                              : "text-gray-600"
                          }`
                        }
                      >
                        <BsFillHouseAddFill className="w-5 h-5" />

                        <span className="mx-4 font-medium">
                          My Payment History
                        </span>
                      </NavLink>
                      {/* Menu Links */}
                      <NavLink
                        to="/dashboard/enrolled-classes"
                        className={({ isActive }) =>
                          `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                            isActive
                              ? "bg-gray-300  text-gray-700"
                              : "text-gray-600"
                          }`
                        }
                      >
                        <FaWallet className="w-5 h-5" />

                        <span className="mx-4 font-medium">
                          My Enrolled Classes
                        </span>
                      </NavLink>
                    </div>
                  )}
                </>
              </>
            </nav>
          </div>
        </div>

        <div>
          <hr />
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
              }`
            }
          >
            <FaHome className="w-5 h-5" />

            <span className="mx-4 font-medium">Home</span>
          </NavLink>

          <NavLink
            to="/instructors"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
              }`
            }
          >
            <FaChalkboardTeacher className="w-5 h-5" />

            <span className="mx-4 font-medium">Instructors</span>
          </NavLink>

          <button
            onClick={handleLogOut}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />

            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
