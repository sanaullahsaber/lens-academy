import React, { useContext, useState } from 'react';
import { imageUpload } from '../../../api/common';
import { AuthContext } from '../../../providers/AuthProvider';
import { addStudents } from '../../../api/addStudents';

const AddClass = () => {
  const {user} = useContext(AuthContext)
 
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const className = form.className.value;
    const image = form.image.files[0];
    const instructorName = form.instructorName.value;
    const instructorEmail = form.instructorEmail.value;
    const availableSeats = form.availableSeats.value;
    const price = form.price.value;

    // upload image
    imageUpload(image)
      .then(data => {
        const studentData = {
          className,
          instructorName,
          instructorEmail,
          availableSeats,
          price: parseFloat(price),
          image: data.data.display_url,
          instructor: {
            name: user?.displayName,
            image: user?.photoURL,
            email: user?.email,
          },
        };

        // post room data to server
        addStudents(studentData)
        .then(data => console.log(data))
        .catch(err =>console.log(err))

        console.log(studentData);
      })
      .catch(err => console.log(err))

    // console.log(className,image,instructorName,instructorEmail,availableSeats,price);
  }

  const handleImageChange = (image) => {
    console.log(image);
    setUploadButtonText(image.name);
  };


  return (
    <div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-9/12 mx-auto p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Create Class</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label htmlFor="className" className="block font-semibold">
                Class Name
              </label>
              <input
                type="text"
                id="className"
                name="className"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <div className="  bg-white w-full  m-auto rounded-lg">
                <label htmlFor="image"  className="block font-semibold"> Class Image</label>
                <div className="file_upload px-5 py-3 relative border border-gray-300 rounded-lg">
                  <div className="flex flex-col w-max  text-center">
                    <label>
                      <input
                        onChange={(event) => {
                          handleImageChange(event.target.files[0]);
                        }}
                        className="text-sm cursor-pointer w-36 hidden"
                        type="file"
                        name="image"
                        id="image"
                        accept="image/*"
                        hidden
                      />
                      <div className="bg-blue-400 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-blue-900">
                        {uploadButtonText}
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="instructorName" className="block font-semibold">
                Instructor Name
              </label>
              <input
                type="text"
                id="instructorName"
                name="instructorName"
                className="w-full px-4 py-2 border rounded bg-gray-200"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="instructorEmail" className="block font-semibold">
                Instructor Email
              </label>
              <input
                type="email"
                id="instructorEmail"
                name="instructorEmail"
                className="w-full px-4 py-2 border rounded bg-gray-200"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="availableSeats" className="block font-semibold">
                Available Seats
              </label>
              <input
                type="number"
                id="availableSeats"
                name="availableSeats"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block font-semibold">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className='flex justify-center items-center'>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            >
              Add Class
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddClass;