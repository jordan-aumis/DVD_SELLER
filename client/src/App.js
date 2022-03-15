import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";

const App = () => {

  

  return (
    <Grid
      container
      item
      xs={12}
      justifyContent="center"
      alignItems="center"
      style={{"backgroundColor": "#0a0a0a", "height": "100vh"}}
    >
    <Grid
      container
      item
      xs={12}
    >
      <Typography
          variant="h3"
          noWrap
          color="white"
          component="div"
          sx={{ marginLeft: "32px"}}
        >
          Video Club
      </Typography>
    </Grid>
      <Grid
        container
        item
        xs={12}
        justifyContent="center"
        style={{"height": "45vh"}}
      >
        <Grid
          container
          item
          xs={8}
          justifyContent="space-around"
        >
            <Paper style={{"backgroundColor": "#303030", "width": "30%"}} elevation={8}>
            <Link to="/all" >
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
                    Films
                </Typography>
              </Grid>
            </Link>
            </Paper>
            <Paper style={{"backgroundColor": "#3f3f3f", "width": "30%",}} elevation={8}>
          <Link to="/categories" >
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
                    component="div"
                    color="white"
                  >
                    Categories
                </Typography>
              </Grid>
          </Link>
            </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
