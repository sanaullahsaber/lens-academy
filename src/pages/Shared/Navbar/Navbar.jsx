import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then()
      .catch((error) => console.log(error));
  };

  const navOptions = (
    <>
      <li className="text-blue-900 text-xl font-semibold">
        <Link to="/">Home</Link>
      </li>
      <li className="text-blue-900 text-xl font-semibold">
        <Link to="/">Instructors</Link>
      </li>
      <li className="text-blue-900 text-xl font-semibold">
        <Link to="/"> Classes</Link>
      </li>
      {user ?<li className="text-blue-900 text-xl font-semibold">
        <Link to="/">Dashboard</Link>
      </li>: ""}
    </>
  );

  return (
    <div className="bg-gray-300">
      <div className="max-w-7xl mx-auto navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navOptions}
            </ul>
          </div>
          <Link
            to="/"
            className="btn btn-ghost normal-case text-blue-900 text-xl"
          >
            Lens Academy
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navOptions}</ul>
        </div>
        {user ? (
          <div className="navbar-end flex items-center">
            {user.photoURL && (
              <img
                className="w-10 h-10 rounded-full mr-2"
                src={user.photoURL}
                alt="User Profile"
              />
            )}
            <Link onClick={handleLogOut} to="/login" className="btn text-blue-900 text-xl font-semibold">
              Logout
            </Link>
          </div>
        ) : (
          <div className="navbar-end">
            <Link to="/login" className="btn text-blue-900 text-xl font-semibold">
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
