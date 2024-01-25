import { Button, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { useForm } from "react-hook-form";
import { RotatingLines } from 'react-loader-spinner';
import { AuthContext } from '../Context/AuthContext/AuthContext';
import { useContext } from 'react';

export default function EditFacility({facility , id, getAllFacilities, handleClose, setIsLoading,isLoading }) {
    const { baseUrl,requstHeaders } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const EditFacility = (data) => {
        setValue("name",facility?.name)
        setIsLoading(true);
        axios.put(`${baseUrl}/api/v0/admin/room-facilities/${id}`, data, {
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
        <Typography component='div' sx={{ backgroundColor: 'blue' }}>
                <Typography component='div' sx={{ backgroundColor: 'white', padding: '20px' }}>
                    <Typography component='h3' sx={{ color: '#494949', fontWeight: '600', marginBottom: '30px' }}>Edit Facility</Typography>
                    <form noValidate style={{ width: '100%' }} onSubmit={handleSubmit(EditFacility)}>
                        <Stack gap={4}>
                            <TextField type='text' placeholder='New facility Name ....'  {...register("name", {
                                required: true,
                            })}
                            />
                            {errors.name && errors.name.type === "required" && (
                                <span className="text-danger">facility name is required</span>
                            )}
                            <Button sx={{ fontWeight: '700' }} type='submit' className='submitButton'>
                                {isLoading ? <div className="loaderContainer " style={{height:"10px"}}>
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


                        </Stack>



                    </form>
                </Typography >

            </Typography >

            
        </>
    )
}