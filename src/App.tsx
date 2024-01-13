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
import AuthContextProvider, { AuthContext } from "./Components/Context/AuthContext/AuthContext";
import { useContext } from "react";
import Users from "./Components/Users/Users";
import Rooms from "./Components/Rooms/Rooms";
import Ads from "./Components/Ads/Ads";
import Bookings from "./Components/Bookings/Bookings";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
function App() {

  
  let {adminData , saveAdminData} = useContext(AuthContext)
  const routes = createBrowserRouter([
    {
      path: "/dashboard",
      element: <MasterLayout adminData = {adminData}  />,

      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "users", element: <Users /> },
        { path: "rooms", element: <Rooms /> },
        { path: "ads", element: <Ads /> },
        { path: "booking", element: <Bookings /> },
        
       
      ],
    },
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login  saveAdminData = {saveAdminData}/> },
        { path: "/login", element: <Login saveAdminData = {saveAdminData} /> },
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
    
    
  
   <AuthContextProvider>
   <RouterProvider router={routes} />
   </AuthContextProvider>
  
    </>
  );
}

export default App;
