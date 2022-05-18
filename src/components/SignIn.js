import { Button, Grid, Paper, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  let intial = {
    email: "",
    password: "",
  };
  const [user, setuser] = useState(intial);
  const [error, setError] = useState(intial);

  const handleChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    setError(validation());
    data();
  };
  const data = () => {
    let data = Object.values(error).filter((val) => val !== "");
    if (data.length === 0) {
      handleCall();
    }
  };

  let handleCall = async () => {
      const url = "http://localhost:8001/login";
      let data = await axios.post(url, user);
      console.log(data);
      localStorage.setItem("login", true);
      if (data.data.message === "successfully Login") {
        localStorage.setItem("name", data.data.data.userValid.fname);
        alert("Login Successfull");
        navigate("/dashboard");
      } else {
        alert("Invalid user ID");
        navigate("/");
      }
  };

  const validation = () => {
    const errors = {
      email: "",
      password: "",
    };
    let mailrx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (user.password === "") {
      errors.password = "Password Cannot be Empty";
    } else if (!mailrx.test(user.password))
      errors.password = "";
    else {
      errors.password = "Password is Required";
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email)) {
      errors.email = "Please Enter A Valid Email Adress";
    } else if (user.email === "") errors.email = "Email Cannot Be Empty";
    else errors.email = "";
    return errors;
  };

  const paperstyle = {
    padding: 30,
    height: "52vh",
    width: 600,
    margin: "60px auto",
  };
  const btnstyle = { marginBottom: "8px" };
  return (
    <Grid>
      <Paper elevation={20} style={paperstyle}>
        <form>
          <h1 style={{ fontWeight: "bold", marginBottom: "25px" }}>Sign In</h1>
          <Grid>
            <TextField
              id="outlined-basic"
              label="Email Address"
              placeholder="Enter Email"
              variant="outlined"
              fullWidth
              required
              name="email"
              value={user.email}
              onChange={handleChange}
            />
            <span style={{ color: "red" }}>{error.email}</span>
            <br /> <br />
            <TextField
              id="outlined-basic"
              label="Password"
              placeholder="Enter Password"
              variant="outlined"
              type="password"
              fullWidth
              required
              name="password"
              value={user.password}
              onChange={handleChange}
            />
            <span style={{ color: "red" }}>{error.password}</span>
            <br /> <br />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              style={btnstyle}
              onClick={(e) => {
                handleLogin(e);
              }}
            >
              Sign In Now
            </Button>
            <span>Dont have an account?</span>
            <span
              onClick={() => {
                navigate("/signup");
              }}
              style={{ color: "blue", textDecoration: "underline" }}
            >
              SignUp
            </span>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
};

export default SignIn;
