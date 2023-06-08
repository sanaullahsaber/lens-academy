import React from 'react';
import loginAnimationLottie from "../../assets/LoginPage/132033-green-login.json";
import Lottie from "lottie-react";
import { Link } from 'react-router-dom';

const Registration = () => {
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
              <h1 className="text-2xl text-center font-bold">Create an account now!</h1>
            </div>
            <div className="card-body">
              <form >
                {/* Name field */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    name="text"
                    placeholder="Name"
                    className="input input-bordered"
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

                {/* confirm password field */}
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
                  <span className="font-semibold">Already have an account?</span>
                  <Link to="/login" className="text-[#487eb0] font-semibold ">
                    Login
                  </Link>
                </div>
              </form>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;