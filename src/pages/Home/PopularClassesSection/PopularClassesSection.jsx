import React from "react";
import { classes } from "./PopularClassesSectionData"

const PopularClassesSection = () => {
  

  return (
    <div className="my-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Popular Classes</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {classes.map((course, index) => (
          <div key={index} className="p-2">
            <div className="bg-white rounded-lg shadow-md h-full flex flex-col">
              <img
                className="w-full h-40 object-cover rounded-t-lg"
                src={course.image}
                alt={`Image ${index + 1}`}
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
