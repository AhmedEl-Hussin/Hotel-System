import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "/src/App.scss";
import NotFound from "./Components/Shared/NotFound/NotFound";
import MasterLayout from "./Components/MasterLayout/MasterLayout";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import AuthLayout from "./Components/AuthLayout/AuthLayout";
import Register from "./Components/Register/Register";
import RequestResetPass from "./Components/RequestResetPass/RequestResetPass";
import ForgotPass from "./Components/ForgotPass/ForgotPass";
import ChangePassword from "./Components/ChangePassword/ChangePassword";
import RestPassword from "./Components/RestPassword/RestPassword";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/dashboard",
      element: <MasterLayout />,

      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "home", element: <Home /> },
      ],
    },
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/request", element: <RequestResetPass /> },
        { path: "/forgot", element: <ForgotPass /> },
        { path: "/change-pass", element: <ChangePassword /> },
        { path: "/rest-pass", element: <RestPassword /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
