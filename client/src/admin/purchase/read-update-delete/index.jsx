import React, {useState, useEffect} from 'react';
import {Box, Paper, Grid, Typography, Divider, Button, IconButton, Select, List, ListItem, ListItemText, MenuItem, InputLabe, ListIteml} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link, useNavigate } from 'react-router-dom';
import moment from "moment";

moment.locale("fr");
export default function PurchaseList() {

  const [purchase, setPurchase] = useState([]);
  const [user, setUser] = useState([]);
  const [customer, setCustomer] = useState([]);

  const formatIdToName = (id) =>{
    if(!id){
      id = 5
    }
    const userId = customer.find(x => x.customer_id === id)?.UserUserId
    const result = user.find(x => x.user_id === userId)
    return result?.lastName
  }
  const navigate = useNavigate();

  const fetchPurchase = async () => {
    const url = "http://localhost:3050/purchase"
		try {
				const response = await fetch(url);
				const json = await response.json();
        setPurchase({
          json
        })
				} catch (error) {
				console.log("error", error);
				}
	};

  const fetchCustomer = async () => {
    const url = "http://localhost:3050/customer"
		try {
      const response = await fetch(url);
      const json = await response.json();
      setCustomer(json)
      } catch (error) {
      console.log("error", error);
      }
	};

  const fetchUser = async () => {
    const url = "http://localhost:3050/user"
		try {
				const response = await fetch(url);
				const json = await response.json();
        setUser(json)
				} catch (error) {
				console.log("error", error);
				}
	};

  useEffect(() => {
    fetchUser();
    fetchPurchase();
    fetchCustomer();
  }, []);

  return (
    <Grid justifyContent={"center"} alignItems="flex-start" container item xs={12} sx={{minHeight: "95vh", "backgroundColor": "#0a0a0a",}} >
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
        <Grid container item xs={4} sx={{backgroundColor: "white",}}>
          <Typography variant="h5">Voici la liste des paiements"</Typography>
          <List sx={{ width: '100%', bgcolor: 'background.paper'}}>
          {purchase?.json?.map((p)=>(
            <ListItem>
              <ListItemText primary={formatIdToName(p.CustomerCustomerId)} secondary={`Le ${moment(p.createdAt).format("MMM Do YY")} pour un montant de ${p.amount}€`} />
            </ListItem>
          ))}
          </List>
        </Grid>
    </Grid>
  );
}