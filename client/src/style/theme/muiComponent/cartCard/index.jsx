import * as React from 'react';
import {Grid, Typography, Box, Card, CardActions , CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';




export default function CartCard(props) {
  const {price} = props
  const tva = 0.15 * price
  const shippingFee = 4.99

  const navigate = useNavigate();

  const card = (
    <React.Fragment>
      <CardContent sx={{ height: "50vh"}}>
      <Grid container sx={{ mb: 3 }} justifyContent="center">
        <Typography variant="h3">
          Panier
        </Typography>
      </Grid>
      <Grid container sx={{ mb: 1.5 }} justifyContent="space-between">
        <Typography variant="h4" >
          Prix HT:
        </Typography>
        <Typography variant="h4">
          {price}€
        </Typography>
      </Grid>
      <Grid container sx={{ mb: 1.5 }} justifyContent="space-between">
        <Typography variant="h4" >
          TVA:
        </Typography>
        <Typography variant="h4">
          {tva.toFixed(2)}€
        </Typography>
      </Grid>
      <Grid container sx={{ mb: 1.5 }} justifyContent="space-between">
        <Typography variant="h4" >
          Frais de port :
        </Typography>
        <Typography variant="h4">
          {price < 100 ? shippingFee+"€" : "Gratuit"}
        </Typography>
      </Grid>
      <Grid container sx={{ mb: 1.5 }} justifyContent="space-between">
        <Typography variant="h4" >
          Total à payer :
        </Typography>
        <Typography variant="h4">
          {(tva + price + (price < 100 ? shippingFee : 0)).toFixed(2)}
        </Typography>
      </Grid>
      </CardContent>
      <CardActions>
        <Grid justifyContent="center" container item xs={12}>
          <Button variant="contained" size="medium" onClick={()=>{navigate('/paid')}} >Payez Maintenant !</Button>
        </Grid>
      </CardActions>
    </React.Fragment>
  );

  return (
    <Box sx={{ width: "80%"}}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}