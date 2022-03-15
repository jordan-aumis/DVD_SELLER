import React, {useState, useEffect} from 'react';
import {Box, Paper, Grid, Typography, Divider, Button, IconButton, Select, MenuItem, InputLabel} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link, useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';

export default function UserModify() {

  const [user, setUser] = useState({});
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState({});
  const [display, setDisplay] = useState(false);
  const navigate = useNavigate();

  const fetchUser = async () => {
    const url = "http://localhost:3050/user"
		try {
				const response = await fetch(url);
				const json = await response.json();
        setList({
          json
        })
				} catch (error) {
				console.log("error", error);
				}
	};

	const registerData = async () => {
    const option = {
      method: 'PATCH',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        firstName: user.firstName,
        userName: user.userName,
        lastName: user.lastName,
        email: user.email,
      })
    }
  
    const url = `http://localhost:3050/user/${user.user_id}/update`
    fetch(url, option).then((response)=> {return response.json()})
        .then((data)=>{
          if(data){
           console.log("DATA")
          }
        })
	};

  const deleteUser = async () =>{
    const option = {
      method: 'DELETE',
      headers: {'content-type': 'application/json'},
    }
  
    const url = `http://localhost:3050/user/${user.user_id}/delete`
    fetch(url, option).then((response)=> {return response.json()})
        .then((data)=>{
          if(data){
           console.log("DATA")
          }
        })
  }

  const handleDelete = ()=>{
    deleteUser();
  }

  const handleChange = (field, e) =>{
    setUser({...user, [field]: e.target.value})
  }

  const handleChangeSelect = (e) =>{
    setUser({...e.target.value})
  }

  useEffect(() => {
    fetchUser()
  }, []);

  useEffect(() => {
    if(user.firstName){
      setDisplay(true)
    }
  }, [user]);

  return (
    <Grid justifyContent={"center"} alignItems="flex-start" container item xs={12} sx={{height: "95vh", "backgroundColor": "#0a0a0a",}} >
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
        <Grid container item xs={4} sx={{backgroundColor: "white", height: "5rem"}}>
          <Typography variant="h5">Pour qui est le changement ?"</Typography>
          <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selected}
              fullWidth
              onChange={(e)=>handleChangeSelect(e)}
            >
              {list?.json?.map((u)=>(
                <MenuItem value={u}>{u.email}</MenuItem>
              ))}
            </Select>
        </Grid>
        <Grid container item xs={12} justifyContent="center">
          {display && (
            <Paper sx={{ width: '30%' }}>
            <Grid container item xs={12} justifyContent="center">
              <Typography variant="h5" >
                Modifier Utilisateur ?
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
                value={user.firstName}
                label="Prénom"
                onChange={(e)=>handleChange("firstName", e)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                // error
                id="outlined-error"
                value={user.lastName}
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
                value={user.userName}
                onChange={(e)=>handleChange("userName", e)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                // error
                id="outlined-error"
                value={user.email}
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
                value={user.password}
                disabled
                label="mot de passe"
                onChange={(e)=>handleChange("password", e)}
                fullWidth
              />
            </Grid>
            <Grid container item xs={12} justifyContent="flex-end" alignItems={"flex-end"} sx={{mt: 2}}>
              <Button sx={{ml: 1}} variant="contained" onClick={()=>registerData()}>Modifier</Button>
              <Button sx={{ml: 1}} sx={{backgroundColor: "red", color: "white"}} variant="contained" onClick={()=>handleDelete()}>Supprimer</Button>
            </Grid>
          </Box>
          </Paper>)}
        </Grid>
    </Grid>
  );
}