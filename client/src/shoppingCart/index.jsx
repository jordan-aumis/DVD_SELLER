import React, { useEffect, useState } from "react"
import { Link, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import {Grid, Typography, Paper, TextField, } from '@mui/material';
import CartCard from '../style/theme/muiComponent/cartCard/'
import { useGlobalContext } from '../context'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const ShoppingCart = () => {
	const { item, setItem } = useGlobalContext();
	const [price, setPrice] = useState(0);
  const navigate = useNavigate();

	const handleAddItem = (item) =>{
		const oldData = JSON.parse(localStorage.getItem('cart')) || [];

		let findDup = oldData.find( data => data['title'] === item.title );
		if(findDup){
			var index = oldData.indexOf(findDup);
			
			oldData[index] = {title: item.title, quantity: item.quantity += 1, price: Number(item.price)};

		}
		localStorage.setItem("cart", JSON.stringify(oldData));
		setItem(oldData)
	}

	const handleRemoveItem = (item) =>{
		const oldData = JSON.parse(localStorage.getItem('cart')) || [];

		let findDup = oldData.find( data => data['title'] === item.title );
		if(findDup && item.quantity > 1){
			var index = oldData.indexOf(findDup);
			
			oldData[index] = {title: item.title, quantity: item.quantity -= 1,  price: Number(item.price)};

		}
		localStorage.setItem("cart", JSON.stringify(oldData));
		setItem(oldData)
	}

	const handleRemoveAllItem = (item) =>{
		const oldData = JSON.parse(localStorage.getItem('cart')) || [];
		let findDup = oldData.find( data => data['title'] === item.title );
		if(findDup){
			const index = oldData.indexOf(findDup);
			oldData.splice(index, 1);
			localStorage.setItem("cart", JSON.stringify(oldData));
			setItem(oldData)
		}
	}

		useEffect(() => {
			const totalPrice = [];
			item.map((i)=>{
				totalPrice.push(i.quantity * i.price)
			})
			setPrice(
				totalPrice.reduce((a, b) => a + b, 0)
			)
    }, [item]);

    return(
			<Grid
				container
				item
				xs={12}
				justifyContent="space-between"
				alignItems="center"
				style={{"backgroundColor": "#0a0a0a", "height": "100%", "minHeight": "100vh", padding: "5rem"}}
			>
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
			{
				item.length > 0 ? (
					<>
					<Grid
					container
					item
					xs={5}
				>
					{item?.map((i)=>(
						<Grid sx={{ height: "12vh", backgroundColor: "#303030", mb: 1.5, padding: 2}} item
								xs={12} justifyContent="space-between"  container alignItems={"center"} > 
								<Grid container item xs={3} justifyContent="flex-start">
									<Typography variant="h5" color="white">
										{i.title}
									</Typography>
								</Grid>
								<Grid container item xs={3} justifyContent="flex-start">
									<IconButton
										size="small"
										edge="start"
										color="secondary"
										aria-label="remove item"
										onClick={()=>handleRemoveItem(i)}
									>
										<RemoveCircleIcon />
									</IconButton>
									<Typography variant="h6" color="white">
										{i.quantity}
									</Typography>
									<IconButton
										size="small"
										edge="start"
										color="secondary"
										aria-label="add item"
										onClick={()=>handleAddItem(i)}
									>
										<AddCircleIcon />
									</IconButton>
								</Grid>
								<Grid container item xs={3} justifyContent="flex-start">
									<IconButton
										size="large"
										edge="start"
										color="secondary"
										aria-label="remove item"
										onClick={()=>handleRemoveAllItem(i)}
									>
										<DeleteRoundedIcon size="large" />
									</IconButton>
								</Grid>
							<Typography variant="h6" color="white">
								{(i.price * i.quantity).toFixed(2)}€
							</Typography>
						</Grid>
					))}
				</Grid>
				<Grid
					container
					item
					xs={6}
					justifyContent="flex-start"
				>
					<CartCard price={price} />
				</Grid>
				</>
				) :
				(
					<Typography variant="h2" color="white">
							Panier Vide
					</Typography>
				)
			}
				
			</Grid>
    )
}

export default ShoppingCart;