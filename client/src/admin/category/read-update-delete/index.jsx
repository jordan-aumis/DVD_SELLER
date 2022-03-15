import React, {useState, useEffect} from 'react';
import {Box, Paper, Grid, Typography, Divider, Button, IconButton, Select, MenuItem, InputLabel} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link, useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';

export default function CategoryModify() {

  const [category, setCategory] = useState({});
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState({});
  const [display, setDisplay] = useState(false);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    const url = "http://localhost:3050/category/"
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

  const handleChange = (field, e) =>{
    setCategory({...category, [field]: e.target.value})
  }

  const handleChangeSelect = (e) =>{
    setCategory({...e.target.value})
  }

  useEffect(() => {
    fetchCategories()
  }, []);

  useEffect(() => {
    if(category?.name){
      setDisplay(true)
    }
  }, [category]);

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
          <Typography variant="h5">Pour quelle categorie ?</Typography>
          <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selected}
              fullWidth
              onChange={(e)=>handleChangeSelect(e)}
            >
              {list?.json?.map((u)=>(
                <MenuItem value={u}>{u.name}</MenuItem>
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
                <TextField
                  // error
                  id="outlined-error"
                  label="Category"
                  value={category.name || ""}
                  onChange={(e)=>handleChange("name", e)}
                  fullWidth
                />
              </Grid>
              <Grid container item xs={12} justifyContent="flex-end" alignItems={"flex-end"} sx={{mt: 2}}>
                <Button sx={{ml: 1}} variant="contained" onClick={()=>console.log("click")}>Enregistrer</Button>
              </Grid>
            </Box>
          </Paper>)}
        </Grid>
    </Grid>
  );
}