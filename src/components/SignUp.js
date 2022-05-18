import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  let intial={
    fname: "",
    lname: "",
    email: "",
    password: "",
  }
  const [data, setdata] = useState(intial);
  const[error,setError]=useState(intial)
  //input field validation
 
  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const handleRegister=(event)=>{
    event.preventDefault();
    setError(validation())
    dataCheck()
  }

  const validation = () => {
    const errors = {
      email: "",
      password: "",
      fname:"",
      lname:""
    };
    let mailrx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (data.password === "") {
      errors.password = "Password Cannot be Empty";
    } else if (mailrx.test(data.password))
      errors.password = "Password is Required";
    else errors.password = "";
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) {
      errors.email = "Please Enter A Valid Email Adress";
    } else if (data.email === "") errors.email = "Email Cannot Be Empty";
    else errors.email = "";
    if (data.fname) {
      const nameRegix = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
      if (data.fname.match(nameRegix)) {
        errors.fname=""
      } else {
        errors.fname="Only character allowed"
      }
    } else errors.fname="Name Cannot be blank" 
    if (data.lname) {
      const nameRegix = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
      if (data.lname.match(nameRegix)) {
        errors.lname="";
      } else {
        errors.lname="Only character allowed"
      }
    } else errors.lname="Name Cannot be blank" 
    return errors;
  };

  const dataCheck = () => {
    let err = Object.values(error).filter((val) => val !== "");
    if (err.length === 0) {
      handleCall();
    }
  };

  let handleCall = async () => {
    const url = "http://localhost:8001/register";
    let responseData = await axios.post(url, data);
    console.log(responseData);
    let status=await responseData;
    if(status===200){
      alert("Registered succesfully");
      localStorage.setItem('login',true)
      if(localStorage.getItem("login")===true){
        navigate("/dashboard");
      }
      else{
        alert("Invalid user ID")
        navigate("/")
      }
    }else {
      alert("Invalid Credentials");
    }
    
  };
  const paperstyle = {
    padding: 30,
    height: "80vh",
    width: 600,
    margin: "60px auto",
  };
  const btnstyle = { marginBottom: "8px", backgroundColor: "blue" };

  return (
    <Grid>
      <Paper elevation={20} style={paperstyle}>
        <form>
          <h4 style={{ fontWeight: "bold", marginBottom: "1px" }}>
            Create a new account
          </h4>
          <Typography>Use your email to create a account</Typography> <br />
          <Grid>
            <TextField
              label="First Name"
              placeholder="Enter First Name"
              variant="outlined"
              fullWidth
              required
              name="fname"
              value={data.fname}
              onChange={handleChange}
            />{" "}
              <span style={{ color: "Red" }}>{error.fname}</span>
            <br /> <br />
            <TextField
              label="Last Name"
              placeholder="Enter Last Name"
              variant="outlined"
              fullWidth
              required
              name="lname"
              value={data.lname}
              onChange={handleChange}
            />{" "}
             <span style={{ color: "Red" }}>{error.lname}</span>
            <br /> <br />
            <TextField
              label="Email Address"
              placeholder="Enter Your Email"
              variant="outlined"
              fullWidth
              required
              name="email"
              value={data.email}
              onChange={handleChange}
            />{" "}
             <span style={{ color: "Red" }}>{error.email}</span>
            <br /> <br />
            <TextField
              label="Password"
              placeholder="Enter Password"
              variant="outlined"
              type="password"
              fullWidth
              required
              name="password"
              value={data.password}
              onChange={handleChange}
            />{" "}
            <span style={{ color: "Red" }}>{error.password}</span>
            <br /> <br />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              style={btnstyle}
              onClick={(e) => {
                handleRegister(e);
              }}
            >
              Sign Up Now
            </Button>
            <span> Have an account?</span>
            <span
              onClick={() => {
                navigate("/");
              }}
              style={{ color: "blue" }}
            >
              Sign In
            </span>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
};

export default SignUp;
