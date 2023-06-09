import React, { useEffect, useState } from "react";

const PopularClassesSection = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortingOrder, setSortingOrder] = useState("desc");

  const handleSortingChange = (event) => {
    setSortingOrder(event.target.value);
  };

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/classes?sort=${sortingOrder}`)
      .then((res) => res.json())
      .then((data) => {
        setClasses(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [sortingOrder]);

  if (loading) {
    return (
      <div className="flex justify-center items-center my-96">
        <span className="loading loading-spinner loading-lg text-info"></span>
      </div>
    );
  }

  return (
    <div className="my-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Popular Classes</h2>
      <div className="sorting-dropdown my-3">
        <label htmlFor="sorting-order">Sort by:</label>
        <select
          id="sorting-order"
          value={sortingOrder}
          onChange={handleSortingChange}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {classes.map((course) => (
          <div key={course._id} className="p-2">
            <div className="bg-white rounded-lg shadow-md h-full flex flex-col">
              <img
                className="w-full h-40 object-cover rounded-t-lg"
                src={course.image}
                
              />
              <div className="p-4 flex-grow">
                <h2 className="text-lg font-bold mb-2">{course.title}</h2>
                <p className="text-gray-500">{course.students} students</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularClassesSection;
