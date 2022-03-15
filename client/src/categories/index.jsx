
import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import {Grid, Typography, Paper, IconButton} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const Categories = () => {
	const [categories, setCategories] = useState([])
	const navigate = useNavigate();
	const url = "http://localhost:3050/category/"
	const fetchData = async () => {
		try {
				const response = await fetch(url);
				const json = await response.json();
				setCategories(json)
				} catch (error) {
				console.log("error", error);
				}
	};

	useEffect(() => {
		fetchData()
	}, []);

    return(
			<Grid
				container
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
							xs={8}
							justifyContent="space-around"
							sx={{marginTop: "5rem"}}
						>
							{categories.map((category)=>(
								<Paper style={{"backgroundColor": "#303030", "width": "30%", "marginBottom": "5rem", "height": "40vh"}} elevation={8}>
								<Link to={`/category=${category.category_id}`}  >
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
													{category.name}
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
export default Categories;