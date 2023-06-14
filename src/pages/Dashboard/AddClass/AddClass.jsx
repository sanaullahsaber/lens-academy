import React, { useContext, useState, useRef, useEffect } from "react";
import { imageUpload } from "../../../api/common";
import { AuthContext } from "../../../providers/AuthProvider";
import { addStudents } from "../../../api/addStudents";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const AddClass = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
  const formRef = useRef(null);


  useEffect(() => {
    if (!user) {
      navigate("/login"); // Redirect to login page if user is not authenticated
    }
  }, [user, navigate]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const className = form.className.value;
    const image = form.image.files[0];
    const instructorName = form.instructorName.value;
    const instructorEmail = form.instructorEmail.value;
    const availableSeats = form.availableSeats.value;
    const price = form.price.value;

    setLoading(true);

    // Upload image
    imageUpload(image)
      .then((data) => {
        const studentData = {
          className,
          instructorName,
          instructorEmail,
          availableSeats: parseFloat(availableSeats),
          price: parseFloat(price),
          image: data.data.display_url,
          instructor: {
            name: user?.displayName,
            image: user?.photoURL,
            email: user?.email,
          },
        };

        // Post room data to server
        addStudents(studentData)
          .then((data) => {
            setLoading(false);
            toast.success("Class added successfully");
            formRef.current.reset(); // Reset the form
            // navigate(""); 
          })
          .catch((error) => {
            setLoading(false);
            toast.error("Failed to add class: " + error.message);
          });
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Failed to upload image: " + error.message);
      });
  };

  const handleImageChange = (image) => {
    console.log(image);
    setUploadButtonText(image.name);
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-9/12 mx-auto p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Create Class</h2>
          <form ref={formRef} onSubmit={handleFormSubmit}>
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
                <label htmlFor="image" className="block font-semibold">
                  {" "}
                  Class Image
                </label>
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
                value={user?.displayName}
                readOnly
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
                value={user?.email}
                readOnly
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
            <div className="flex justify-center items-center">
              <input
                type="submit"
                value={loading ? "Adding Class..." : "Add Class"}
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddClass;
