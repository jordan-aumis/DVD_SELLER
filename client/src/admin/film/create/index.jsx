import React, {useState, useEffect} from 'react';
import {Box, Paper, Grid, Typography, Divider, Button, IconButton, Select, MenuItem} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link, useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';

export default function FilmCreate() {

  const [film, setFilm] = useState({});
  const [list, setList] = useState([])
  const [auth, setAuth] = useState({})
  const navigate = useNavigate();

  const fetchCategory = async () => {
    const url = "http://localhost:3050/category"
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
        title: film.title,
        description: film.description,
        release_year: film.release_year,
        replacement_cost: film.replacement_cost,
        rating: film.rating,
        stock: film.stock,
        CategoryCategoryId: film.category_id
      })
    }
  
    const url = "http://localhost:3050/film/new"
    fetch(url, option).then((response)=> {return response.json()})
    .then((data)=>{
      if(data){
        console.log("DATA")
      }
    })
	};

  const handleChange = (field, e) =>{
    setFilm({...film, [field]: e.target.value})
  }

  useEffect(() => {
    fetchCategory()
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
            <Typography variant="h5" >
              Nouveau film
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
                label="Titre"
                value={film.title || ""}
                onChange={(e)=>handleChange("title", e)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                // error
                id="outlined-error"
                label="description"
                value={film.description || ""}
                onChange={(e)=>handleChange("description", e)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                // error
                id="outlined-error"
                label="Sortie"
                value={film.release_year || ""}
                onChange={(e)=>handleChange("release_year", e)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                // error
                id="outlined-error"
                label="Prix"
                value={film.replacement_cost || ""}
                onChange={(e)=>handleChange("replacement_cost", e)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                // error
                id="outlined-error"
                label="Stock"
                value={film.stock || ""}
                onChange={(e)=>handleChange("stock", e)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                // error
                id="outlined-error"
                type="text"
                label="Note"
                value={film.rating || ""}
                onChange={(e)=>handleChange("rating", e)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
            <Typography variant="body1" >
             Categorie
            </Typography>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={film.category_id || ""}
                fullWidth
                onChange={(e)=>handleChange("category_id", e)}
              >
                {list?.json?.map((u)=>(
                  <MenuItem value={u.category_id}>{u.name}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid container item xs={12} justifyContent="flex-end" alignItems={"flex-end"} sx={{mt: 2}}>
              <Button sx={{ml: 1}} variant="contained" onClick={()=>registerData()}>Enregistrer</Button>
            </Grid>
          </Box>
        </Paper>
    </Grid>
  );
}