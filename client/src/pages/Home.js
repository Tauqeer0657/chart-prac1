import React from 'react'
import SideBar from '../component/SideBar'
import Box from '@mui/material/Box';




export default function Home() {
  return (
    <Box sx={{display:'flex'}}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1 ,marginTop:"65px"}}>
     home
        
      </Box>
    </Box>
  )
}
