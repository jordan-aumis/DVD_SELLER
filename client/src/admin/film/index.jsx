import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import {Grid, Typography, Paper, IconButton} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const FilmCrud = () => {
	const navigate = useNavigate();
	const crud = ['Create', 'Modify' ]

    return(
			<Grid
				container
				item
				xs={12}
				justifyContent="flex-start"
				alignItems="center"
				style={{"backgroundColor": "#0a0a0a", "height": "95vh"}}
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
								<Paper style={{"backgroundColor": "#303030", "width": "40%", "marginBottom": "5rem", "height": "40vh"}} elevation={8}>
								<Link to={`/admin/film/create`}  >
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
                        CREER
                    </Typography>
                  </Grid>
                  </Link>
              </Paper>
              <Paper style={{"backgroundColor": "#303030", "width": "40%", "marginBottom": "5rem", "height": "40vh"}} elevation={8}>
								<Link to={`/admin/film/modify`}  >
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
													Modifier
											</Typography>
										</Grid>
										</Link>
								</Paper>
					</Grid>
				</Grid>
		</Grid>
    )
}
export default FilmCrud;