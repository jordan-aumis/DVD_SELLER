import React, { useEffect, useState } from "react"
import { Link,  useParams, useNavigate} from "react-router-dom";
import {Grid, Typography, Paper, IconButton} from '@mui/material';
import ActionAreaCard from '../style/theme/muiComponent/card/index'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const Films = () => {
	const {id} = useParams()
  const [films, setFilms] = useState([])
  const navigate = useNavigate();

	const url = "http://localhost:3050/film/byCategory/"+id
	const fetchData = async () => {
		try {
				const response = await fetch(url);
				const json = await response.json();
				setFilms(json)
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
				justifyContent="center"
				alignItems="flex-start"
				style={{"backgroundColor": "#0a0a0a", "height": "100%", "minHeight": "95vh"}}
			>
				<Grid
					container
					item
					xs={12}
					sx={{ ml: "5rem", mt: "5rem"}}
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
				{films.map((film)=>(
					<ActionAreaCard title={film.title} content={film.description} price={film.replacement_cost}/>
				))}
			</Grid>
    )
}

export default Films;