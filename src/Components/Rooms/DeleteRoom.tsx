import { Button, Typography } from "@mui/material";
import email from '../../assets/email.png'
import { RotatingLines } from "react-loader-spinner";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext/AuthContext";
export default function DeleteRoom( {getAllRooms, handleClose,id} ) {
    const { adminData, userRole, baseUrl, requstHeaders} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const deleteRoomItem = () => {
        console.log("delete");
        setIsLoading(true);
        axios.delete(`${baseUrl}/admin/rooms/${id}`, {
            headers: requstHeaders,
        })
            .then((res) => {
                handleClose();
                getAllRooms()
            })
            .catch((err) => { console.log(err) })
            .finally(() => {
                setIsLoading(false);
            })

    }
    return (
        <>
        <Typography component='div' style={{ textAlign: 'center', padding: '20px' }}>
            <img src={email} alt="delete" style={{ width: '100px', height: '100px', paddingBottom: '25px', paddingTop: '10px' }} />
            <Typography component='h3' style={{ fontWeight: '600' }}>Delete this Room?</Typography>
            <Typography component='h3' style={{ fontWeight: '500', padding: '15px' }}>are you sure you want to delete this item ? if you are sure just click on delete it</Typography>
            <Button sx={{ fontWeight: '700', marginTop: '10px' }} className='submitButton' onClick={deleteRoomItem}>
                {isLoading ? <div className="loaderContainer " style={{ height: "10px" }}>
                    <RotatingLines
                        visible={true}
                        height="8"
                        width="40"
                        margin="auto"
                        color="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div> : 'Delete'}
            </Button>
        </Typography>

    </>
    )
}
