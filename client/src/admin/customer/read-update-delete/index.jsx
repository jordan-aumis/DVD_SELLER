import React, {useState, useEffect} from 'react';
import {Box, Paper, Grid, Typography, Button, IconButton, Select, MenuItem, InputLabel} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link, useNavigate } from 'react-router-dom';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import moment from "moment";
import TextField from '@mui/material/TextField';
moment.locale("fr");

export default function CustomerModify() {

  const [user, setUser] = useState({});
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState({});
  const [isAdult, setIsAdult] = useState(false);
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

  const fetchCustomer = async (id) => {
    const url = "http://localhost:3050/customer/byUserId/"+id
		try {
				const response = await fetch(url);
				const json = await response.json();
        setUser(
          {
          ...user,
          birthDate: json.birthDate,
          customer_id: json.customer_id
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
        isAdult: isAdult,
        birthDate: user.birthDate})
    }
  
    const url = `http://localhost:3050/${user.customer_id}/update`
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
  
    const url = `http://localhost:3050/user/${user.customer_id}/delete`
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
    fetchCustomer(e.target.value.user_id)
    setUser({...e.target.value})
  }

  useEffect(() => {
    fetchUser()
  }, []);

  useEffect(() => {
    if(user.birthDate){
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
                <Button sx={{ml: 1}} variant="contained" onClick={()=>registerData()}>Modifier</Button>
                <Button sx={{ml: 1}} sx={{backgroundColor: "red", color: "white"}} variant="contained" onClick={()=>handleDelete()}>Supprimer</Button>
              </Grid>
            </Box>
          </Paper>)}
        </Grid>
    </Grid>
  );
}