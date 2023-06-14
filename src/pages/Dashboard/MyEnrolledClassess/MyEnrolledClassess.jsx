import React, { useContext } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { data } from "autoprefixer";
import { AuthContext } from "../../../providers/AuthProvider";

const MyEnrolledClassess = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await axiosSecure.get(`/payments?email=${user?.email}`);
    console.log("data ase na ke", res.data); // Log the data
    return res.data;
  });

  return (
    <div>
      <h2>History  {users.length}</h2>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>User Email</th>
              <th>Transaction Id</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td className="text-start">{item.email}</td>
                <td className="text-start">{item.transactionId}</td>
                <td className="text-start">{item.data}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyEnrolledClassess;
