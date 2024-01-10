






import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { AuthContext } from "../Context/AuthContext/AuthContext";
import { Box } from '@mui/material';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    // [`&.${tableCellClasses.head}`]: {
    //   backgroundColor:theme.palette.common.black,
    //   color: theme.palette.common.white,
    // },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));



export default function Ads() {
  
    const {baseUrl , requstHeaders, userRole} : any = useContext(AuthContext);
    const [adsList , setAdsList] = useState([]);
    const [isLoding , setIsLoding] =useState(false);
    const [arrayOfPages, setArrayOfPages] = useState([]);
   
   
      // *************** to get all Ads *****************
  const getAllAds = (pageNo)=>{
    setIsLoding(true)
    // if (userRole=='Manager') {
    //   user='manager'
      
    // } else {
    //   user='employee'
    // }
    axios.get(`${baseUrl}/admin/ads` , 
    {
      headers:requstHeaders,
      params: {
        pageSize: 10,
        pageNumber: pageNo,
      },
   
    })
    .then((response)=>{
    console.log(response?.data?.data?.ads);
      setAdsList(response?.data?.data?.ads)
      setArrayOfPages(
        Array(response?.data?.totalNumberOfPages).fill().map((_, i) => (i + 1))
      );
    
      

    }).catch((error)=>{
      toast.error(error?.response?.data?.message || "Something went Wrong");

    })
    .finally(()=> {
      setIsLoding(false);
    })
  }
  useEffect( ()=> {
    getAllAds(userRole)
  } , [])
  return (
    <>
 
   <TableContainer component={Paper} >
      <Table sx={{ minWidth: 400}} aria-label="customized table">
        <TableHead className='ll'>
          <TableRow>
            <StyledTableCell align="center">Room Number</StyledTableCell>
            <StyledTableCell align="center">Price</StyledTableCell>
            <StyledTableCell align="center">Capacity</StyledTableCell>
            <StyledTableCell align="center">Discount</StyledTableCell>
            <StyledTableCell align="center">Active</StyledTableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {adsList.map((ad) => (
            <StyledTableRow key={ad.id}>
              <StyledTableCell component="th" scope="row" align="center">
                {ad.room.roomNumber}
              </StyledTableCell>
           
              <StyledTableCell component="th" scope="row" align="center">
                {ad.room.price}
              </StyledTableCell>
           
              <StyledTableCell component="th" scope="row" align="center">
                {ad.room.capacity}
              </StyledTableCell>
           
              <StyledTableCell component="th" scope="row" align="center">
                {ad.room.discount
}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row" align="center">
                {ad.isActive==true?"Yes":"No"
}
              </StyledTableCell>
           
         
           
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   
    
    </>
  )
}

