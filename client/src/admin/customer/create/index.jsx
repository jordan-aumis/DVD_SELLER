import React, {useState, useEffect} from 'react';
import {Box, Paper, Grid, Typography, Divider, Button, IconButton, Select, MenuItem,} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Link, useNavigate } from 'react-router-dom';
import moment from "moment";
import TextField from '@mui/material/TextField';
moment.locale("fr");

export default function CustomerCreate() {

  const [user, setUser] = useState({});
  const [auth, setAuth] = useState({})
  const [isAdult, setIsAdult] = useState(false);
  const [list, setList] = useState([]);

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
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        birthDate: user.birthDate,
        isAdult: isAdult,
        UserUserId: user.user_id
      })
    }
  
    const url = "http://localhost:3050/customer/new"
    fetch(url, option).then((response)=> {return response.json()})
    .then((data)=>{
      if(data){
        console.log("DATA", data)
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
  const handleChangeSelect = (e) =>{
    setUser({...e.target.value})
  }

  useEffect(()=>{
    fetchUser()
  }, [])

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
              value={user}
              fullWidth
              onChange={(e)=>handleChangeSelect(e)}
            >
              {list?.json?.map((u)=>(
                <MenuItem value={u}>{u.email}</MenuItem>
              ))}
            </Select>
        </Grid>
        <Grid container item xs={12} justifyContent="center">
          <Paper sx={{ width: '30%' }}>
            <Grid container item xs={12} justifyContent="center">
              <Typography variant="h5" >
                Nouveau Customer
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
              <Grid container item xs={12} justifyContent="flex-end" alignItems={"flex-end"} sx={{mt: 2}}>
                <Button sx={{ml: 1}} variant="contained" onClick={()=>registerData()}>Enregistrer</Button>
              </Grid>
            </Box>
          </Paper>
        </Grid>
    </Grid>
  );
}