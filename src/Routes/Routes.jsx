import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
    element: <Main></Main>,
    children: [

    ]
  },
]);

export default router;