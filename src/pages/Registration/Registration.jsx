import React, { useContext, useState } from "react";
import loginAnimationLottie from "../../assets/LoginPage/132033-green-login.json";
import Lottie from "lottie-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import { saveUser } from "../../api/auth";

const Registration = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  console.log("login page location", location);
  const from = location.state?.from?.pathname || "/";
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleCreateAnAccount = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    console.log(name, photo, email, password);

    if (!/(?=.*[A-Z])/.test(password)) {
      setError("Please add at least one uppercase");
      return;
    } else if (!/(?=.*[0-9].*[0-9])/.test(password)) {
      setError("Please add at least two numbers");
      return;
    } else if (!/(?=.*[!@#$%^&*])/.test(password)) {
      setError("Please add at least one special character");
      return;
    } else if (password.length < 6) {
      setError("Please add at least 6 character in your password");
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Password's do not match",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    createUser(email, password)
      .then((result) => {
        const createUser = result.user;
        console.log(createUser);

        updateUserProfile(name, photo)
          .then(() => {
            const saveUser = { name: name, email: email };
            fetch(`${import.meta.env.VITE_API_URL}/users`, {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(saveUser),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.insertedId) {
                  form.reset();
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User created successfully.",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  navigate("/"); // Redirect to the home page
                }
              });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="hero min-h-screen">
        <div className="hero-content md:flex-row lg:flex flex-col gap-16">
          <div className="text-center lg:text-left">
            <Lottie
              className="mx-auto"
              animationData={loginAnimationLottie}
              loop={true}
            />
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div>
              <h1 className="text-2xl text-center font-bold">
                Create an account now!
              </h1>
            </div>
            <div className="card-body">
              <form onSubmit={handleCreateAnAccount}>
                {/* Name field */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="input input-bordered"
                    required
                  />
                </div>
                {/* photo field */}
                <div className="form-control">
                  {" "}
                  <label className="label">
                    <span className="label-text">Photo URL</span>
                  </label>
                  <input
                    type="text"
                    name="photo"
                    placeholder="Photo URL"
                    className="input input-bordered"
                    required
                  />
                </div>
                {/* email field */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    className="input input-bordered"
                    required
                  />
                </div>
                {/* password field */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="input input-bordered"
                    required
                  />
                </div>
                {/* confirm password field */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="confirm Password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    className="input input-bordered"
                    required
                  />
                </div>
                {/* Alert for password mismatch */}
                {password !== confirmPassword && (
                  <div style={{ color: "red" }}>Passwords do not match</div>
                )}
                <div className="form-control mt-6">
                  <input
                    type="Submit"
                    value="Create an account"
                    disabled={password !== confirmPassword}
                    className="btn bg-[#487eb0]"
                  />
                </div>
                <div className="my-2">
                  <span className="font-semibold">
                    Already have an account?
                  </span>
                  <Link to="/login" className="text-[#487eb0] font-semibold ">
                    Login
                  </Link>
                </div>
              </form>
              <p className="text-error">{error}</p>
              <p className="text-success">{success}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
