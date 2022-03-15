import React, {useState, useEffect} from 'react';
import {Box, Paper, Grid, Typography, Divider, Button, IconButton} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link, useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';

export default function CategoryCreate() {

  const [category, setCategory] = useState({});
  const [auth, setAuth] = useState({})
  const navigate = useNavigate();

	const registerData = async () => {
    const option = {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        name: category.name,
      })
    }
  
    const url = "http://localhost:3050/category/new"
    fetch(url, option).then((response)=> {return response.json()})
    .then((data)=>{
      if(data){
        console.log("DATA", data)
      }
    })
	};

  const handleChange = (field, e) =>{
    setCategory({...category, [field]: e.target.value})
  }

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
        <Paper sx={{ width: '30%' }}>
          <Grid container item xs={12} justifyContent="center">
            <Typography variant="h5" >
              Nouvelle categorie
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
                label="Categorie"
                value={category.name || ""}
                onChange={(e)=>handleChange("name", e)}
                fullWidth
              />
            </Grid>
            <Grid container item xs={12} justifyContent="flex-end" alignItems={"flex-end"} sx={{mt: 2}}>
              <Button sx={{ml: 1}} variant="contained" onClick={()=>registerData()}>Enregistrer</Button>
            </Grid>
          </Box>
        </Paper>
    </Grid>
  );
}