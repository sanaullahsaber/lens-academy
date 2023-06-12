import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Feedback = () => {
  const [axiosSecure] = useAxiosSecure()
  const { state } = useLocation();
  const { user } = state;
  const navigate = useNavigate();

  const handleFeedback = (event, user) => {
    event.preventDefault();
    const value = event.target.feedback.value;
    if (value) {
      axiosSecure
        .patch(`/addstudents/${user._id}?status=denied`, { feedback: value })
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            toast.success(`${user.name} denied`);
            navigate("/dashboard/admin-manage-classes", { replace: true });
          }
        })
        .catch((err) => toast.error(err.message));
    } else {
      toast.error("Please Give Feedback");
    }
  };

  return (
    <div className="mt-40 flex justify-center items-center">
      <h1 className="uppercase text-3xl text-center">
        <span className="text-yellow-600">{user.name}</span>
      </h1>
      <form onSubmit={(event) => handleFeedback(event, user)}>
        <textarea
          name="feedback"
          className="w-full border-black border-2 h-60"
          placeholder="Feedback"
        />
        <button type="submit" className="btn btn-error w-full">Send</button>
      </form>
    </div>
  );
};

export default Feedback;
