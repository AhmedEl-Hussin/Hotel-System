import {
  Box,
  Button,
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Context/AuthContext/AuthContext";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

const options = [
  {
    value: "true",
    label: "true",
  },
  {
    value: "false",
    label: "false",
  },
];
export default function AddNewAds() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { isActive: "true" } });
  const handleClose = () => {
    setOpen(false);
    setModelState(close);
  };

  const [roomsList, setRoomsList] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  const { baseUrl, requstHeaders, userRole } = useContext(AuthContext);
  // ****************** to add new Ads ***************************************************************************************
  const onSubmit = (data) => {
    setIsLoding(true);

    axios
      .post(`${baseUrl}/admin/ads`, data, {
        headers: requstHeaders,
      })
      .then((response) => {
        toast.success(response?.data?.message || "Added Successfully");
        navigate("/dashboard/ads");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "wrong");
      })
      .finally(() => {
        setIsLoding(false);
      });
  };

  // *************** to get all Room *****************

  const getAllRoom = (pageNo) => {
    setIsLoding(true);

    axios
      .get(`${baseUrl}/admin/rooms?page=1&size=10`, {
        headers: requstHeaders,
        params: {
          pageSize: 10,
          pageNumber: pageNo,
        },
      })
      .then((response) => {
        console.log(response?.data?.data?.rooms);
        setRoomsList(response?.data?.data?.rooms);
        setArrayOfPages(
          Array(response?.data?.totalNumberOfPages)
            .fill()
            .map((_, i) => i + 1)
        );
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Something went Wrong");
      })
      .finally(() => {
        setIsLoding(false);
      });
  };
  useEffect(() => {
    getAllRoom(userRole);
  }, []);
  return (
    <>
      <Stack >
        <List sx={{ width: "25%" }}>
          <ListItem disablePadding sx={{ mt: 1 }}>
            <ListItemButton
              onClick={() => {
                navigate("/dashboard/ads");
              }}
            >
              <ListItemIcon>
                <KeyboardDoubleArrowLeftIcon />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{}} primary="back to ads" />
            </ListItemButton>
          </ListItem>
        </List>
        <Card
          sx={{ width: "75%", margin: "auto", mt: 1, mb: 2  }}
          className="bg1"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="long">
            {/* ************** for name input *************** */}

            <Box>
              <Typography
                variant="h5"
                color="inherit"
                textAlign="center"
                sx={{ mt: 3 }}
              >
                ADS
              </Typography>
              <TextField
                sx={{ my: 3, color: "darkred" }}
                fullWidth
                id="outlined-select-currency"
                select
                label="Active"
                {...register("isActive", {
                  required: true,
                })}
              >
                
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
             
              </TextField>

              {errors.isActive && errors.isActive.type === "required" && (
                <Typography color="red" >isActive is required</Typography>
              )}
            </Box>
            <Box>
              <TextField
                sx={{ my: 3 }}
                fullWidth
                id="outlined-primary"
                label="Discount"
                placeholder="Discount"
                {...register("discount", {
                  required: true,
                })}
              />

              {errors.discount && errors.discount.type === "required" && (
                <Typography color="red">Discount is required</Typography>
              )}
            </Box>

            <Box>
              <TextField
                fullWidth
                sx={{ my: 3 }}
                id="outlined-select-currency"
                select
                label="RoomNumber"
                {...register("room", {
                  required: true,
                })}
              >
                  
                {roomsList.map((room) => (
                  <MenuItem key={room._id} value={room._id}>
                    {room.roomNumber}
                  </MenuItem>
                ))}
                
              </TextField>
              {errors.room && errors.room.type === "required" && (
                <Typography color="red">Room is required</Typography>
              )}
            </Box>

            <Button
              sx={{ mt: 2, mb: 5, width: "25%" }}
              className="btn"
              onClick={handleSubmit(onSubmit)}
              variant="contained"
              color="primary"
            >
              Add
            </Button>
          </form>
        </Card>
      </Stack>
    </>
  );
}
