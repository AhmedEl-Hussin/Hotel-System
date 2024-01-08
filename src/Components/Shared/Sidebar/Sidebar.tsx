import { Divider, Toolbar } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import KeyIcon from "@mui/icons-material/Key";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import "../../../App.scss";
import { useNavigate } from "react-router-dom";
export default function Sidebar() {
  const navigate = useNavigate();
  const drawerWidth = 240;
  return (
    <>
      {/* //sx={{color:""}} */}
      <Drawer
        className=""
        sx={{
          width: ` ${drawerWidth}px `,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "240px",
            boxSizing: "border-box",
            backgroundColor: "rgba(32, 63, 199,0.2)",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              <ListItemIcon>
                <HomeIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  color: "primary",
                }}
                primary="Home"
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/dashboard/users");
              }}
            >
              <ListItemIcon>
                <PeopleAltIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  color: "primary",
                }}
                primary="Users"
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/dashboard/rooms");
              }}
            >
              <ListItemIcon>
                <CheckroomIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  color: "primary",
                }}
                primary="Rooms"
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/dashboard/ads");
              }}
            >
              <ListItemIcon>
                <BorderColorIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  color: "primary",
                }}
                primary="Ads"
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/dashboard/booking");
              }}
            >
              <ListItemIcon>
                <CardTravelIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  color: "primary",
                }}
                primary="Booking"
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/change-pass");
              }}
            >
              <ListItemIcon>
                <KeyIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  color: "primary",
                }}
                primary="Change password"
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/login");
              }}
            >
              <ListItemIcon>
                <MeetingRoomIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  color: "primary",
                }}
                primary="LogOut"
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
