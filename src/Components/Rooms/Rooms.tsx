import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import noData from "../../assets/noData.png"
import { RotatingLines } from "react-loader-spinner";
import DeleteRoom from "./DeleteRoom";
import EditRoom from "./EditRoom";
import AddRoom from "./AddRoom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import BedroomParentOutlinedIcon from '@mui/icons-material/BedroomParentOutlined';
import { AuthContext } from "../Context/AuthContext/AuthContext";

export default function Rooms({saveAdminData}) {
  const { adminData, userRole, baseUrl, requstHeaders} = useContext(AuthContext);
  
   //************** consts for MUI table  ************ */

   const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },

    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const [roomsList, setRoomsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(null);
  const [room, setRoom] = useState(null);


   //***********************modal consts************* */


   const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "0px solid #ffff",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setModalState("close");


  const [modalState, setModalState] = useState("");


   //****************to view delete modal******************* */

   const deleteModalState = (id) => {
    setModalState("modal-delete");
    setId(id);
    handleOpen();
  };
  //****************to view edit modal******************* */

  const editModalState = (id) => {
    setModalState("modal-edit")
    setId(id);
    handleOpen();
    setRoom(room)

  };
  //****************to view add modal******************* */

  const addModalState = () => {
    setModalState("modal-add");
    handleOpen();
  };

  //****************to view show modal******************* */

  const showModalState = (room) => {
    setModalState("modal-show");
    handleOpen();
    getRoomData(room?._id)

  };





  
  const getRoomData=(id)=>{
   
    setIsLoading(true)
    axios
      .get(`${baseUrl}/admin/rooms/${id}`, {
        headers: requstHeaders,
      })
      .then((res) => {

        setRoom(res?.data?.data);
      })
      .catch((err) => {

      })
      .finally(() => {
        setIsLoading(false)
      })
  }





  const getAllRooms = () => {
    setIsLoading(true)
    axios
      .get(`${baseUrl}/admin/rooms`, {
        headers: requstHeaders,
      })
      .then((res) => {
        setRoomsList(res?.data?.data?.rooms);
        console.log(res?.data?.data?.rooms);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false)
      })

  };

  useEffect(() => {
    getAllRooms();
  }, []);





  return (
    <>{isLoading ?
      <div className="loaderContainer">
        <RotatingLines
          visible={true}
          height="100"
          width="100"
          margin="auto"
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div> : <>
        <div
          color="#1F263E"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div color="#1F263E">
            <h2>Rooms Table Details</h2>
            <h4>You can check all details</h4>
          </div>
          <div color="#1F263E">
            <Button
              onClick={() => {
                addModalState(room?._id);
              }}
              sx={{
                bgcolor: "#203FC7",
                borderRadius: "10px",
                color: "white",
                fontWeight: "700",
              }}
              size="large"
            >
              Add New Room
            </Button>
          </div>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Room Number</StyledTableCell>
                <StyledTableCell align="left">Image</StyledTableCell>
                <StyledTableCell align="left">Price</StyledTableCell>
                <StyledTableCell align="left">Discount</StyledTableCell>
                <StyledTableCell align="left">facilities</StyledTableCell>
                <StyledTableCell align="left">capacity</StyledTableCell>
                <StyledTableCell align="left">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            {roomsList.length < 1 ? (<div style={{ display: "flex", alignItems: "center" }}>
              <img src={noData} alt="no data found" />
              <h3>No Data Found</h3>
            </div>) : (<TableBody>
              {roomsList?.map((room, id) => (
                <StyledTableRow key={room?._id}>
                  <StyledTableCell component="th" scope="row">
                    {room?.roomNumber}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {room?.images[0] ? <img
                      src={`${room?.images[0]}`}
                      style={{ width: '60px', height: '60px', borderRadius: '10px' }}
                      alt={`Image for room ${room?.roomNumber}`}
                      crossOrigin='anonymous'
                    /> : <BedroomParentOutlinedIcon sx={{ width: '45px', height: '45px', textAlign: 'center' }} />}

                  </StyledTableCell>
                  <StyledTableCell align="left">{room?.price}</StyledTableCell>
                  <StyledTableCell align="left">{room?.discount}</StyledTableCell>
                  <StyledTableCell align="left">
                    {room?.facilities?.map((facility, id) => (
                      <span key={id}>{facility?.name}, </span>
                    ))}
                  </StyledTableCell>
                  <StyledTableCell align="left">{room?.capacity}</StyledTableCell>
                  <StyledTableCell align="left">
                    <div>

                      <ModeEditOutlineTwoToneIcon sx={{ cursor: 'pointer' }} onClick={() => {
                        editModalState(room?._id);
                      }} />
                      <DeleteForeverTwoToneIcon sx={{ cursor: 'pointer' }} onClick={() => {
                        deleteModalState(room?._id);
                      }} />
                      <VisibilityIcon sx={{ cursor: 'pointer' }} onClick={() => {
                        showModalState(room);
                      }} />



                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>)}

          </Table>
        </TableContainer></>}


      {/* ***************** show delete modal  ********* */}

      <div>
        <Modal
          open={modalState === "modal-delete"}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} color={"#494949"}>
            <DeleteRoom
               id ={id}
              getAllRooms={getAllRooms}
              handleClose={handleClose}
           />
          </Box>
        </Modal>
      </div>

      {/* ***************** show edit modal  ********* */}

      <div>
        <Modal
          open={modalState === "modal-edit"}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} color={"#494949"}>
            <EditRoom
              id={id}
              getAllRooms={getAllRooms}
              handleClose={handleClose}
              setIsLoading={setIsLoading}
              isLoading={isLoading}
              room={room}
            />
          </Box>
        </Modal>
      </div>

      {/* ***************** show add modal  ********* */}

      <div>
        <Modal
          open={modalState === "modal-add"}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} color={"#494949"}>
            <AddRoom

              isLoading={isLoading}
              getAllRooms={getAllRooms}
              handleClose={handleClose}
              setIsLoading={setIsLoading}
            />
          </Box>
        </Modal>
      </div>

      {/* ***************** view show modal  ********* */}

      <div>
        <Modal
          open={modalState === "modal-show"}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {isLoading ? <div className="loaderContainer">
            <RotatingLines
              visible={true}
              height="100"
              width="100"
              margin="auto"
              color="grey"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
              wrapperStyle={{}}
              wrapperClass=""/>
             </div>: <Box sx={style} color={"#494949"}>
              <Typography id="modal-modal-title" component="h3" sx={{ textAlign: 'center' }} >
                <img src={room?.room?.images[0]} style={{ width: '80px', height: '80px', borderRadius: '50%' }} />
              </Typography>
              <Typography id="modal-modal-title" component="h3" >
                <span className="modalSpan">  Room Number :</span><span>{room?.room?.roomNumber}</span>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <span className="modalSpan"> ID :</span>{room?.room?._id}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <span className="modalSpan"> price :</span>{room?.room?.price}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <span className="modalSpan"> Capacity :</span>{room?.room?.capacity}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <span className="modalSpan"> Facility :</span>
                {room?.room?.facilities?.map((facility, id) => (<>
                 <span key={id}>{facility?.name}, </span>
                </>
                 
                ))}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <span className="modalSpan"> Discount :</span>{room?.room?.discount}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <span className="modalSpan">  Created by :</span>{room?.room?.createdBy.userName}
              </Typography>
             </Box>}
        </Modal>
      </div>



    </>
  )
}
