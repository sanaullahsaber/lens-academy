import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users`);
    return res.json();
  });

  const [disabledAdminButtonId, setDisabledAdminButtonId] = useState(null);
  const [disabledInstructorButtonId, setDisabledInstructorButtonId] =
    useState(null);

  useEffect(() => {
    const disabledAdminButtonIdFromStorage = localStorage.getItem(
      "disabledAdminButtonId"
    );
    const disabledInstructorButtonIdFromStorage = localStorage.getItem(
      "disabledInstructorButtonId"
    );

    setDisabledAdminButtonId(disabledAdminButtonIdFromStorage);
    setDisabledInstructorButtonId(disabledInstructorButtonIdFromStorage);
  }, []);

  const handleMakeRole = (user, role) => {
    if (role === "admin") {
      setDisabledAdminButtonId(user._id);
      setDisabledInstructorButtonId(null);
      localStorage.setItem("disabledAdminButtonId", user._id);
      localStorage.removeItem("disabledInstructorButtonId");
    } else if (role === "instructor") {
      setDisabledInstructorButtonId(user._id);
      setDisabledAdminButtonId(null);
      localStorage.setItem("disabledInstructorButtonId", user._id);
      localStorage.removeItem("disabledAdminButtonId");
    }

    const updatedUser = { ...user, role };
    fetch(`${import.meta.env.VITE_API_URL}/users/${role}/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          let title;
          if (role === "admin") {
            title = `${user.name} is now an admin!`;
          } else {
            title = `${user.name} is now an instructor!`;
          }
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: title,
            showConfirmButton: false,
            timer: 1500,
          });
        }
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
                    "admin"
                  ) : (
                    <button
                      onClick={() => handleMakeRole(user, "admin")}
                      disabled={user._id === disabledAdminButtonId}
                      className="btn btn-ghost bg-gray-500 text-white"
                    >
                      <FaUserShield></FaUserShield>Make Admin
                    </button>
                  )}
                </td>
                <td>
                  {user.role === "instructor" ? (
                    "instructor"
                  ) : (
                    <button
                      onClick={() => handleMakeRole(user, "instructor")}
                      disabled={user._id === disabledInstructorButtonId}
                      className="btn btn-ghost bg-gray-500 text-white"
                    >
                      <FaUserShield></FaUserShield>Make Instructor
                    </button>
                  )}
                </td>
                <td>
                  <button className="btn btn-ghost bg-red-600 text-white">
                    <FaTrashAlt></FaTrashAlt>
                  </button>
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
