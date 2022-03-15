import React, {useState, useEffect} from 'react';
import {Box, Paper, Grid, Typography, Divider, Button, IconButton} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link, useNavigate } from 'react-router-dom';


import TextField from '@mui/material/TextField';

export default function LoginForm() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});

	const registerData = async () => {
    const option = {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        email: user.email,
        password: user.password,})
    }
  
    const url = "http://localhost:3050/login"
    fetch(url, option).then((response)=> {return response.json()})
        .then((data)=>{
          if(data){
            localStorage.setItem("user", JSON.stringify(data));
            if(data?.idStaff){
              navigate('/admin')
            }
            else{     
              navigate('/')
            }
          }
        })
	};

  const handleChange = (field, e) =>{
    setUser({...user, [field]: e.target.value})
  }

  useEffect(() => {
    const connected = JSON.parse(localStorage.getItem("user"))

    if(connected){
      if(!connected?.idStaff){
        navigate('/')
      }
      else{
        // localStorage.removeItem("user")
      }
    }
  }, []);

  return (
    <Grid justifyContent={"center"} alignItems="flex-start" container item xs={12} sx={{height: "95vh","backgroundColor": "#0a0a0a", }} >
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
              Connexion:
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
              <Link to="/register">Pas de compte ?</Link>
              <Button size="small" sx={{ml: 1}}  variant="contained" onClick={()=>registerData()}>Se connecter</Button>
            </Grid>
          </Box>
        </Paper>
    </Grid>
  );
}