import React, { useContext } from "react";
import loginAnimationLottie from "../../assets/LoginPage/132033-green-login.json";
import Lottie from "lottie-react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { saveUser } from "../../api/auth";
const Login = () => {
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  console.log("login page location", location);
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    if (!email || !password) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Please enter your email address and password.",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    if (password.length < 6) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Password must be at least 6 characters long.",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    signIn(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        saveUser(result.user);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Something Wrong Check the Email & Password",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(error);
      })

  }

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        saveUser(result.user);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        toast.error(err.message);
    })
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
              <h1 className="text-5xl text-center font-bold">Login now!</h1>
            </div>
            <div className="card-body">
              <form onSubmit={handleLogin}>
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
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control mt-6">
                  <input
                    type="Submit"
                    value="Login"
                    className="btn bg-[#487eb0]"
                  />
                </div>
                <div className="my-2">

                <span className="font-semibold">Don't have an account?</span>
                <Link to="/signup" className="text-[#487eb0] font-semibold ">
                  Create an account
                </Link>
                </div>
              </form>
              <div className="divider">OR</div>
              <div className="text-center">
                <button onClick={handleGoogleSignIn} className="btn w-full">
                  <FcGoogle className="w-10 h-8"></FcGoogle>Continue with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// 76-3 Firebase Project Setup For Bistro Boss

export default Login;
