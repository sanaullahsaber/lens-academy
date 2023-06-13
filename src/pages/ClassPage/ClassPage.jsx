import React, {  useEffect, useState } from "react";


import ClassPageCard from "./ClassPageCard";

const ClassPage = () => {
  // filter section
  const [approveClasses, setApproveClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/addstudents`)
      .then((res) => res.json())
      .then((data) => {
 
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
          {approve.map((course) => (
            <ClassPageCard key={course._id} course={course}></ClassPageCard>
          ))}
        </div>
      </div>
    );
  }
};

export default ClassPage;
