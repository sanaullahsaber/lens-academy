import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useSelected from "../../hooks/useSelected";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAdmin from "../../hooks/useAdmin";
import useInstructor from "../../hooks/useInstructor";

const ClassPageCard = ({ course }) => {
  const { image, className, instructor, availableSeats, price, _id } = course;
  const instructorName = instructor?.name;

  // check admin
  const [isAdmin] = useAdmin();
  console.log("Admin aitaaaaaaaaaaaaaaaaaaaaaaa", isAdmin);
  

  // check Instructor
  const [isInstructor] = useInstructor();
  console.log("instructor aitaaaaaaaaaaaaaaaaaaaaa", isInstructor);
  

  



  const { user } = useContext(AuthContext);
  const [, refetch] = useSelected();
  const navigate = useNavigate();
  const location = useLocation();

  const [isCourseSelected, setIsCourseSelected] = useState(false); // State to track selection status

  const handleSelect = (course) => {
    console.log(course);

    if (user && user?.email) {
      const courseSelected = {
        courseId: _id,
        image,
        className,
        instructor,
        availableSeats,
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
            setIsCourseSelected(true); // Update the selection status

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
  const isButtonDisabled =
    availableSeats === 0 || isAdmin || isInstructor || isCourseSelected;

  return (
    <div className=" pt-20">
      <div className="card w-96 h-full bg-base-100 shadow-xl">
        <figure>
          <img className="w-full h-80" src={image} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{className}</h2>
          <div className="">
            <div className="">
              <strong>Instructor name :</strong> {instructorName}
            </div>
            <div className="">
              <strong>Available seats :</strong> {availableSeats}
            </div>
            <div className="">
              <strong>Price :</strong> {price}
            </div>
            <div className="card-actions flex  justify-center ">
              <button
                onClick={() => handleSelect(course)}
                disabled={isButtonDisabled} // Disable the button in specific conditions
                className="btn btn-outline bg-gray-300 border-0 border-b-4 border-blue-900 mt-4"
              >
                Select
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassPageCard;
