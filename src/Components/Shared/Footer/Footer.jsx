import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";


export default function Footer() {
  return (
    <>
      <Stack  sx={{ flexGrow: 1 }} bgcolor= "teal" >
        <Grid container spacing={2} sx={{py:3,px:5 }} justifyContent="center" >
          <Grid item xs={3} >
           
                  {/* ************************* for Caption ***************************** */}
            <Typography
              sx={{ mb: 1 }}
              component="div"
              variant="h5"
              className="text2"
            >
                 <Link to="/login" className="underline">
              Stay<span className="text">cation.</span></Link>
            </Typography>
            <Typography variant="body1" color="InactiveCaption">We kaboom your beauty holiday <br /> instantly and memorable.</Typography>
          </Grid>
            {/* ************************* for Caption2 ***************************** */}
          <Grid item xs={3} >
            <Typography
              sx={{ mb: 1 }}
              component="div"
              variant="h5"
              className="text5"
            >
              For Beginners
            </Typography>
            <Typography variant="body1" color="InactiveCaption">New Account</Typography>
            <Typography variant="body1" color="InactiveCaption" sx={{my:1}}>Start Booking a Room</Typography>
            <Typography variant="body1" color="InactiveCaption">Use Payments</Typography>
          </Grid>
            {/* ************************* for Caption2 ***************************** */}
          <Grid item xs={3} >
            <Typography
              sx={{ mb: 1 }}
              component="div"
              variant="h5"
              className="text5"
            >
             Explore Us
            </Typography>
            <Typography variant="body1" color="InactiveCaption">Our Careers</Typography>
            <Typography variant="body1" color="InactiveCaption" sx={{my:1}}>Privacy</Typography>
            <Typography variant="body1" color="InactiveCaption">Terms & Conditions</Typography>
          </Grid>
            {/* ************************* for Caption2 ***************************** */}
          <Grid item xs={3}>
            <Typography
              sx={{ mb: 1 }}
              component="div"
              variant="h5"
              className="text5"
            >
             Connect Us
            </Typography>
            <Typography variant="body1" color="InactiveCaption"><Link className="underline textfooter">support@staycation.id</Link></Typography>
            <Typography variant="body1" color="InactiveCaption" sx={{my:1}}>021 - 2208 - 1996</Typography>
            <Typography variant="body1" color="InactiveCaption">Staycation, Kemang, Jakarta</Typography>
          </Grid>
         
          <Grid item xs={8} textAlign="center" sx={{px:5 }}>
        
          
            <Typography variant="h6" color="InactiveCaption">Copyright 2019 • All rights reserved • Staycation</Typography>
          </Grid>
         
        
        </Grid>
      </Stack>
    </>
  );
}
