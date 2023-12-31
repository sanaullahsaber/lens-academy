import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllUsers = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await axiosSecure.get(`/users`);
    return res.data;
  });

  const [btnDisabledMap, setBtnDisabledMap] = useState({});

  const handleMakeAdmin = (user) => {
    setBtnDisabledMap((prevBtnDisabledMap) => ({
      ...prevBtnDisabledMap,
      [user._id]: true,
    }));
    fetch(`${import.meta.env.VITE_API_URL}/users/admin/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is an Admin Now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
        setBtnDisabledMap((prevBtnDisabledMap) => ({
          ...prevBtnDisabledMap,
          [user._id]: false,
        }));
      });
  };

  const handleMakeInstructor = (user) => {
    setBtnDisabledMap((prevBtnDisabledMap) => ({
      ...prevBtnDisabledMap,
      [user._id]: true,
    }));
    fetch(`${import.meta.env.VITE_API_URL}/users/instructor/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is now an Instructor!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
        setBtnDisabledMap((prevBtnDisabledMap) => ({
          ...prevBtnDisabledMap,
          [user._id]: false,
        }));
      });
  };

  return (
    <div>
      <h3 className="text-3xl font-semibold my-4">
        Total Users: {users.length}
      </h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin</th>
              <th>Instructor</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role || "student"}</td>
                <td>
                  {user.role === "admin" ? (
                    <button
                      disabled
                      className="btn btn-ghost bg-gray-500 text-white"
                    >
                      <FaUserShield></FaUserShield>Make Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      disabled={btnDisabledMap[user._id]}
                      className="btn btn-ghost bg-gray-500 text-white"
                    >
                      <FaUserShield></FaUserShield>Make Admin
                    </button>
                  )}
                </td>
                <td>
                  {user.role === "instructor" ? (
                    <button
                      disabled
                      className="btn btn-ghost bg-gray-500 text-white"
                    >
                      <FaUserShield></FaUserShield>Make Instructor
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeInstructor(user)}
                      disabled={btnDisabledMap[user._id]}
                      className="btn btn-ghost bg-gray-500 text-white"
                    >
                      <FaUserShield></FaUserShield>Make Instructor
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
