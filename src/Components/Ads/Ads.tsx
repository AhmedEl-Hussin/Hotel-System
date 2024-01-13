import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { grey, yellow } from "@mui/material/colors";

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthContext/AuthContext";
import {
  Box,
  Button,
  MenuItem,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useForm } from "react-hook-form";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import UpdateIcon from "@mui/icons-material/Update";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
import * as React from "react";
import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import noData from "../../assets/Email.png";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const currencies = [
  {
    value: "true",
    label: "true",
  },
  {
    value: "false",
    label: "false",
  },
];
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Ads() {
  const handleOpen = () => setOpen(true);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setModelState(close);
  };
  const [itemId, setItemId] = useState(0);
  const [modelState, setModelState] = useState("colse");
  // *************** to show delete model ***************
  const showDeleteModel = (id) => {
    setItemId(id);
    setModelState("delete-model");
  };
  //*************** to delete Task *****************
  const deleteTask = () => {
    setIsLoding(true);

    axios
      .delete(`${baseUrl}/admin/ads/${itemId}`, {
        headers: requstHeaders,
      })
      .then((response) => {
        getAllAds(userRole);
        handleClose();
        toast.success("Task Deleted Successfuly");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Task Not Deleted");
      })
      .finally(() => {
        setIsLoding(false);
      });
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { baseUrl, requstHeaders, userRole }: any = useContext(AuthContext);
  const [roomsList, setRoomsList] = useState([]);
  const [adsList, setAdsList] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  const [arrayOfPages, setArrayOfPages] = useState([]);
  // ****************** to add new Ads **********************
  const onSubmit = (data) => {
    setIsLoding(true);

    axios
      .post(`${baseUrl}/admin/ads`, data, {
        headers: requstHeaders,
      })
      .then((response) => {
        getAllAds();
        toast.success(response?.data?.message || "Added Successfully");
        handleClose();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Data of task invaild");
      })
      .finally(() => {
        setIsLoding(false);
      });
  };

  // *************** to get all Ads *****************
  const getAllAds = () => {
    setIsLoding(true);
    // if (userRole=='Manager') {
    //   user='manager'

    // } else {
    //   user='employee'
    // }
    axios
      .get(`${baseUrl}/admin/ads`, {
        headers: requstHeaders,
      })
      .then((response) => {
        console.log(response?.data?.data?.ads);
        setAdsList(response?.data?.data?.ads);
        console.log(ad)
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


    // *************** to show update model ***************
    const showUpdateModel = (ad) => {
      console.log(ad);
      
      setItemId(ad?._id);
      setValue("isActive", ad?.isActive);
      setValue("discount", ad?.room?.discount);
      setModelState("update-model");
    };

   // *************** to update Ads *****************
   const updateAds = (data) => {
    setIsLoding(true);
    
      axios
        .put(`${baseUrl}/admin/ads/${itemId}`, data, {
          headers:  requstHeaders,
        })
        .then((response) => {
          
          handleClose();
          getAllAds();
          toast.success("Task Updated Successfuly");
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message || "'Ads Not Updated'");
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
    getAllAds(userRole);
    getAllRoom(userRole);
  }, []);

  return (
    <>
      {/* ************* this model to delete Ads *********** */}

      <Modal 
        open={modelState === "delete-model"}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img src={noData} alt="no data" />
          <Typography id="modal-modal-description" sx={{ mb: 2 }} color="error">
            are you sure you want to delete this item ? if you are sure just{" "}
            <br /> click on delete it
          </Typography>
          <Button variant="contained" color="error" onClick={deleteTask}>
            {" "}
            delete
          </Button>
        </Box>
      </Modal>
         {/* ************* this model to update Ads *********** */}

         <Modal 
        open={modelState === "update-model"}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <form
            className="form w-100 m-auto mt-5"
            onSubmit={handleSubmit(updateAds)}
            as="form"
          >
                <Box>
                      <Typography variant="h5" color="initial">
                        Up date
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
                        {currencies.map((option) => (
                          <MenuItem key={option.value} value={option.value} selected={true} >
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
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

                      {errors.discount &&
                        errors.discount.type === "required" && (
                          <Box>Discount is required</Box>
                        )}
                    </Box>

                    <Stack direction="row" spacing={30} sx={{ my: 5 }}>
                     
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        Up date
                      </Button>
                    </Stack> 
          </form>
          
        </Box>
        
           
          
      </Modal>
      

      {/* ****************************** for Table ************************ */}
      <div className="long">
        <Stack direction="row" spacing={50} sx={{ my: 5 }} >
          <div>
            <Typography variant="h5" color="royalblue">
              ADS Table Details
            </Typography>
            <Typography variant="body2" color="slateblue">
              You can check all details
            </Typography>
          </div>

          <Button variant="contained" onClick={handleClickOpen}>
            Add New Ads
          </Button>
          <Dialog
            sx={{ width: "400" }}
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <div className="bg2">
              <DialogContent className="bg1 ">
                <DialogContentText id="alert-dialog-slide-description">
                  {/* **************** to view form ****************** */}
                  <form onSubmit={handleSubmit(onSubmit)}>
                    {/* ************** for name input *************** */}

                    <Box>
                      <Typography variant="h5" color="initial">
                        Ads
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
                        {currencies.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
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

                      {errors.discount &&
                        errors.discount.type === "required" && (
                          <Box>Discount is required</Box>
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
                    </Box>

                    <Stack direction="row" spacing={30} sx={{ my: 5 }}>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={handleClose}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSubmit(onSubmit)}
                        variant="contained"
                        color="primary"
                      >
                        Add
                      </Button>
                    </Stack>
                  </form>
                </DialogContentText>
              </DialogContent>
            </div>
          </Dialog>
        </Stack>

        <TableContainer component={Paper} sx={{ backgroundColor: "silver" }}>
          <Table
            sx={{ minWidth: 400 }}
            aria-label="customized table"
            className="bg"
          >
            <TableHead className="ll">
              <TableRow>
                <StyledTableCell align="center">Room Number</StyledTableCell>
                <StyledTableCell align="center">Price</StyledTableCell>
                <StyledTableCell align="center">Capacity</StyledTableCell>
                <StyledTableCell align="center">Discount</StyledTableCell>
                <StyledTableCell align="center">Active</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody className="bg1">
              {adsList.map((ad) => (
               
                <StyledTableRow key={ad.id}>
                  <StyledTableCell component="th" scope="row" align="center">
                    {ad?.room?.roomNumber}
                  </StyledTableCell>

                  <StyledTableCell component="th" scope="row" align="center">
                    {ad?.room?.price}
                  </StyledTableCell>

                  <StyledTableCell component="th" scope="row" align="center">
                    {ad?.room?.capacity}
                  </StyledTableCell>

                  <StyledTableCell component="th" scope="row" align="center">
                    {ad?.room?.discount}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row" align="center">
                    {ad?.isActive == true ? "Yes" : "No"}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row" align="center">
                    <span>
                      <RemoveRedEyeIcon sx={{ color: grey[300] }} />{" "}
                      <DeleteForeverIcon
                        onClick={() => showDeleteModel(ad?._id)}
                        color="error"
                      />{" "}
                      <UpdateIcon  onClick={() => showUpdateModel(ad)} sx={{ color: yellow[600] }} />{" "}
                    </span>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
            
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
