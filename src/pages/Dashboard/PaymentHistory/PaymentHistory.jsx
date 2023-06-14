import React, { useContext } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { data } from "autoprefixer";
import { AuthContext } from "../../../providers/AuthProvider";

const PaymentHistory = () => {
   const { user } = useContext(AuthContext);
   const [axiosSecure] = useAxiosSecure();
   const { data: users = [], refetch } = useQuery(["users"], async () => {
     const res = await axiosSecure.get(`/payments?email=${user?.email}`);
     console.log("data ase na ke", res.data); // Log the data
     return res.data;
   });
  return (
    <div>
      <h2>Payment History {users.length}</h2>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Course</th>
              <th>Course Name</th>
              <th>Instructor Name</th>
              <th>Available Seats</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={item.enrolledClassImage}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </td>
                <td>{item.enrolledClassName}</td>

                <td className="text-start">{item.instructorName}</td>
                <td className="text-start">{item.availableSeats}</td>
                <td className="text-start">${item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;