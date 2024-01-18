import { Outlet } from "react-router-dom";
import NavBar from "../Shared/NavBar/NavBar";
import Sidebar from "../Shared/Sidebar/Sidebar";
import Footer from "../Shared/Footer/Footer";
import { Box, Stack } from "@mui/material";





export default function MasterLayout({adminData}) {
  const drawerWidth = 240;
  return (
 
       <>
       <NavBar adminData = {adminData} />
       <Stack spacing={30} direction="row" justifyContent="center">
           <Sidebar/>
           <Box sx={{  width: `calc(100% - ${drawerWidth}px)`,ml: `${drawerWidth}px`  }}><Outlet/></Box>
           
         </Stack>
         <Box sx={{  width: `calc(100% - ${drawerWidth}px)`,ml: `${drawerWidth}px`  }}><Footer/></Box>
     </>
  )
}


      
       