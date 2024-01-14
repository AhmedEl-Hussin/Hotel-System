import { Button, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { useForm } from "react-hook-form";
import { RotatingLines } from 'react-loader-spinner';

export default function AddFacility({ getAllFacilities, handleClose, requstHeaders, setIsLoading, isLoading }) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const addFacility = (data) => {

        setIsLoading(true);

        axios.post('http://upskilling-egypt.com:3000/api/v0/admin/room-facilities?page=1&size=100', data, {
            headers: requstHeaders,
        })
            .then(() => {
                handleClose();
                getAllFacilities()
            })

            .catch((err) => { console.log(err?.data?.message) })
            .finally(() => {
                setIsLoading(false);
            })
    }

    return (
        <>
            <Typography component='div' sx={{ backgroundColor: 'blue' }}>
                <Typography component='div' sx={{ backgroundColor: 'white', padding: '20px' }}>
                    <Typography component='h3' sx={{ color: '#494949', fontWeight: '600', marginBottom: '30px' }}>Add Facility</Typography>
                    <form noValidate style={{ width: '100%' }} onSubmit={handleSubmit(addFacility)}>
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
                                </div> : 'Add'}
                            </Button>


                        </Stack>



                    </form>
                </Typography >

            </Typography >

        </>
    )
}