import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const ManageClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await axiosSecure.get(`/addstudents`);
    return res.data;
  });

  // Approve 
  const handleApprove = (user) => {
    fetch(`${import.meta.env.VITE_API_URL}/addstudents/approve/${user._id}`, {
      method: "PATCH"
    })
      .then((res) => res.json())
      .then(data => {
        if (data.modifiedCount) {
          refetch();
          toast.success("Class Approve successfully");
       }
    })

  }

  // denied
 


  return (
    <div>
      <h2>Manage Classes my Admin {users.length}</h2>
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
              <th>Manage Classes</th>
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
                  <div className="font-bold">{user.availableSeats}</div>
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
                  <div className="flex-col w-1/2">
                    <div className="mb-2">
                      <button
                        onClick={() => handleApprove(user)}
                        className="btn  btn-warning  btn-xs"
                      >
                        approved
                      </button>
                    </div>
                    <div className="mb-2  w-full">
                      <button
                        onClick={() => handleDeny(user)}
                        className="btn btn-error  btn-xs"
                      >
                        denied
                      </button>
                    </div>
                    <div className="mb-2">
                      <button className="btn btn-success btn-xs">
                        feedback
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
            {/* row 2 */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageClasses;
