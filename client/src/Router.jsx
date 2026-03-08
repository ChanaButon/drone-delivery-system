import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import App from "./App";
import Login from "./components/auth/LoginForm";
import Register from "./components/auth/SignUpForm";
import DashboardPage from "./pages/userDashboard/DashboardPage";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      {
        index: true,
        element: <App />,   
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "userDashboard",
        element: <DashboardPage />,
      },
      {
        path: "adminDashboard",
        element: <AdminDashboard />,
      },
      

    ],
  },
]);

export const Router = () => <RouterProvider router={router} />;
