import { Button, Typography } from "@mui/material";
import email from '../../assets/email.png'
import { RotatingLines } from "react-loader-spinner";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext/AuthContext";
import { useContext } from "react";

export default function DeleteFacility({ id, getAllFacilities, handleClose, setIsLoading, isLoading }) {
    const { baseUrl,requstHeaders } = useContext(AuthContext);
    const deleteFacilityItem = () => {
        console.log("delete");
        setIsLoading(true);
        axios.delete(`${baseUrl}/api/v0/admin/room-facilities/${id}`, {
            headers: requstHeaders,
        })
            .then((res) => {
                handleClose();
                getAllFacilities()
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
                <Typography component='h3' style={{ fontWeight: '600' }}>Delete this facility?</Typography>
                <Typography component='h3' style={{ fontWeight: '500', padding: '15px' }}>are you sure you want to delete this item ? if you are sure just click on delete it</Typography>
                <Button sx={{ fontWeight: '700', marginTop: '10px' }} className='submitButton' onClick={deleteFacilityItem}>
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
                    </div> : 'Update'}
                </Button>
            </Typography>

        </>
    )
}