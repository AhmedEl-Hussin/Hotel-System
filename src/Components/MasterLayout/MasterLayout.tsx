import { Outlet } from "react-router-dom";
import NavBar from "../Shared/NavBar/NavBar"
import Sidebar from "../Shared/Sidebar/Sidebar";
import { Stack } from "@mui/material";





export default function MasterLayout({adminData}) {
  return (
 
       <>
       <NavBar adminData = {adminData} />
       <Stack spacing={30} direction="row" justifyContent="center">
           <Sidebar/>
         <Outlet/>
         </Stack>
     </>
  )
}
