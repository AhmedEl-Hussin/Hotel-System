import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from 'react';
import axios from 'axios';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { RotatingLines } from 'react-loader-spinner'
import noData  from '../../assets/noData.png'


export default function Users() {

    const [isLoading , setIsLoading] =useState(false)

  //***********************modal consts************* */
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '0px solid #ffff',
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


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



  const [usersList, setUsersList] = useState([])
  const requstHeaders = {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NThhMTgyYjQ3ZWUyYjE0Zjk1NDY5OTAiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcwNDU4MjM5MiwiZXhwIjoxNzA1NzkxOTkyfQ.sVBY0wSo0_XUvxXi3E2DTyt0Lc1Efeax-ddoyxIJ1uU"
  }

  //**********************to get all users************** */



  const getAllUsers = () => {
    setIsLoading(true);

    axios.get('http://upskilling-egypt.com:3000/api/v0/admin/users?page=1&size=100', {
      headers: requstHeaders,
    })
      .then((res) => {
        setUsersList(res?.data?.data?.users)
        console.log(usersList);
      })

      .catch((err) => { console.log(err) })
      .finally(()=> {
        setIsLoading(false);
      })
  }

  useEffect(() => {
    getAllUsers()
  }, [])




   //****************to view modal******************* */


   const [user, setUser] = useState(null)

   const handleViewModal = (user) => {
     handleOpen()
     setUser(user)
     console.log(user);
 
   }
 


   return (<>
    {isLoading? <div className="loaderContainer">
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
    :<>
     <div color="text-muted" >
            <h2>Users Table Details</h2>
            <h4 mt-2>You can check all details</h4>
          </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
          <TableHead >
            <TableRow sx={{ backgroundColor: '#E2E5EB' }}>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell align="left">User Name</StyledTableCell>
              <StyledTableCell align="left">User email</StyledTableCell>
              <StyledTableCell align="left">phone number</StyledTableCell>
              <StyledTableCell align="left">country</StyledTableCell>
              <StyledTableCell align="left">User Profile</StyledTableCell>
  
            </TableRow>
          </TableHead>
          {usersList.length<1? <img src={noData} alt="" />:
           <TableBody>
           {usersList?.map((user, idx) => (
             <StyledTableRow key={user?._id}>
               <StyledTableCell component="th" scope="row" sx={{ fontWeight: 700 }}>
                 {idx + 1}
               </StyledTableCell>
               <StyledTableCell align="left">{user?.userName}</StyledTableCell>
               <StyledTableCell align="left">{user?.email}</StyledTableCell>
               <StyledTableCell align="left">{user?.phoneNumber}</StyledTableCell>
               <StyledTableCell align="left">{user?.country}</StyledTableCell>
               <StyledTableCell align="left"><div><VisibilityTwoToneIcon onClick={() => { handleViewModal(user) }} /> </div></StyledTableCell>
             </StyledTableRow>
           ))}
         </TableBody>}
         
        </Table>
      </TableContainer>
  
      {/* *****************modal show user profile ********* */}
  
      <div>
       
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} color={'#494949'}>
        
          <Typography id="modal-modal-title"  component="h3" >
            <span className="modalSpan">  Name :</span>{user?.userName }
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <span className="modalSpan">  E-mail :</span>{user?.email }
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <span className="modalSpan">  Phone Number :</span>{user?.phoneNumber }
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <span className="modalSpan">  Country :</span>{user?.country }
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <span className="modalSpan">  Created at :</span>{user?.createdAt }
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <span className="modalSpan">  Updated at :</span>{user?.updatedAt }
          </Typography>
        </Box>
      </Modal>
    </div >
    </>}
      
  
  
  
    </>
  
    )
   
}
