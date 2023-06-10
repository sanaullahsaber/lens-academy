import React, { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

import useSelected from "../../../hooks/useSelected";

const ClassCard = ({ course }) => {
  const { image, title, students, _id, instructor, seats, price } = course;
  const { user } = useContext(AuthContext);
  const [, refetch] = useSelected();
  const navigate = useNavigate();
  const location = useLocation();
  

  const handleSelect = (course) => {
    console.log(course);

    if (user && user?.email) {
      const courseSelected = {
        courseId: _id,
        title,
        image,
        students,
        instructor,
        seats,
        price,
        email: user.email,
      };
      fetch(`${import.meta.env.VITE_API_URL}/booked-course`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(courseSelected),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Course Selected.",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    } else {
      Swal.fire({
        title: "Please login to Select the course",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md h-full flex flex-col">
        <img
          className="w-full h-40 object-cover rounded-t-lg"
          src={image}
          alt={title}
        />
        <div className="p-4 flex-grow">
          <h2 className="text-lg font-bold mb-2">{title}</h2>
          <p className="text-gray-500">{students} students</p>
          <div>
            <p>
              <strong>Instructor Name:</strong> {instructor}
            </p>
            <p>
              <strong>Available Seats:</strong> {seats}
            </p>
            <p>
              <strong>Price:</strong> {price}$
            </p>
          </div>
        </div>
        <div className="card-actions flex  justify-center my-5">
          <button
            onClick={() => handleSelect(course)}
            className="btn btn-outline bg-gray-300 border-0 border-b-4 border-blue-900 mt-4"
            // disabled={isCourseSelected} // Disable the button if the course is already selected
          >
            {/* {isCourseSelected ? "Selected" : "Select"} */}
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
