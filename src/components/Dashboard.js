import React ,{useState,useEffect} from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import MenuAppBar from "./Navbar";

function Dashboard() {

  const navigate = useNavigate();
  const[fname,setfname]=useState("")

  useEffect(()=>{
let name=localStorage.getItem("name");
setfname(name);
  },[])

  const logout = ()=>{
    localStorage.clear()
    navigate('/')
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="col-2"
          style={{ backgroundColor: "black",  height: "100vh",marginTop:"0px" }}
        >
        <Paper style={{ marginTop:"20px" }} >
          <Typography variant="h5" style={{ backgroundColor: "black" ,color:"#7fff00"}} >
          Dashboard
          </Typography>
          </Paper>
      <Button sx={{color:"#7fff00",fontSize:"20px"}}
      onClick={logout}
      >Logout</Button>
        </div>
        <div className="col-10 " style={{padding:"0px"}}>
        <MenuAppBar ></MenuAppBar>
        <div style={{marginTop:"25px",backgroundColor:"#d2c6c6",height:"100vh"}}>
        <Typography variant="h3" style={{ color:"black"}} >
          welcome {fname} !
          </Typography>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
