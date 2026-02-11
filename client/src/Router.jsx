import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import App from "./App";
import AuthPage from "./components/auth/AuthPage";
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
        path: "auth",
        element: <AuthPage />,
      },
      {
        path: "dashboardUser",
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
