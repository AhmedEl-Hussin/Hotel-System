import React, { useContext, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext/AuthContext";

import Textarea from "@mui/joy/Textarea";

import { toast } from "react-toastify";

import { useForm } from "react-hook-form";
import Rating from "@mui/material/Rating";

export default function Rate() {
  const [rating, setRating] = useState(2);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { baseUrl, requstHeaders } = useContext(AuthContext);

  const [isLoading, setIsLoding] = useState(false);
  // ****************** to create Rate **********************
  const onSubmit = (data) => {
    data.rating=rating
    setIsLoding(true);
 


    axios
      .post(
        `${baseUrl}/portal/room-reviews`,
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
          error?.response?.data?.message || "Data of project invaild"
        );
      })
      .finally(() => {
        setIsLoding(false);
      });
  };
  console.log({ rating });
  return (
    <>
      <Grid
        item
        xs={6}
        textAlign="left"
        justifyContent="center"
        sx={{ my: 2, borderRight: 1, borderColor: "primary.main" }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              "& > legend": { mt: 2 },
            }}
          >
            <Typography component="legend">Rate</Typography>
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
          </Box>
          <Textarea
            sx={{ my: 2, py: 5, mr: 5, "--Textarea-focused": 1 }}
            name="Primary"
            placeholder="Set Your Review"
            variant="outlined"
            color="primary"
            {...register("review", {
              required: true,
            })}
          />
           {errors.review&& errors.review.type === "required" && (
                      <Typography color="red">
                        Review is required
                      </Typography>
                    )}
          <Button variant="contained" type="submit" sx={{ my: 2 }}>
            Rate
          </Button>
        </form>
      </Grid>
    </>
  );
}
