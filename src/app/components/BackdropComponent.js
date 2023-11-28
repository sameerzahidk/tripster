
import React,{useState} from 'react'
import Backdrop from '@mui/material/Backdrop';

import CircularProgress from '@mui/material/CircularProgress';

export const BackdropComponent = (props) => {
    const[backdrop,setBackdrop]=useState()
    return (
        <Backdrop
            sx={{ color: '#fff',display:'flex',flexDirection:'column', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={props.backdrop}
           
        >
            <CircularProgress color="inherit" />
            <h2 className="font-semibold text-2xl md:text-[30px] md:leading-[70px] text-white ">
           {props.content}
          </h2>
        </Backdrop>

    )
}