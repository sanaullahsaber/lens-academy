import React, { useEffect, useState } from 'react';
import InstructorCard from './InstructorCard';

const PopularInstructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    fetch("../../../../public/PopularInstructors.json")
      .then(res => res.json())
      .then(data => {
        setInstructors(data)
        setLoading(false)
      })
    .catch(err =>console.log(err))
  }, [])

  if (loading) {
    return (
      <span className="loading loading-spinner loading-lg text-info"></span>
    );
  }
  
  return (
    <div className="my-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Popular Instructors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {instructors.map((instructor) => (
          <InstructorCard key={instructor.id} instructor={instructor}></InstructorCard>
        ))}
      </div>
    </div>
  );
};

export default PopularInstructors;