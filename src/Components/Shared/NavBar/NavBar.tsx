import AppBar from "@mui/material/AppBar";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { Avatar, Link, Stack } from "@mui/material";

export default function NavBar({ adminData }) {
  //  console.log(adminData);
  const drawerWidth = 240;
  return (
    <>
      <AppBar
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        position="static"
      >
        <Toolbar>
          <Link
            sx={{ flexGrow: 1 }}
            href="/dashboard"
            color="inherit"
            underline="hover"
          >
            {" "}
            Booking.
          </Link>

          <Typography variant="" color="initial" sx={{ mr: 4 }}>
            {adminData.userName}
          </Typography>
          <Stack direction="row" spacing={2}>
            <Avatar
              alt="usersimage"
              src="/src/assets/WhatsApp Image 2022-11-27 at 6.49.29 PM.jpeg"
            />
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
}