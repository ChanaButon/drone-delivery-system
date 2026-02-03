import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import AuthPage from "./components/auth/AuthPage";

const router = createBrowserRouter([
  {
    path: "/*",
    element: <App />,
  },
    {
    path: "/auth",
    element: <AuthPage />
  },
]);

export const Router = () => <RouterProvider router={router} />;
