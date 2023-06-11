import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import Home from "../pages/Home/Home/Home";
import InstructorsPage from "../pages/InstructorsPage/InstructorsPage";
import Dashboard from "../Layout/Dashboard";
import AddStudent from "../pages/Dashboard/AddStudent/AddStudent";
import MySelectedCourse from "../pages/Dashboard/MySelectedCourse/MySelectedCourse";
import Payment from "../pages/Dashboard/MySelectedCourse/Payment";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";


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
        path: "/instructors",
        element: <InstructorsPage></InstructorsPage>,
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
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "add-student",
        element: <AddStudent></AddStudent>,
      },
      {
        path: "my-selected-course",
        element: <MySelectedCourse></MySelectedCourse>,
      },
      {
        path: "payment",
        element: <Payment></Payment>,
      },
      {
        path: "admin-manage-users",
        element: <AllUsers></AllUsers>,
      },
    ],
  },
]);

export default router;
