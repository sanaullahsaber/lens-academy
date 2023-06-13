import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import PrivateRoute from "../../Routes/PrivateRoute";

const ClassPage = () => {
  const [approveClasses, setApproveClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/addstudents`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setApproveClasses(data), setLoading(false);
      });
  }, []);

  const approve = approveClasses.filter(
    (myItem) => myItem.status === "approved"
  );
  if (loading) {
    return (
      <span className="loading loading-spinner loading-lg text-info"></span>
    );
  }

  if (approve) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {approve.map((all) => (
            <div key={all._id} className=" pt-20">
              <div className="card w-96 h-full bg-base-100 shadow-xl">
                <figure>
                  <img className="w-full h-80" src={all.image} alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{all.className}</h2>
                  <div className="">
                    <div className="">
                      <strong>Instructor name :</strong> {all.instructor.name}
                    </div>
                    <div className="">
                      <strong>Available seats :</strong> {all.availableSeats}
                    </div>
                    <div className="">
                      <strong>Price :</strong> {all.price}
                    </div>
                    <div className="card-actions flex  justify-center ">
                      <button className="btn btn-outline bg-gray-300 border-0 border-b-4 border-blue-900 mt-4">
                        Select
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default ClassPage;
