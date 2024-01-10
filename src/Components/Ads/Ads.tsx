import { useContext, useEffect, useState } from "react";


import axios from "axios";
import { toast } from 'react-toastify';
import { AuthContext } from "../Context/AuthContext/AuthContext";



export default function Ads({adminData}) {
  
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
    console.log(response);
    console.log(adminData)
    
      setAdsList(response?.data)
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
    <div>Ads</div>
  )
}

