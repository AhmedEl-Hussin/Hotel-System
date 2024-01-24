import React, { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  ImageList,
  ImageListItem,
  Container,
} from "@mui/material";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext/AuthContext";
import { styled } from "@mui/material/styles";
import Textarea from "@mui/joy/Textarea";
import Paper from "@mui/material/Paper";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BedIcon from "@mui/icons-material/Bed";
import ChairIcon from "@mui/icons-material/Chair";
import BathtubIcon from "@mui/icons-material/Bathtub";
import FlatwareIcon from "@mui/icons-material/Flatware";
import WifiIcon from "@mui/icons-material/Wifi";
import RadioIcon from "@mui/icons-material/Radio";
import KitchenIcon from "@mui/icons-material/Kitchen";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Rate from "../Rate/Rate";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Details() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { baseUrl, requstHeaders } = useContext(AuthContext);
  const [roomsDetails, setRoomsDetails] = useState([]);
  const [isLoading, setIsLoding] = useState(false);

  // *************** to get rooms details *****************
 
  const getroomsDetails = () => {
    axios
      .get(`${baseUrl}/portal/rooms/65a81f49a5d9953dd42cc0db`, {
        headers: requstHeaders,
      })
      .then((response) => {
        console.log(response?.data?.data?.room);
        setRoomsDetails(response?.data?.data?.room);
      })
      .catch((error) => {
        error(error?.response?.data?.message || "Not Found Tag Ids");
      });
  };
  // console.log(roomsDetails);

  // ****************** to create comment **********************
  const onSubmit = (data) => {
    setIsLoding(true);

    axios
      .post(
        `${baseUrl}/portal/room-comments`,
        data,

        {
          headers: requstHeaders,
        }
      )
      .then((response) => {
        console.log(response);

        toast.success(response?.data?.message || "Added Successfully");
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message 
        );
      })
      .finally(() => {
        setIsLoding(false);
      });
  };

  useEffect(() => {
    getroomsDetails();
  }, []);

  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ width: "100%" }}>
          <Grid container spacing={2}>
            <Grid item xs={5} sx={{ mt: 3 }}>
              Home / <span className="text"> Room Details</span>
            </Grid>
            <Grid item xs={7}>
              <Typography variant="h5" className="text8">
                Village Angga
              </Typography>
              <Typography variant="body1" color="teal">
                Bogor, Indonesia
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ mt: 3 }}>
              <ImageList
                sx={{ width: 600, height: 300, margin: "auto" }}
                variant="woven"
                cols={3}
                gap={8}
              >
                {roomsDetails?.images?.map((item, index) => (
                  <ImageListItem key={index}>
                    <img
                      srcSet={`${item}?w=161&fit=crop&auto=format&dpr=2 2x`}
                      src={`${item}?w=161&fit=crop&auto=format`}
                      alt={item?.title}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Grid>

            <Grid item xs={8} textAlign="left">
              <Item>
                Minimal techno is a minimalist subgenre of techno music. It is
                characterized by a stripped-down aesthetic that exploits the use
                of repetition and understated development. Minimal techno is
                thought to have been originally developed in the early 1990s by
                Detroit-based producers Robert Hood and Daniel Bell. <br />{" "}
                Minimal techno is a minimalist subgenre of techno music. It is
                characterized by a stripped-down aesthetic that exploits the use
                of repetition and understated development. Minimal techno is
                thought to have been originally developed in the early 1990s by
                Detroit-based producers Robert Hood and Daniel Bell. <br />
                Design is a plan or specification for the construction of an
                object or system or for the implementation of an activity or
                process, or the result of that plan or specification in the form
                of a prototype, product or process. The national agency for
                design: enabling Singapore to use design for economic growth and
                to make lives better.
                <Grid container spacing={2} sx={{ my: 2 }}>
                  <Grid item xs={3} color="teal">
                    <BedIcon />
                    <Grid container sx={{ ml: 4 }}>
                      <Grid item xs={2}>
                        5
                      </Grid>
                      <Grid item xs={1}>
                        bedroom
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={3} color="teal">
                    <ChairIcon />
                    <Grid container sx={{ ml: 4 }}>
                      <Grid item xs={1}>
                        5
                      </Grid>
                      <Grid item xs={6}>
                        living room
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={3} color="teal">
                    <BathtubIcon />
                    <Grid container sx={{ ml: 4 }}>
                      <Grid item xs={1}>
                        5
                      </Grid>
                      <Grid item xs={6}>
                        bathroom
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={3} color="teal">
                    <FlatwareIcon />
                    <Grid container sx={{ ml: 4 }}>
                      <Grid item xs={1}>
                        5
                      </Grid>
                      <Grid item xs={6}>
                        dining room
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={3} color="teal">
                    <WifiIcon />
                    <Grid container sx={{ ml: 4 }}>
                      <Grid item xs={1}>
                        5
                      </Grid>
                      <Grid item xs={6}>
                        mbp/s
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={3} color="teal">
                    <RadioIcon />
                    <Grid container sx={{ ml: 4 }}>
                      <Grid item xs={1}>
                        5
                      </Grid>
                      <Grid item xs={6}>
                        unit ready
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={3} color="teal">
                    <KitchenIcon />
                    <Grid container sx={{ ml: 4 }}>
                      <Grid item xs={1}>
                        5
                      </Grid>
                      <Grid item xs={6}>
                        refigrator
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={3} color="teal">
                    <LiveTvIcon />
                    <Grid container sx={{ ml: 4 }}>
                      <Grid item xs={2}>
                        5
                      </Grid>
                      <Grid item xs={1}>
                        television
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <Typography variant="h6" color="initial">
                  Start Booking
                </Typography>
                <Typography variant="h6" color="revert-layer">
                  <span className="text7">$280</span> per night
                </Typography>
                <Typography variant="body1" color="red">
                  Discount 20% Off
                </Typography>
                {/* <Typography variant="body1" className="text8" sx={{ mt: 1 }}>
                  Capacity
                </Typography>
                <Typography
                  variant="body1"
                  color="initial"
                  bgcolor="silver"
                  width="60%"
                  display="flex"
                  justifyContent="space-between"
                  sx={{ borderRadius: 1, margin: "auto" }}
                >
                  <RemoveIcon className="bg5 " sx={{ p: 1 }} />2 Person
                  <AddIcon className="bg6" sx={{ p: 1 }} />
                </Typography> */}
                <Typography variant="body1" className="text8" sx={{ mt: 3 }}>
                  Pick a Date
                </Typography>

                <Typography
                  variant="body1"
                  color="initial"
                  className="bg11"
                  width="80%"
                  display="flex"
                  justifyContent="space-between"
                  sx={{ borderRadius: 1, margin: "auto" }}
                >
                  <CalendarMonthIcon className="bg7" sx={{ p: 1 }} />
                  <Typography
                    variant="p"
                    color="initial"
                    sx={{ mt: 1, mr: 5, pr: 2 }}
                  >
                    20 Jan - 22 Jan
                  </Typography>
                </Typography>

                <Button
                  variant="contained"
                  sx={{ my: 3 }}
                  onClick={() => {
                    navigate("/dashboard/PayPage");
                  }}
                >
                  Continue to Book
                </Button>
              </Item>
            </Grid>

            <Grid container sx={{ my: 5 }} spacing={2}>
              {/* <Grid
                item
                xs={6}
                textAlign="left"
                justifyContent="center"
                sx={{ my: 2, borderRight: 1, borderColor: "primary.main" }}
              >
                 <form
                  onSubmit={handleSubmit(addRate)}
                  
                >
                <Box
                  
                >
                  <Typography component="legend">Rate</Typography>
                  <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    {...register("rating", {
                      required: true,
                    })}
                   
                  />

                </Box>
                <Textarea
                    sx={{ my: 2, py: 5, mr: 5, "--Textarea-focused": 1 }}
                    name="Primary"
                    placeholder="Set Your Comment"
                    variant="outlined"
                    color="primary"
                    {...register("review", {
                      required: true,
                    })}
                  />
                <Button variant="contained" type="submit" sx={{ my: 2 }}>
                  Rate
                </Button>
                </form>
              </Grid> */}
              <Rate />
              <Grid
                item
                xs={6}
                textAlign="center"
                justifyContent="center"
                sx={{ my: 2 }}
              >
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Typography variant="body1" color="initial" sx={{ my: 4 }}>
                    Add Your Comment
                  </Typography>
                  <Textarea
                    sx={{ my: 2, py: 5, mr: 5, "--Textarea-focused": 1 }}
                    name="Primary"
                    placeholder="Set Your Comment"
                    variant="outlined"
                    color="primary"
                    {...register("comment", {
                      required: true,
                    })}
                  />
                  {errors.comment && errors.comment.type === "required" && (
                    <Typography color="red">Comment is required</Typography>
                  )}

                  <Button variant="contained" type="submit" sx={{ my: 2 }}>
                    Send
                  </Button>
                </form>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
