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
import { Box, Modal, Stack, TablePagination, Typography } from "@mui/material";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

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

export default function Bookings() {
  const handleOpen = () => setOpen(true);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setModelState(close);
  };

  const [modelState, setModelState] = useState("colse");
  const { baseUrl, requstHeaders, userRole }: any = useContext(AuthContext);
  const [bookingList, setBookingList] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [itemId, setItemId] = useState("");
  const [isLoding, setIsLoding] = useState(false);

  // ********************pagination**************************************************************************************

  const [arrayOfPages, setArrayOfPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage + 1);
    getAllBooking(newPage + 1);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage(1);
    getAllBooking(1);
  };

  // *************** to get all Room *****************

  const getAllBooking = (page?: number) => {
    setIsLoding(true);

    axios
      .get(`${baseUrl}/admin/booking?page=1&size=10`, {
        headers: requstHeaders,
        params: {
          size: rowsPerPage,
          page: page,
        },
      })
      .then((response) => {
        console.log(response?.data?.data);
    

        setBookingList(response?.data?.data?.booking);
        setArrayOfPages(
          Array(response?.data?.data?.totalCount)
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

  // *************** to view detail of booking *****************
  const showViewModel = (id) => {
    setItemId(id);

    setModelState("view-model");
    getUserDetails(id);
    // alert(id)
  };

  // *************** to get booking details *****************
  const getUserDetails = (id) => {
    axios
      .get(`${baseUrl}/admin/booking/${id}`, {
        headers: requstHeaders,
      })
      .then((response) => {
        console.log(response?.data?.data?.booking);

        setUserDetails(response?.data?.data?.booking);
      })
      .catch((error) => {
        error(error?.response || "Not Found Tag Ids");
      });
  };

  useEffect(() => {
    getAllBooking(userRole);
    getUserDetails(itemId)
  }, []);

  return (
    <>
      {/* ************* this model to view booking ***************************************************************** */}
      <Modal
        open={modelState === "view-model"}
        onClose={handleClose}
       
      >
        <Stack sx={style} className="bord bg4">
          <Typography id="modal-modal-description" sx={{ mb: 2 }} >
            {/* <Typography variant="h6" color="yellow"><span>Start Date : </span>{userDetails.startDate.slice( 0 , 10)}</Typography> */}
            <Typography variant="h6" sx={{py:2}} >
              Status :  {userDetails.status}
            </Typography>
            <Typography variant="h6" >
              Price :    {userDetails.totalPrice}
           
            </Typography>
            {/* <Typography variant="h6" color="yellow"><span>End Date : </span>{userDetails.endDate.slice( 0 , 10)}</Typography> */}
          </Typography>
        </Stack>
      </Modal>

      {/* ************* for Table ****************************************************************************** */}
      <Box>
        <Box sx={{ ml: 3, my: 5 }}>
          <Typography variant="h5" color="royalblue">
            Booking Table Details
          </Typography>
          <Typography variant="body2" color="slateblue">
            You can check all details
          </Typography>
        </Box>

        <TableContainer component={Paper} sx={{ backgroundColor: "silver" }}>
          <Table
            sx={{ minWidth: 800, alignContent: "start" }}
            aria-label="customized table"
            className="bg5"
          >
            <TableHead className="ll">
              <TableRow>
                <StyledTableCell align="center">Room Number</StyledTableCell>
                <StyledTableCell align="center">Price</StyledTableCell>
                <StyledTableCell align="center">StartDate</StyledTableCell>
                <StyledTableCell align="center">EndDate</StyledTableCell>
                <StyledTableCell align="center">stautes</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody className="bg1">
              {bookingList.map((book, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row" align="center">
                    {book?.room?.roomNumber}
                  </StyledTableCell>

                  <StyledTableCell component="th" scope="row" align="center">
                    {book?.totalPrice}
                  </StyledTableCell>

                  <StyledTableCell component="th" scope="row" align="center">
                    {book?.startDate.slice(0, 10)}
                  </StyledTableCell>

                  <StyledTableCell component="th" scope="row" align="center">
                    {book?.endDate.slice(0, 10)}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row" align="center">
                    {book?.status}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row" align="center">
                    <span>
                      <RemoveRedEyeIcon
                        sx={{ color: yellow[600] }}
                        onClick={() => showViewModel(book._id)}
                      />{" "}
                    </span>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <Stack sx={{bgcolor:"cornflowerblue"}}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            // colSpan={6}
            count={arrayOfPages.length} // Update this line
            rowsPerPage={rowsPerPage}
            page={currentPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /></Stack>
        </TableContainer>
      </Box>
    </>
  );
}
