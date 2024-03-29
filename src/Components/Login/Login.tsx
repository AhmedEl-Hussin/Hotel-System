import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";
import Photo from "../../assets/Group 33.png";
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
import { ILogin } from "./Interfaces/LoginInterfaces";

export default function Login({ saveAdminData }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();
  const [isLoading, setIsLoding] = useState(false);
  const { baseUrl } = useContext(AuthContext);
  const theme = useTheme();
  // ****************** to login **********************
  const onSubmit = (data: ILogin) => {
    setIsLoding(true);

    axios
      .post(`${baseUrl}/admin/users/login`, data)

      .then((response) => {
        navigate("/dashboard");
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
            {/* ************************* for Caption ***************************** */}
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
                Sign in
              </Typography>
              <Typography variant="h6" component="div" className="text2">
                If you don’t have an account{" "}
                <Link to="/register" className="underline">
                  {" "}
                  register{" "}
                </Link>{" "}
                <br />
                You can{" "}
                <Link to="/register" className="underline">
                  {" "}
                  <span>Register here !</span>
                </Link>
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
                
              >
                {/* ************************* for input Email ***************************** */}
                <div>
                  <TextField
                    label="Email Address"
                    type="email"
                    id="outlined-size-normal"
                    placeholder="Enter your E-mail"
                    color="success"
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
                {/* ************************* for input Password ***************************** */}
                <div>
                  <TextField
                    label="Password"
                    type="password"
                    id="outlined-size-normal"
                    placeholder="Enter your Password"
                    color="success"
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
                {/* ************************* for Links (register-----forgot) ***************************** */}
                <Stack spacing={15} direction="row" justifyContent="between">
                  <Typography variant="caption">
                    <Link to="/forgot" className="underline">
                      Forgot Password ?
                    </Link>
                  </Typography>
                  <Typography variant="caption">
                    <Link to="/register" className="underline">
                      Register
                    </Link>
                  </Typography>
                </Stack>
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
                      color="success"
                      sx={{ width: "36ch", py: 1 }}
                      type="submit"
                    >
                      login
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
