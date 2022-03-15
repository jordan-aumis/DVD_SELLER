import React, { useEffect, useState } from "react"
import { Link,  useParams, useNavigate} from "react-router-dom";
import { useGlobalContext } from '../context'
import {Grid, Typography, Paper, IconButton} from '@mui/material';

const Paid = () => {
	const {id} = useParams()
  const [user, setUser] = useState([])
  const [auth, setAuth] = useState()
	const [price, setPrice] = useState(0);
	const { item, setItem, removeLocalStorage } = useGlobalContext();
  const tva = 0.15 * price
  const shippingFee = 4.99


  const navigate = useNavigate();
	const fetchUser = async (id) => {
    const url = "http://localhost:3050/user/"+id
		try {
				const response = await fetch(url);
				const json = await response.json();
        if(!json.AddressAddressId){
          navigate('/address')
        }
        setUser({
          ...user,
          address_id: json.AddressAddressId
        })
				} catch (error) {
				console.log("error", error);
				}
	};

  const updateStock = (quantity, id) =>{
    const option = {
      method: 'PATCH',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        stock: 20-1,
      })
    }
  
    const url = `http://localhost:3050/film/${id}/update`
    fetch(url, option).then((response)=> {return response.json()})
        .then((data)=>{
          if(data){
           console.log("DATA")
          }
        })
  }

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

  const fetchCustomer = async (id) => {
    const url = "http://localhost:3050/customer/byUserId/"+id
		try {
				const response = await fetch(url);
				const json = await response.json();
        setUser(
          {
          ...user,
          customer_id: json.customer_id
        })
				} catch (error) {
				console.log("error", error);
				}
	};


  const purchase = () =>{
    const option = {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        amount: price + tva + shippingFee,
        purchaseDate: new Date(),
        CustomerCustomerId: user.customer_id
      })
    }
  
    const url = "http://localhost:3050/purchase/new"
    fetch(url, option).then((response)=> {return response.json()})
        .then((data)=>{
          setTimeout(() => {
            navigate('/')
          }, 5000);
        })
  }

  useEffect(() => {
    const totalPrice = [];
    item.map((i)=>{
      totalPrice.push(i.quantity * i.price)
      updateStock(i.quantity, i.film_id)
    })
    setPrice(
      totalPrice.reduce((a, b) => a + b, 0)
    )
    const connected = localStorage.getItem("user")
    setAuth(JSON.parse(connected));
    fetchUser(JSON.parse(connected).idUser)
    fetchCustomer(JSON.parse(connected).idUser)
    if(!connected){
      navigate('/login')
    }
  }, []);

  useEffect(()=>{
    if(user.customer_id !== undefined){
      purchase();
      removeLocalStorage();
    }
  }, [user.customer_id])

  useEffect(()=>{
    if(user.address_id){
      fetchAddress(user.address_id);
    }
    
  }, [user.address_id])

    return(
			<Grid
				container
				item
				xs={12}
				justifyContent="center"
				alignItems="flex-start"
			>
				<Typography variant="h3">Merci pour votre achat !</Typography>
          <Grid
            container
            item
            xs={12}
            justifyContent="center"
            sx={{ml: 5, mt: 5}}
          >
            <Typography variant="h5">il vous sera livré bientôt par La Poste au {user.address}, {user.postalCode}, {user.city}</Typography>
          </Grid>
			</Grid>
    )
}

export default Paid;