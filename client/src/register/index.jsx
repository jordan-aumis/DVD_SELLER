import React, {useState, useEffect} from 'react';
import {Box, Paper, Grid, Typography, Divider, Button, IconButton} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Link, useNavigate } from 'react-router-dom';
import moment from "moment";
import TextField from '@mui/material/TextField';
moment.locale("fr");

export default function RegisterForm() {

  const [user, setUser] = useState({});
  const [isAdult, setIsAdult] = useState(false);
  const navigate = useNavigate();

	const registerData = async () => {
    const option = {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        firstName: user.firstName,
        userName: user.userName,
        lastName: user.lastName,
        email: user.email,
        password: user.password
      })
    }
  
    const url = "http://localhost:3050/register";
    fetch(url, option).then((response)=> {return response.json()})
        .then((data)=>{
          fetch("http://localhost:3050/customer/new",{
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
              birthDate: user.birthDate,
              isAdult: isAdult,
              UserUserId: data.user_id
            })
          })
          .then((response)=> {return response.json()})
          .then((dataCustomer)=>{
            if(data && dataCustomer){
              navigate('/login')
            }
          })
        })
	};

  const handleChange = (field, e) =>{
    if(field === "birthDate"){
      const date = moment(e).format("YYYY-MM-DD")
      const dateNow = moment(new Date()).format("YYYY-MM-DD")
      setUser({...user, [field]: date})
      if((Number(dateNow.split("-")[0]) - Number(date.split("-")[0])) >= 18){
        setIsAdult(true)
      }
      else{
        setIsAdult(false)
      }
    }
    else{
      setUser({...user, [field]: e.target.value})
    }
  }

  useEffect(() => {
    const connected = localStorage.getItem("user")

    if(connected){
      navigate('/')
    }
  }, []);

  return (
    <Grid justifyContent={"center"} alignItems="center" container item xs={12} sx={{height: "95vh", "backgroundColor": "#0a0a0a",}} >
      <Grid
        container
        item
        xs={12}
        sx={{height: "5rem", ml: "5rem"}}
        alignItems={"flex-end"}
      >
          <IconButton
            size="large"
            edge="start"
            color="secondary"
            aria-label="add item"
            onClick={() => navigate(-1)}
            sx={{backgroundColor: "#303030"}}
          >
            <ArrowBackIosIcon color="white" size="inherit" sx={{ml: 1}} />
          </IconButton>
        </Grid>
        <Paper sx={{ width: '30%' }}>
          <Grid container item xs={12} justifyContent="center">
            <Typography variant="h4" >
              Inscription:
            </Typography>
          </Grid>
          <Divider />
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { mt: 2 },
            }}
            noValidate
            autoComplete="off"
          >
            <Grid item xs={12}>
              <TextField
                // error
                id="outlined-error"
                label="Prénom"
                onChange={(e)=>handleChange("firstName", e)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                // error
                id="outlined-error"
                label="Nom"
                onChange={(e)=>handleChange("lastName", e)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                // error
                id="outlined-error"
                label="Pseudo"
                onChange={(e)=>handleChange("userName", e)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Date de naissance"
                  inputFormat="yyyy-MM-dd"
                  value={user.birthDate || ""}
                  onChange={(e)=>handleChange("birthDate", e)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                // error
                id="outlined-error"
                label="email"
                onChange={(e)=>handleChange("email", e)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                // error
                id="outlined-error"
                type="password"
                label="mot de passe"
                onChange={(e)=>handleChange("password", e)}
                fullWidth
              />
            </Grid>
            <Grid container item xs={12} justifyContent="flex-end" alignItems={"flex-end"} sx={{mt: 2}}>
              <Link to="/login">Déja inscrit ?</Link>
              <Button sx={{ml: 1}} variant="contained" onClick={()=>registerData()}>S'inscrire</Button>
            </Grid>
          </Box>
        </Paper>
    </Grid>
  );
}