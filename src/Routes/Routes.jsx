import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import Home from "../pages/Home/Home/Home";
import InstructorsPage from "../pages/InstructorsPage/InstructorsPage";
import Dashboard from "../Layout/Dashboard";
import MySelectedCourse from "../pages/Dashboard/MySelectedCourse/MySelectedCourse";

import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AddClass from "../pages/Dashboard/AddClass/AddClass";
import PrivateRoute from "./PrivateRoute";
import ManageClasses from "../pages/Dashboard/ManageClasses/ManageClasses";
import AdminRoute from "./AdminRoute";
import MyClasses from "../pages/Dashboard/MyClasses/MyClasses";
import Feedback from "../pages/Dashboard/ManageClasses/Feedback";
import ClassPage from "../pages/ClassPage/ClassPage";
import Payment from "../pages/Dashboard/MySelectedCourse/Payment";
import MyEnrolledClassess from "../pages/Dashboard/MyEnrolledClassess/MyEnrolledClassess";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";



const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "instructors",
        element: <InstructorsPage></InstructorsPage>,
      },
      {
        path: "class-page",
        element: <ClassPage></ClassPage>,
      },

      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signup",
        element: <Registration></Registration>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      // admin routes
      {
        path: "admin-manage-users",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "admin-manage-classes",
        element: (
          <AdminRoute>
            <ManageClasses></ManageClasses>
          </AdminRoute>
        ),
      },
      {
        path: "feedBack",
        element: (
          <AdminRoute>
            <Feedback></Feedback>
          </AdminRoute>
        ),
      },
      // Instructor routes
      {
        path: "add-class",
        element: (
          <PrivateRoute>
            {" "}
            <AddClass></AddClass>
          </PrivateRoute>
        ),
      },
      {
        path: "my-classes",
        element: (
          <PrivateRoute>
            <MyClasses></MyClasses>
          </PrivateRoute>
        ),
      },
    
      // by default  students route
      {
        path: "my-selected-course",
        element: (
          <PrivateRoute>
            <MySelectedCourse></MySelectedCourse>
          </PrivateRoute>
        ),
      },
      {
        path: "payment/:id",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },
      {
        path: "enrolled-classes",
        element: (
          <PrivateRoute>
            <MyEnrolledClassess></MyEnrolledClassess>
          </PrivateRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <PrivateRoute>
            <PaymentHistory></PaymentHistory>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
