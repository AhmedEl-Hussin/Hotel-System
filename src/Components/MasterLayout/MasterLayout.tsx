import { Outlet } from "react-router-dom";
import NavBar from "../Shared/NavBar/NavBar"
import Sidebar from "../Shared/Sidebar/Sidebar";
import { Box } from "@mui/material";





export default function MasterLayout({adminData}) {
  const drawerWidth = 240;
  return (
 
       <>
       <NavBar adminData = {adminData} />
      
           <Sidebar/>
        
         <Box sx={{  width: `calc(100% - ${drawerWidth}px)`,ml: `${drawerWidth}px`  }}><Outlet/></Box>
        
     </>
  )
}
