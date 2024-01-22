import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { RotatingLines } from "react-loader-spinner";
import noData from "../../assets/noData.png";
import { Button } from "@mui/material";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
import AddFacility from "./addFacility";
import EditFacility from "./editFacility";
import DeleteFacility from "./deleteFacility";
import { AuthContext } from "../Context/AuthContext/AuthContext";

export default function Facilities(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [id, setId] = useState(null);
    const [facility, setFacility] = useState(null);
    const { baseUrl,requstHeaders } = useContext(AuthContext);


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


  //***********************table consts************* */

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
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const [facilitiesList, setFacilitiesList] = useState([]);
  


   //**********************to get all Facilities************** */

   const getAllFacilities = () => {
    setIsLoading(true);

    axios
      .get(
        `${baseUrl}/admin/room-facilities`,
        {
          headers: requstHeaders,
        }
      )
      .then((res) => {
        setFacilitiesList(res?.data?.data?.facilities);
        console.log(res?.data?.data?.facilities);
      })

      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getAllFacilities();
  }, []);

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
    setFacility(facility)

  };
  //****************to view add modal******************* */

  const addModalState = () => {
    setModalState("modal-add");
    handleOpen();
  };


    return (
        <>
         {isLoading ? (
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
        </div>
      ) : (
        <>
          <div
            color="#1F263E"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div color="text-muted">
              <h2>Facilities Table Details</h2>
              <h4 mt-2="true">You can check all details</h4>
            </div>
            <div color="#1F263E">
              <Button
                onClick={addModalState}
                sx={{
                  bgcolor: "#203FC7",
                  borderRadius: "10px",
                  color: "white",
                  fontWeight: "700",
                }}
                size="large"
              >
                Add New Facility
              </Button>
            </div>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="customized table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#E2E5EB" }}>
                  <StyledTableCell>#</StyledTableCell>
                  <StyledTableCell align="left">Name</StyledTableCell>
                  <StyledTableCell align="left">Created By</StyledTableCell>
                  <StyledTableCell align="left">Created at</StyledTableCell>
                  <StyledTableCell align="left">Updated at</StyledTableCell>
                  <StyledTableCell align="left">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              {facilitiesList.length < 1 ? (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img src={noData} alt="no data found" />
                  <h3>No Data Found</h3>
                </div>
              ) : (
                <TableBody>
                  {facilitiesList?.map((facility, idx) => (
                    <StyledTableRow key={facility?._id}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        sx={{ fontWeight: 700 }}
                      >
                        {idx + 1}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {facility?.name}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {facility?.createdBy?.userName}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {facility?.createdAt?.slice(0, 10)}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {facility?.updatedAt?.slice(0, 10)}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <div>
                          <DeleteForeverTwoToneIcon
                            sx={{ cursor: "pointer" }}
                            onClick={() => {
                              deleteModalState(facility?._id);
                            }}
                          />
                          <ModeEditOutlineTwoToneIcon
                            sx={{ cursor: "pointer" }}
                            onClick={() => {
                              editModalState(facility?._id);
                            }}
                          />
                        </div>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </>
      )}
       {/* ***************** show delete modal  ********* */}

       <div>
        <Modal
          open={modalState === "modal-delete"}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} color={"#494949"}>
            <DeleteFacility
            id={id}
            isLoading={isLoading}
            getAllFacilities={getAllFacilities}
            handleClose={handleClose}
            requstHeaders={requstHeaders}
            setIsLoading={setIsLoading} />
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
            <EditFacility
              id={id}
              isLoading={isLoading}
              getAllFacilities={getAllFacilities}
              handleClose={handleClose}
              requstHeaders={requstHeaders}
              setIsLoading={setIsLoading}
              facility={facility}
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
            <AddFacility
              isLoading={isLoading}
              getAllFacilities={getAllFacilities}
              handleClose={handleClose}
              requstHeaders={requstHeaders}
              setIsLoading={setIsLoading}
            />
          </Box>
        </Modal>
      </div>
            
        </>
    )
}
