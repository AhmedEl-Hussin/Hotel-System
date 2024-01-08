import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";



import Button from "@mui/material/Button";
import Photo from "../../assets/Group 3.png";
import "../../App.scss";

import TextField from "@mui/material/TextField";
import {  useNavigate } from "react-router-dom";
import { FormControl, Stack } from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext/AuthContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import { IForgot } from "./ForgotInterfaces/ForgotInterfaces";


export default function ForgotPass({ saveAdminData }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgot>();
  const [isLoading, setIsLoding] = useState(false);
  const {baseUrl} = useContext(AuthContext);
  const theme = useTheme();
  // ****************** to forgot-password **********************
  const onSubmit = (data:IForgot) => {
    setIsLoding(true);

    axios
      .post(`${baseUrl}/portal/users/forgot-password`, data)

      .then((response) => {
        // console.log(response);
        navigate("/rest-pass");
        toast.success("Successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
        setIsLoding(false);
      });
  };
  return (
    <>
      <Stack spacing={30} direction="row" justifyContent="center">
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto", marginLeft: 5 }}>
            <Typography
              sx={{ mb: 5 }}
              component="div"
              variant="h5"
              className="text"
            >
              Stay<span className="text2">cation.</span>
            </Typography>
            <Box sx={{ marginLeft: 5, mt: 5 }}>
              <Typography variant="h3" component="div" sx={{ mb: 3 }}>
              Forgot password
              </Typography>
              <Typography variant="h6" component="div" className="text3">
              If you already have an account register <br />
                You can <span>Login here !</span>
              </Typography>
              <FormControl
                onSubmit={handleSubmit(onSubmit)}
                component="form"
                sx={{
                  "& .MuiTextField-root": {
                    mt: 4,
                    width: "35ch",
                    height: "5ch",
                  },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField
                    label="Email"
                    
                    type="email"
                    id="outlined-size-normal"
                    placeholder="Please type here ..."
                    color="primary"
                    focused
                    {...register("email", {
                      required: true,
                      pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    })}
                  />
                  <Box sx={{ color: "red", pt: 1 }}>
                    {errors.email && errors.email.type === "required" && (
                      <p>Email is required</p>
                    )}
                  </Box>
                  <Box sx={{ color: "red", pt: 1 }}>
                    {errors.email && errors.email.type === "pattern" && (
                      <p>invaild email</p>
                    )}
                  </Box>
                </div>

             
             
                <Box sx={{ mt: 2 }}>
                  {isLoading ? (
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ width: "35ch" }}
                      type="submit"
                    >
                      <Stack
                        sx={{
                          color: "grey.500",
                          width: "35ch",

                          justifyContent: "center",
                        }}
                        spacing={2}
                        direction="row"
                      >
                        <CircularProgress color="warning" />
                      </Stack>
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ width: "35ch", py: 1 }}
                      type="submit"
                    >
                     Send mail
                    </Button>
                  )}
                </Box>
              </FormControl>
            </Box>
          </CardContent>
        </Box>

        <Box>
          <CardMedia
            component="img"
            sx={{ width: 535 }}
            image={Photo}
            alt="login-img"
          />
        </Box>
      </Stack>
    </>
  );
}
