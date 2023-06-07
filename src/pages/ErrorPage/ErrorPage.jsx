import React from "react";

import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const { error, status } = useRouteError();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-md text-center">
        
        <h1 className="text-4xl text-blue-900 font-bold mb-4">Oops!</h1>
        <h2 className="mb-8 font-extrabold text-9xl text-blue-900">
          <span className="sr-only">Error</span>
          {status || 404}
        </h2>
        <p className="text-2xl font-semibold md:text-3xl text-blue-900 mb-8">
          {error?.message}
        </p>
        <Link to="/">
          <button className="btn bg-blue-900 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-300">
            Go back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
