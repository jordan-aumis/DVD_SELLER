import React, {useEffect, useState} from 'react';
import { CardActions, Button, Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import { useGlobalContext } from '../../../../context'
 const ActionAreaCard = (props) => {
   const  { title, content, image, price} = props;

	const { setItem } = useGlobalContext()

   const handleCart = () =>{
		const oldData = JSON.parse(localStorage.getItem('cart')) || [];

		let findDup = oldData.find( data => data['title'] === title );
		if(findDup){
			var index = oldData.indexOf(findDup);
			
			oldData[index] = {title: title, quantity: findDup.quantity += 1, price: findDup.quantity * Number(price)};

		}
		else{
			oldData.push({title: title, quantity: 1, price: Number(price)});
		}
		localStorage.setItem("cart", JSON.stringify(oldData));
		setItem(oldData)
  }

  return (
    <Card sx={{ width: 200, "backgroundColor": "#303030", Height: "400px", mr: "2rem" }}>
      <CardMedia
        component="img"
        height="140"
        image={image || "https://img.huffingtonpost.com/asset/5d2f24083b00004b00daca92.jpeg?cache=jnqZSqOeQV&ops=scalefit_720_noupscale"}
        alt="green iguana"
      />
      <Grid item container xs={12}>
        <CardContent sx={{borderTopColor: 'white',  height:"100px"}}>
            <Typography gutterBottom variant="h5" component="div" color={"white"}>
            {title}
            </Typography>
            <Typography variant="body2" color="white">
            {content}
            </Typography>
        </CardContent>
      </Grid>
      <Grid item container xs={12} justifyContent="center">
        <CardActions>
            <Button sx={{color: "white", borderBlockColor: "white"}} variant="outlined" size="small" onClick={()=>handleCart()}>Ajouter au Panier</Button>
        </CardActions>
      </Grid>
    </Card>
  );
}

export default ActionAreaCard;