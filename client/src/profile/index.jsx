import React, {useState, useEffect} from 'react';
import {Box, Paper, Grid, Typography, Divider, Button, IconButton, Stack} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Link, useNavigate } from 'react-router-dom';
import Switch from '@mui/material/Switch';
import moment from "moment";
import TextField from '@mui/material/TextField';

moment.locale("fr");

export default function ProfileForm() {

  const [user, setUser] = useState({});
  const [auth, setAuth] = useState({});
  const [customerId, setCustomerId] = useState("")
  const [isAdult, setIsAdult] = useState(false);

  const navigate = useNavigate();

	const fetchUser = async (id) => {
    const urlUser = "http://localhost:3050/user/"+id;
		try {
				const response = await fetch(urlUser);
				const json = await response.json();
				setUser({
          firstName: json.firstName,
          userName: json.userName,
          lastName: json.lastName,
          email: json.email,
          password: json.password
        })
				} catch (error) {
				console.log("error", error);
				}
	};
  const fetchCustomer = async (id) => {
    const urlCustomer = "http://localhost:3050/customer/byUserId/"+id;
		try {
				const response = await fetch(urlCustomer);
				const json = await response.json();
				setUser({
          birthDate: json.birthDate,
        })
        setCustomerId(json.customer_id)
        setIsAdult(json.isAdult)
				} catch (error) {
				console.log("error", error);
				}
	};
	const registerData = async () => {

    const option = {
      method: 'PATCH',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({firstName: user.firstName,
        userName: user.userName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,})
    }
    const option2 = {
      method: 'PATCH',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        birthDate: user.birthDate,
        isAdult: isAdult
      })
    }
  
    const urlUser = `http://localhost:3050/user/${auth.idUser}/update`
    fetch(urlUser, option).then((response)=> {return response.json()})
    .then((data)=>{
      if(data){
        console.log("DataUser")
      }
    })

    const urlCustomer = `http://localhost:3050/customer/${customerId}/update`
    fetch(urlCustomer, option2).then((response)=> {return response.json()})
    .then((data)=>{
      if(data){
        navigate('/')
      }
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
    if(!connected){
      navigate('/')
    }
    else{
      setAuth(JSON.parse(connected))
      fetchUser(JSON.parse(connected).idUser)
      fetchCustomer(JSON.parse(connected).idUser)
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
              Profile:
            </Typography>
          </Grid>
          <Divider />
          <Grid container item xs={12}>
            <Grid container item xs={6}>
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
                    value={user.firstName}
                    onChange={(e)=>handleChange("firstName", e)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    // error
                    id="outlined-error"
                    label="Nom"
                    value={user.lastName}
                    onChange={(e)=>handleChange("lastName", e)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    // error
                    id="outlined-error"
                    label="Pseudo"
                    value={user.userName}
                    onChange={(e)=>handleChange("userName", e)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    // error
                    id="outlined-error"
                    label="email"
                    value={user.email}
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
                    value={user.password}
                    onChange={(e)=>handleChange("password", e)}
                    disabled
                    fullWidth
                  />
                </Grid>
              </Box>
            </Grid>
            <Grid container item xs={6}>
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { mt: 2 },
                }}
                noValidate
                autoComplete="off"
              >
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
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Switch checked={isAdult} />
                    <Typography>{isAdult ? "Majeure" : ""}</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                <Button sx={{ml: 1}} variant="outlined" onClick={()=>navigate("/address")}>Adresse</Button>
                </Grid>
              </Box>
            </Grid>
            <Grid container item xs={12} justifyContent="flex-end" alignItems={"flex-end"} sx={{mt: 2}}>
              <Button sx={{ml: 1}} variant="contained" onClick={()=>registerData()}>Modifier</Button>
            </Grid>
          </Grid>
        </Paper>
    </Grid>
  );
}