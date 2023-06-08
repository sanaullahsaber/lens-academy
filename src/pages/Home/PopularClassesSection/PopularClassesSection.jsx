import React from "react";


const PopularClassesSection = () => {
  const classes = [
    {
      title: "Digital Photography for Beginners Courses",
      students: 700,
      image:
        "https://www.city-academy.com/staticresources/uploads/images/bg/photography-for-beginners-courses.jpg",
    },
    {
      title: "Documentary Photography Courses",
      students: 600,
      image:
        "https://www.city-academy.com/staticresources/uploads/1676970406.png",
    },
    {
      title: "Studio Lighting for Photography Courses",
      students: 550,
      image:
        "https://www.city-academy.com/staticresources/uploads/images/bg/1582-1572429947.jpg",
    },
    {
      title: "Product Photography Techniques",
      students: 500,
      image:
        "https://www.city-academy.com/staticresources/uploads/1628187056.png",
    },
    {
      title: "Wildlife Photography Courses",
      students: 450,
      image:
        "https://www.city-academy.com/staticresources/uploads/1637603652.jpg",
    },
    {
      title: "Black & White Photography Courses",
      students: 400,
      image:
        "https://www.city-academy.com/staticresources/uploads/1628187017.png",
    },
    {
      title: "Intermediate Digital Photography Courses",
      students: 350,
      image:
        "https://www.city-academy.com/staticresources/uploads/1653584361.jpg",
    },
    {
      title: "Long Exposure Photography Courses",
      students: 300,
      image:
        "https://www.city-academy.com/staticresources/uploads/1653584377.jpg",
    },
    {
      title: "Product Photography Courses",
      students: 300,
      image:
        "https://www.city-academy.com/staticresources/uploads/1653584396.jpg",
    },
  ];

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
