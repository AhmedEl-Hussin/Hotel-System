import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";
import Photo from "../../assets/Group (1).png";
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
import { IRest } from "./RegisterInterfaces/RegisterInterfaces";


export default function Register({ saveAdminData }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRest>();
  const [isLoading, setIsLoding] = useState(false);
  const { baseUrl, userRole } = useContext(AuthContext);
  const theme = useTheme();
  // ****************** to register **********************
  const onSubmit = (data: IRest) => {
   
    const formData = new FormData();
    formData.append("userName", data["userName"]);
    formData.append("phoneNumber",data["phoneNumber"]);
    formData.append("country", data["country"]);
    formData.append("email", data["email"]);
    formData.append("password", data["password"]);
    formData.append("confirmPassword", data["confirmPassword"]);
    formData.append("profileImage", data["profileImage"][0]);
    formData.append("role", ["user"]);

    setIsLoding(true);
   
    axios
      .post(`${baseUrl}/admin/users`, formData, {
        headers: {
          Authorization: ` ${localStorage.getItem("adminToken")}`,
        },
      })

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
            {/* ************************* for  caption ***************************** */}
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
                Sign up
              </Typography>
              <Typography variant="h6" component="div" className="text3">
                If you don’t have an account{" "}
                <Link to="/register" className="underline">
                  {" "}
                  register{" "}
                </Link>{" "}
                <br />
                You can{" "}
                <Link to="/login" className="underline">
                  {" "}
                  <span>Login here !</span>
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
                {/* ************************* for input User Name ***************************** */}
                <div>
                  <TextField
                    label="User Name"
                    type="text"
                    id="outlined-size-normal"
                    placeholder="Enter your Name"
                    color="primary"
                    focused
                    {...register("userName", {
                      required: true,
                    })}
                  />
                  <Box sx={{ color: "red", pt: 1 }}>
                    {errors.userName && errors.userName.type === "required" && (
                      <p>User Name is required</p>
                    )}
                  </Box>
                </div>
                {/* ************************* for input Email ***************************** */}
                <div>
                  <TextField
                    label="Email Address"
                    type="email"
                    id="outlined-size-normal"
                    placeholder="Enter your E-mail"
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
                {/* ************************* for input Phone Number ***************************** */}
                <div>
                  <TextField
                    label="Phone Number"
                    type="text"
                    id="outlined-size-normal"
                    placeholder="Enter your Phone Number"
                    color="primary"
                    focused
                    {...register("phoneNumber", {
                      required: true,
                    })}
                  />
                  <Box sx={{ color: "red", pt: 1 }}>
                    {errors.phoneNumber &&
                      errors.phoneNumber.type === "required" && (
                        <p>Phone Number is required</p>
                      )}
                  </Box>
                </div>
                {/* ************************* for input Country ***************************** */}
                <div>
                  <TextField
                    label="Country "
                    type="text"
                    id="outlined-size-normal"
                    placeholder="Enter your Country"
                    color="primary"
                    focused
                    {...register("country", {
                      required: true,
                    })}
                  />
                  <Box sx={{ color: "red", pt: 1 }}>
                    {errors.country && errors.country.type === "required" && (
                      <p>Country is required</p>
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
                {/* ************************* for input confirmPassword ***************************** */}
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
                {/* ************************* for input confirmPassword ***************************** */}
                <div>
                  <TextField
                    label="ProfileImage"
                    type="file"
                    aria-label="file example"
                    id="outlined-size-normal"
                    placeholder="Enter your profileImage"
                    color="primary"
                    focused
                    sx={{ mb: 1 }}
                    {...register("profileImage", {
                      required: true,
                    
                    })}
                  />
                  <Box sx={{ color: "red", pt: 1 }}>
                    {errors.profileImage &&
                      errors.profileImage.type === "required" && (
                        <p>profileImage is required</p>
                      )}
                  </Box>
                </div>
                {/* ************************* for input Button ***************************** */}
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
                      sx={{ width: "36ch", py: 2 }}
                      type="submit"
                    >
                      Sign up
                    </Button>
                  )}
                </Box>
              </FormControl>
            </Box>
          </CardContent>
        </Box>
        {/* ************************* for input Img ***************************** */}
        <Box>
          <CardMedia
            component="img"
            sx={{ width: 700 }}
            image={Photo}
            alt="login-img"
          />
        </Box>
      </Stack>
    </>
  );
}
