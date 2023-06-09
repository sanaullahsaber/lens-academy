import React from "react";

const InstructorCard = ({ instructor }) => {
  const { name, photo, enrolled, specialist } = instructor;
  return (
    <div className="col-span-1 cursor-pointer group">
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
        >
          <img
            className="
              
              w-full
              h-full
              group-hover:scale-110 
              transition
            "
            src={photo}
            alt="Room"
          />
          <div
            className="
            absolute
            top-3
            right-3
          "
          ></div>
        </div>
        <div className="font-semibold text-lg">{name}</div>
        <div className="">
          <strong>Instructor for:</strong> {specialist}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">
            <strong>Student Enrolled:</strong> {enrolled}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorCard;
