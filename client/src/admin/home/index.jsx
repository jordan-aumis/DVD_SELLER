import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import {Grid, Typography, Paper, IconButton} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const HomeAdmin = () => {
	const navigate = useNavigate();
	const [auth, setAuth] = useState()
	const [list, setList] = useState([])
	const managerRight = ['purchase', 'customer', 'user', 'staff', 'address', 'category', 'film', ]
	const employee = ['purchase', 'customer', 'user', 'category', 'film']

	useEffect(() => {
		const auth = JSON.parse(localStorage.getItem("user"))
		if(!auth.idStaff){
			navigate('/login')
		}
		else{
			if(auth.isManager){
				setList(managerRight);
			}else{
				setList(employee);
			}
		}
  }, []);

	useEffect(() => {
		const auth = JSON.parse(localStorage.getItem("user"))
		if(!auth.idStaff){
			navigate('/login')
		}
		else{
			setAuth(auth)
		}
  }, []);

		

    return(
			<Grid
				containeh
				item
				xs={12}
				justifyContent="flex-start"
				alignItems="center"
				style={{"backgroundColor": "#0a0a0a", "height": "100%"}}
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
					<Grid
						container
						item
						xs={12}
						justifyContent="center"
						
      		>
						<Grid
							container
							item
							xs={12}
							justifyContent="space-around"
							sx={{marginTop: "5rem"}}
						>
							{list.map((bo)=>(
								<Paper style={{"backgroundColor": "#303030", "width": "30%", "marginBottom": "5rem", "height": "40vh"}} elevation={8}>
								<Link to={`/admin/${bo}`}  >
										<Grid
											container
											item
											xs={12}
											justifyContent="center"
											alignItems="center"
											style={{'height': "100%", "width": "100%"}}
										>
											<Typography
													variant="h3"
													noWrap
													color="white"
													component="div"
												>
													{bo}
											</Typography>
										</Grid>
										</Link>
								</Paper>
							))}
					</Grid>
				</Grid>
		</Grid>
    )
}
export default HomeAdmin;