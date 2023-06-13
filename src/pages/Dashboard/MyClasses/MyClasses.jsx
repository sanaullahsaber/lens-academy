import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MyClasses = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await axiosSecure.get(
      `/addstudents?instructorEmail=${user?.email}`
    );
    return res.data;
  });
  // const [classes, setClasses] = useState([]);

  //  const url = `${import.meta.env.VITE_API_URL}/addstudents?instructorEmail=${user?.email}`;

  // useEffect(() => {
  //   fetch(url)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("Fetched classes: mane kaj kortase", data);
  //       setClasses(data);
  //     })
  //     .catch((error) => {
  //       console.error("Failed to fetch instructor classes:", error);
  //     });
  // }, []);

   const [selectedUser, setSelectedUser] = useState(null);

   const handleShowFeedback = (user) => {
     setSelectedUser(user);
     window.my_modal_1.showModal();
   };


  return (
    <div>
      <h3 className="text-3xl font-semibold my-4">
        Instructor My Classes: {users.length}
      </h3>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Instructor name</th>
              <th>Instructor email</th>
              <th>Available seats</th>
              <th>Price</th>
              <th>Status</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={user.image} alt={user.className} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.className}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="font-bold">{user.instructorName}</div>
                </td>
                <td>
                  <div className="font-bold">{user.instructorEmail}</div>
                </td>
                <td>
                  <div className="font-bold text-center">
                    {user.availableSeats}
                  </div>
                </td>
                <td>
                  <div className="font-bold">{user.price}</div>
                </td>
                <td>
                  <div className="font-bold">
                    {user.status === "pending" ? (
                      <span className="text-yellow-500">Pending</span>
                    ) : user.status === "approved" ? (
                      <span className="text-green-500">Approved</span>
                    ) : user.status === "denied" ? (
                      <span className="text-red-500">Denied</span>
                    ) : (
                      ""
                    )}
                  </div>
                </td>
                <td>
                  <div className="mb-2">
                    {user.feedback ? ( // Check if feedback exists
                      <button className="btn btn-error btn-xs">
                        <label
                          onClick={() => handleShowFeedback(user)}
                          className=""
                        >
                          Show Feedback
                        </label>
                      </button>
                    ) : (
                      <button className="btn btn-success btn-xs" disabled>
                        Show Feedback
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Open the modal using ID.showModal() method */}
      <dialog id="my_modal_1" className="modal">
        <form method="dialog" className="modal-box">
          {selectedUser && (
            <>
              <h3 className="font-bold text-lg">Course Name: {selectedUser.className}</h3>
              <p className="py-4"><strong>Feedback by Admin Why Denied :</strong> {selectedUser.feedback}</p>
            </>
          )}
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default MyClasses;
