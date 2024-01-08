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
import { IChange } from "./ChangeInterfaces/ChangeInterfaces";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Home from "@mui/icons-material/Home";


export default function ChangePassword({ saveAdminData }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IChange>();
  const [isLoading, setIsLoding] = useState(false);
  const {baseUrl} = useContext(AuthContext);
  const theme = useTheme();
  // ****************** to RestPassword **********************
  const onSubmit = (data: IChange) => {
    setIsLoding(true);
    axios
      .post(`${baseUrl}/admin/users/change-password`, data)
      .then((response) => {
       
        navigate("/login");
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
              sx={{ mb: 1 }}
              component="div"
              variant="h5"
              className="text"
            >
              Stay<span className="text2">cation.</span>
            </Typography>
            <Box sx={{ marginLeft: 5, }}>
              <Typography variant="h3" component="div" sx={{ mb: 2 }}>
               Change Password
              </Typography>
              <Typography variant="h6" component="div" className="text3">
                If you don’t have an account register <br />
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
                    label="OldPassword"
                    type="password"
                    id="outlined-size-normal"
                    placeholder="Please type here ..."
                    color="primary"
                    focused
                    sx={{ mb: 1 }}
                    {...register("oldPassword", {
                      required: true,
                      // pattern:
                      //   /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,16}$/,
                    })}
                  />
                  <Box sx={{ color: "red", pt: 1 }}>
                    {errors.oldPassword&& errors.oldPassword.type === "required" && (
                      <p>OldPassword is required</p>
                    )}
                  </Box>
                 
                </div>
                <div>
                  <TextField
                    label="New Password"
                    type="Password"
                    id="outlined-size-normal"
                    placeholder="Please type here ..."
                    color="primary"
                    focused
                    sx={{ mb: 1 }}
                    {...register("newPassword", {
                      required: true,
                      // pattern:
                      //   /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,16}$/,
                    })}
                  />
                  <Box sx={{ color: "red", pt: 1 }}>
                    {errors.newPassword && errors.newPassword.type === "required" && (
                      <p>New Password  is required</p>
                    )}
                  </Box>
                 
                </div>
                <div>
                  <TextField
                    label="Confirm Password"
                    type="Password"
                    id="outlined-size-normal"
                    placeholder="Please type here ..."
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
                    {errors.confirmPassword && errors.confirmPassword.type === "required" && (
                      <p>Confirm Password is required</p>
                    )}
                  </Box>
                 
                </div>
               
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
              <div  className="style">
            <Link to="/dashboard">
             <span><KeyboardBackspaceIcon /></span> Back To Home <span><Home/></span>
            </Link>
          </div>
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


