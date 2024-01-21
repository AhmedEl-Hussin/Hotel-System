import { Button, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { useForm } from "react-hook-form";
import { RotatingLines } from 'react-loader-spinner';
import { useEffect, useState } from "react";
import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { AuthContext } from '../Context/AuthContext/AuthContext';
export default function EditRoom({getAllRooms, handleClose, setIsLoading, isLoading,id,room}) {
    
    const { adminData, userRole, baseUrl, requstHeaders} = React.useContext(AuthContext);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();


    useEffect(() => {
        setValue("roomNumber", room?.roomNumber);
        setValue("price", room?.price);
        setValue("capacity", room?.capacity);
        setValue("discount", room?.discount);
        setValue("facilities", room?.facilities.map((facility) => _id));
    }, [room])

    
    //**********************to get all Facilities************** */
    const [facilitiesList, setFacilitiesList] = useState([]);
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


    //********code of MUI drop down****** */

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };


    // ************ code to upload facilities array*********************/

    const [facilityName, setFacilityName] = React.useState([]);
    const newFacilityName = [...facilityName];
    const handleFacilityArray = (e: SelectChangeEvent<typeof facilityName>) => {
        console.log(e.target.value);

        for (let i = 0; i < e.target.value.length; i++) {
            newFacilityName.push(e.target.value[i]);
        }
        setFacilityName(newFacilityName);
    };


      // ************ code to upload imgs*********************/

      const [imageFiles, setImageFiles] = React.useState([]);

      const newImageFiles = [...imageFiles]; // Create a copy of the existing array
      const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  
          for (let i = 0; i < e.target.files.length; i++) {
              newImageFiles.push(e.target.files[i]);
          }
          setImageFiles(newImageFiles);
      };
  
  
  
  
  
  
      const EditRoomItem = (data) => {
  
          const formData = new FormData();
          formData.append("roomNumber", data.roomNumber);
          formData.append("price", data.price);
          formData.append("capacity", data.capacity);
          formData.append("discount", data.discount);
          const facilityName = data.facilities; // Assuming it's an array of IDs
          for (let i = 0; i < facilityName.length; i++) {
              formData.append("facilities[]", facilityName[i]);
          }
  
          for (let i = 0; i < imageFiles.length; i++) {
              formData.append("imgs", imageFiles[i]);
          }
  
          setIsLoading(true);
  
  
          axios.put(`${baseUrl}/admin/rooms/${id}`, formData, {
              headers: requstHeaders,
          })
              .then((res) => {
                  console.log(res);
  
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
        <Typography component='div' sx={{ backgroundColor: 'blue' }}>
            <Typography component='div' sx={{ backgroundColor: 'white', padding: '20px' }}>
                <form noValidate style={{ width: '100%' }} onSubmit={handleSubmit(EditRoomItem)}>
                    <Stack direction="column" gap={2} sx={{ paddingY: "13PX" }}>

                        <TextField type='text' placeholder='Room Number ....'   {...register("roomNumber", {
                            required: true,
                        })}
                        />
                        {errors.roomNumber && errors.roomNumber.type === "required" && (
                            <span className="text-danger">Required</span>
                        )}

                    </Stack>



                    <Stack direction="row" spacing={3} sx={{ paddingY: "13PX" }}>
                        <TextField type='text' placeholder='price ....'   {...register("price", {
                            required: true,
                        })}
                        />
                        {errors.price && errors.price.type === "required" && (
                            <span className="text-danger">Required</span>
                        )}


                        <TextField type='text' placeholder='capacity ....'   {...register("capacity", {
                            required: true,
                        })}
                        />
                        {errors.capacity && errors.capacity.type === "required" && (
                            <span className="text-danger">Required</span>
                        )}

                    </Stack>
                    <Stack direction="column" spacing={3} sx={{ paddingY: "13PX" }}>
                        <TextField type='text' placeholder='Discount ....'   {...register("discount", {
                            required: true,
                        })}
                        />
                        {errors.discount && errors.discount.type === "required" && (
                            <span className="text-danger">Required</span>
                        )}


                    </Stack>
                    {/* react dropdown  */}

                    <Stack direction="column" spacing={3} sx={{ paddingY: "13PX" }}>
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="demo-multiple-name-label">facility</InputLabel>
                            <Select
                                {...register("facilities", {
                                    required: true,
                                })}
                                type='text'
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                multiple
                                value={facilityName}
                                onChange={(e) => { handleFacilityArray(e) }}
                                input={<OutlinedInput label="Name" />}
                                MenuProps={MenuProps}
                            >
                                {facilitiesList?.map((facility, idx) => (
                                    <MenuItem
                                        key={idx}
                                        value={facility?._id}
                                    >
                                        {facility?.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.facilities && errors.facilities.type === "required" && (
                                <span className="text-danger">Required</span>
                            )}
                        </FormControl>
                    </Stack>

                    {/********** upload images  ***********/}

                    <Stack direction="column" spacing={3} sx={{ paddingY: "13PX" }}>
                        <TextField
                            {...register("imgs", {
                                required: true,
                            })}
                            label="Upload Image"
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => { handleImageUpload(e)}}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton edge="end" aria-label="upload picture">
                                        <PhotoCamera />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        />

                    </Stack>







                    <Button sx={{ fontWeight: '700', width: '100%' }} type='submit' className='submitButton'>
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



                </form>
            </Typography >

        </Typography >


    </>
    )
}
