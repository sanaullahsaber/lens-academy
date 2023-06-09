import React, { useEffect, useState } from "react";
import InstructorCard from "../Home/PopularInstructors/InstructorCard";

const InstructorsPage = () => {
  const [allInstructors, setAllInstructors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/all-instructors")
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // Check the response data
        setAllInstructors(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allInstructors.map((all) => (
          <div key={all._id} className=" pt-20">
            <div className="card w-96 h-full bg-base-100 shadow-xl">
              <figure>
                <img className="w-full h-80" src={all.photo} alt="Shoes" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{all.name}</h2>
                <div className="">
                  <div className="">
                    <strong>Email :</strong> {all.mail}
                  </div>
                  <div className="">
                    <strong> Number of Classes taken :</strong> {all.enrolled}
                  </div>
                  <div className="flex">
                    <div>
                      <strong>Name of the Classes taken :</strong>
                    </div>
                  </div>
                  <div className=""> {all.specialist}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstructorsPage;
