import React, {useState, useEffect} from 'react';
import {Box, Paper, Grid, Typography, Divider, Button, IconButton} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link, useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';

export default function AddressForm() {

  const [user, setUser] = useState({});
  const [auth, setAuth] = useState({})
  const navigate = useNavigate();

  const fetchUser = async (id) => {
    const url = "http://localhost:3050/user/"+id
		try {
				const response = await fetch(url);
				const json = await response.json();
        setUser({
          ...user,
          address_id: json.AddressAddressId
        })
				} catch (error) {
				console.log("error", error);
				}
	};

  const fetchAddress = async (id) => {
    const url = "http://localhost:3050/address/"+id
		try {
				const response = await fetch(url);
				const json = await response.json();
        setUser(
          {
          ...user,
          address: json.address,
          address2: json.address2,
          phone: json.phone,
          city: json.city,
          district: json.district,
          postalCode: json.postalCode
        })
				} catch (error) {
				console.log("error", error);
				}
	};

	const registerData = async () => {
    const option = {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({address: user.address,
        address2: user.address2,
        phone: user.phone,
        city: user.city,
        district: user.district,
        postalCode: user.postalCode})
    }
  
    const url = "http://localhost:3050/address/new"
    fetch(url, option).then((response)=> {return response.json()})
        .then((data)=>{
          if(data){
            fetch(`http://localhost:3050/user/${auth.idUser}/update`,  {
              method: 'PATCH',
              headers: {'content-type': 'application/json'},
              body: JSON.stringify({AddressAddressId: data.address_id})
            }).then((response)=> {return response.json()})
            .then((dataUser)=>{
              navigate(-1)
            })
          }
        })
	};

  const handleChange = (field, e) =>{
    setUser({...user, [field]: e.target.value})
  }

  useEffect(() => {
    const connected = localStorage.getItem("user")
    setAuth(JSON.parse(connected));
    fetchUser(JSON.parse(connected).idUser)
    if(!connected){
      navigate('/login')
    }
  }, []);

  useEffect(()=>{
    if(user.address_id){
      fetchAddress(user.address_id);
    }
  }, [user.address_id])

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
              Quelle est votre addresse de livvraison ?
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
                label="Adresse"
                value={user.address || ""}
                onChange={(e)=>handleChange("address", e)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                // error
                id="outlined-error"
                label="Adresse 2"
                value={user.address2 || ""}
                onChange={(e)=>handleChange("address2", e)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                // error
                id="outlined-error"
                label="Quartier"
                value={user.district || ""}
                onChange={(e)=>handleChange("district", e)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                // error
                id="outlined-error"
                label="Téléphone"
                value={user.phone || ""}
                onChange={(e)=>handleChange("phone", e)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                // error
                id="outlined-error"
                type="text"
                label="Ville"
                value={user.city || ""}
                onChange={(e)=>handleChange("city", e)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                // error
                id="outlined-error"
                type="text"
                label="Code Postale"
                value={user.postalCode || ""}
                onChange={(e)=>handleChange("postalCode", e)}
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