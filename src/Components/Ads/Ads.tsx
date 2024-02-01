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
  Select,
  Stack,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";

import { useForm } from "react-hook-form";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from '@mui/icons-material/Edit';

import Photo from "../../assets/R.png"
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
import { Link, Navigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// const currencies = [
//   {
//     value: "true",
//     label: "true",
//   },
//   {
//     value: "false",
//     label: "false",
//   },
// ];
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
};

export default function Ads() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: { isActive: "true" } });

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
  const { baseUrl, requstHeaders, userRole }: any = useContext(AuthContext);

  const [adsList, setAdsList] = useState([]);
  const [isLoding, setIsLoding] = useState(false);

  const [userDetails, setUserDetails] = useState([]);
  const [active, setActive] = useState("");
  const handleChange = (event) => {
    setActive(event.target.value);
  };

  // ********************pagination**************************************************************************************

  const [arrayOfPages, setArrayOfPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage + 1);
    getAllAds(newPage + 1);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage(1);
    getAllAds(1);
  };
  // *************** to show delete model ***************
  const showDeleteModel = (id) => {
    setItemId(id);
    setModelState("delete-model");
  };
  // *************** to get  details *****************
  const getAdsDetails = (id)=> {
    axios
      .get(`${baseUrl}/admin/ads/${id}`, {
        headers: requstHeaders,
      })
      .then((response) => {
        // console.log(response?.data);
      })
      .catch((error) => {
        error(error?.response?.data?.message || "Not Found ");
      });
  };

  //*************** to delete Task *******************************************************************************************
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

  // *************** to get all Ads ******************************************************************************************
  const getAllAds = (page?: number) => {
    setIsLoding(true);

    axios
      .get(`${baseUrl}/admin/ads?page=1&size=10`, {
        headers: requstHeaders,
        params: {
          size: rowsPerPage,
          page: page,
        },
      })
      .then((response) => {
        console.log(response?.data?.data);
        setAdsList(response?.data?.data?.ads);

        setArrayOfPages(
          Array(response?.data?.data?.totalCount)
            .fill()
            .map((_, i) => i + 1)
        );

        setCurrentPage(page);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Something went Wrong");
      })
      .finally(() => {
        setIsLoding(false);
      });
  };

  // *************** to show update model *********************************************************************************
  const showUpdateModel = (ad) => {
    setItemId(ad?._id);
    setValue("isActive", ad?.isActive ? "yes" : "no");
    setValue("discount", ad?.room?.discount);
    setModelState("update-model");
  };

  // *************** to update Ads ****************************************************************************************
  const updateAds = (data) => {
    data.isActive = active === "yes";
    axios
      .put(`${baseUrl}/admin/ads/${itemId}`, data, {
        headers: requstHeaders,
      })
      .then((response) => {
        console.log(response);

        handleClose();
        getAllAds();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "'Ads Not Updated'");
      })
      .finally(() => {
        setIsLoding(false);
      });
  };

  // *************** to view detail of booking *****************
  const showViewModel = (id) => {
    setItemId(id);
    setModelState("view-model");
    getUserDetails(id);
  };

  // *************** to get ads details *****************
  const getUserDetails = (id) => {
    axios
      .get(`${baseUrl}/admin/ads/${id} `, {
        headers: requstHeaders,
      })
      .then((response) => {
        console.log(response?.data?.data.ads);

        setUserDetails(response?.data?.data?.ads);
      })
      .catch((error) => {
        error(error?.response || "Not Found Tag Ids");
      });
  };

  useEffect(() => {
    getAllAds(1);
    getAdsDetails(itemId)
  }, []);

  return (
    <>
      {/* ************* this model to view booking ***************************************************************** */}
      <Modal
        open={modelState === "view-model"}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack sx={style} className="bord bg4" >
        
          <Typography id="modal-modal-description" sx={{ mb: 2 }} >
          {userDetails?.room?.images[0]?(
                    <img className="img"  src={userDetails?.room?.images[0]} alt="imageRoom" />):(<img className="img"  src={Photo} alt="noData" />)
                  }
            <Typography variant="h6">
              <span>Room Number : </span> {userDetails?.room?.roomNumber}
            </Typography>
            <Typography variant="h6">
              <span>Price : </span> {userDetails?.room?.price}
            </Typography>
            <Typography variant="h6">
              <span>Capacity : </span> {userDetails?.room?.capacity}
            </Typography>
            <Typography variant="h6">
              <span>Discount : </span> {userDetails?.room?.discount}
            </Typography>
          </Typography>
        </Stack>
      </Modal>
      {/* ************* this model to delete Ads *************************************************************** */}
      <Modal
        open={modelState === "delete-model"}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack sx={style} className="bord ">
          <Typography variant="body1" color="initial" margin="auto">
            {" "}
            <img src={noData} alt="no data" />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mb: 2 }} color="error">
            are you sure you want to delete this item ? if you are sure just{" "}
            <br /> click on delete it
          </Typography>
          <Button variant="contained" color="error" onClick={deleteTask}>
            {" "}
            delete
          </Button>
        </Stack>
      </Modal>

      {/* ************* this model to update Ads *************************************************************** */}
      <Modal
        open={modelState === "update-model"}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack sx={style} className="bord ">
          <form
            className="form w-100 m-auto mt-5 "
            onSubmit={handleSubmit(updateAds)}
          >
            <Box>
              <Typography variant="h5" color="blue" sx={{ mb: 3 }}>
                Up date
              </Typography>

              <Select
                {...register("isActive", { required: true })}
                fullWidth
                labelId="active"
                id="active"
                color="primary"
                placeholder="Active"
                value={active}
                label="Active"
                onChange={handleChange}
              >
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </Select>
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
                <Box>Discount is required</Box>
              )}
            </Box>

            <Stack direction="row" spacing={30} sx={{ my: 5 }}>
              <Button type="submit" variant="contained" color="primary">
                Up date
              </Button>
            </Stack>
          </form>
        </Stack>
      </Modal>
      {/* ************* for Table ****************************************************************************** */}
      <Stack direction="row" spacing={90} sx={{ my: 5 }}>
        <div>
          <Typography variant="h5" color="royalblue" sx={{ ml: 3 }}>
            ADS Table Details
          </Typography>
          <Typography variant="body2" color="slateblue" sx={{ ml: 3 }}>
            You can check all details
          </Typography>
        </div>

        <Link to="/dashboard/add-new-add">
          <Button variant="contained" onClick={handleClickOpen} >
            Add New Ads
          </Button>
        </Link>
      </Stack>

      <Box>
        <TableContainer component={Paper} >
          <Table
            sx={{ minWidth: 800, alignContent: "start" }}
            aria-label="customized table"
            
          >
            <TableHead >
              <TableRow>
                <StyledTableCell align="center">Room Number</StyledTableCell>
                <StyledTableCell align="center">Image</StyledTableCell>
                <StyledTableCell align="center">Price</StyledTableCell>
                <StyledTableCell align="center">Capacity</StyledTableCell>
                <StyledTableCell align="center">Discount</StyledTableCell>
                <StyledTableCell align="center">Active</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody >
              {adsList.map((ad, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row" align="center">
                    {ad?.room?.roomNumber}
                  </StyledTableCell>
                  <StyledTableCell sx={{width:"15%"}} component="th" scope="row" align="center">
                    {ad?.room?.images[0]?(
                    <img className="img"  src={ad?.room?.images[0]} alt="" />):(<img className="img"  src={Photo} alt="" />)
                  }
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
                    {ad?.isActive ? "Yes" : "No"}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row" align="center">
                    <span>
                      <RemoveRedEyeIcon
                        onClick={() => showViewModel(ad?._id)}
                        sx={{ color: yellow[600] }}
                      />{" "}
                      <DeleteForeverIcon
                        onClick={() => showDeleteModel(ad?._id)}
                        color="error"
                      />{" "}
                      <EditIcon
                        onClick={() => showUpdateModel(ad)}
                        sx={{ color: grey[30] }}
                      />{" "}
                    </span>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <Stack sx={{ bgcolor: "cornflowerblue" }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={6}
              count={arrayOfPages.length} // Update this line
              rowsPerPage={rowsPerPage}
              page={currentPage - 1}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Stack>
        </TableContainer>
      </Box>
    </>
  );
}
