import React, {useState, useEffect} from 'react';
import {Box, Paper, Grid, Typography, Divider, Button, IconButton, Stack, Switch, Select, MenuItem} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link, useNavigate } from 'react-router-dom';

export default function StaffCreate() {

  const [user, setUser] = useState({
    isManager: false
  });
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
        isManager: user.isManager,
        UserUserId: user.user_id
      })
    }
  
    const url = "http://localhost:3050/staff/new"
    fetch(url, option).then((response)=> {return response.json()})
    .then((data)=>{
      if(data){
        console.log("DATA")
      }
    })
	};

  const handleChange = (field, e) =>{
    setUser({...user, [field]: e.target.value})
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
               nouvel employé
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
                  <Typography variant="h5">Manager ?</Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>Non</Typography>
                    <Switch checked={user.isManager} onChange={()=>setUser({...user, isManager: !user.isManager})}/>
                    <Typography>Oui</Typography>
                  </Stack>
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