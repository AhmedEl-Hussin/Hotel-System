import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";
import Photo from "../../assets/Group 3.png";
import "../../App.scss";

import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import { FormControl, Stack } from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext/AuthContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import { IRest } from "./ResetInterface/ResetInterface";

export default function RestPassword({ saveAdminData }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRest>();
  const [isLoading, setIsLoding] = useState(false);
  const { baseUrl } = useContext(AuthContext);
  const theme = useTheme();
  // ****************** to reset-password **********************
  const onSubmit = (data: IRest) => {
    setIsLoding(true);

    axios
      .post(`${baseUrl}/admin/users/reset-password`, data)

      .then((response) => {
        // console.log(response);
        navigate("/login");
        toast.success("Successfully");
      })
      .catch((error) => {
        // console.log(error);
        toast.error(error);
        setIsLoding(false);
      });
  };
  return (
    <>
      <Stack spacing={30} direction="row" justifyContent="center">
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto", marginLeft: 5 }}>
            {/* ************************* for Caption ***************************** */}
            <Typography
              sx={{ mb: 1 }}
              component="div"
              variant="h5"
              className="text"
            >
              Stay<span className="text2">cation.</span>
            </Typography>
            <Box sx={{ marginLeft: 5 }}>
              <Typography variant="h3" component="div" sx={{ mb: 2 }}>
                Reset Password
              </Typography>
              <Typography variant="h6" component="div" className="text3">
                If you don’t have an account register <br />
                You can <span>Login here !</span>
              </Typography>
              {/* ************************* for Form ***************************** */}
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
                {/* ************************* for input Email ***************************** */}
                <div>
                  <TextField
                    label="Email Address"
                    type="email"
                    id="outlined-size-normal"
                    placeholder="Enter your Email"
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
                {/* ************************* for input OTP ***************************** */}
                <div>
                  <TextField
                    label="OTP"
                    type="text"
                    id="outlined-size-normal"
                    placeholder="Enter your Code."
                    color="primary"
                    focused
                    {...register("seed", {
                      required: true,
                    })}
                  />
                  <Box sx={{ color: "red", pt: 1 }}>
                    {errors.seed && errors.seed.type === "required" && (
                      <p>code is required</p>
                    )}
                  </Box>
                </div>
                {/* ************************* for input Password ***************************** */}
                <div>
                  <TextField
                    label="Password"
                    type="password"
                    id="outlined-size-normal"
                    placeholder="Enter your Password"
                    color="primary"
                    focused
                    sx={{ mb: 1 }}
                    {...register("password", {
                      required: true,
                      // pattern:
                      //   /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,16}$/,
                    })}
                  />
                  <Box sx={{ color: "red", pt: 1 }}>
                    {errors.password && errors.password.type === "required" && (
                      <p>Password is required</p>
                    )}
                  </Box>
                  <Box sx={{ color: "red", pt: 1 }}>
                    {errors.password && errors.password.type === "pattern" && (
                      <p>invaild Password</p>
                    )}
                  </Box>
                </div>
                {/* ************************* for input ConfirmPassword ***************************** */}
                <div>
                  <TextField
                    label="confirmPassword"
                    type="Password"
                    id="outlined-size-normal"
                    placeholder="Enter your Confirm Password"
                    color="primary"
                    focused
                    sx={{ mb: 1 }}
                    {...register("confirmPassword", {
                      required: true,
                      // pattern:
                      //   /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,16}$/,
                    })}
                  />
                  <Box sx={{ color: "red", pt: 1 }}>
                    {errors.confirmPassword &&
                      errors.confirmPassword.type === "required" && (
                        <p>confirmPassword is required</p>
                      )}
                  </Box>
                </div>
                {/* ************************* for Button ***************************** */}
                <Box sx={{ mt: 2 }}>
                  {isLoading ? (
                    <Button
                      variant="contained"
                      color="success"
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
                      Reset
                    </Button>
                  )}
                </Box>
              </FormControl>
            </Box>
          </CardContent>
        </Box>
        {/* ************************* for Image ***************************** */}
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
