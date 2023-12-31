import React, { useState } from "react";
import useSelected from "../../../hooks/useSelected";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../From/CheckoutForm";
import { Link } from "react-router-dom";
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const MySelectedCourse = () => {
  const [bookedCourse, refetch] = useSelected();
  console.log(bookedCourse);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_API_URL}/booked-course/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          });
      }
    });
  };

  return (
    <div>
      <h3>Total Selected : {bookedCourse.length}</h3>

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
              <th>Delete</th>
              <th>Pay</th>
            </tr>
          </thead>
          <tbody>
            {bookedCourse.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={item.image}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </td>
                <td>{item.className}</td>
                <td className="text-start">{item.instructor.name}</td>
                <td className="text-start">{item.availableSeats}</td>
                <td className="text-start">${item.price}</td>
                <td>
                  <button
                    onClick={() => handleDelete(item)}
                    className="btn btn-ghost bg-blue-400  text-white"
                  >
                    <FaTrashAlt></FaTrashAlt>
                  </button>
                </td>
                <td>
                  <Link to={`/dashboard/payment/${item._id}`}>
                    <button className="btn btn-ghost bg-blue-400  text-white">
                      Pay
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Open the modal using ID.showModal() method */}
    </div>
  );
};

export default MySelectedCourse;
