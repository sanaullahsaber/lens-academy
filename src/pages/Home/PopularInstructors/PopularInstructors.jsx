import React, { useEffect, useState } from 'react';
import InstructorCard from './InstructorCard';

const PopularInstructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortingOption, setSortingOption] = useState("desc");

  const handleSortingOptionChange = event => {
    setSortingOption(event.target.value)
  }

  useEffect(() => {
    setLoading(true)
    fetch(`${import.meta.env.VITE_API_URL}/instructors?sort=${sortingOption}`)
      .then((res) => res.json())
      .then((data) => {
        setInstructors(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [sortingOption])

  if (loading) {
    return (
      <div className="flex justify-center items-center my-96">
        <span className="loading loading-spinner loading-lg text-info"></span>
      </div>
    );
  }
  
  return (
    <div className="my-10">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Popular Instructors
      </h2>
      <div className="sorting-dropdown my-3">
        <label htmlFor="sorting-option">Sort by:</label>
        <select
          id="sorting-option"
          value={sortingOption}
          onChange={handleSortingOptionChange}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {instructors.map((instructor) => (
          <InstructorCard
            key={instructor._id}
            instructor={instructor}
          ></InstructorCard>
        ))}
      </div>
    </div>
  );
};

export default PopularInstructors;