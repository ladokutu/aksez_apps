import * as React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function UnderConstruction() {
  return (
	<Grid container justifyContent="center" spacing={2} >
		 <Grid item xs={8}>
			<Card center >
			  <CardMedia
				sx={{ height: 300 }}
				image="https://www.creativefabrica.com/wp-content/uploads/2021/11/11/Under-construction-website-page-Border-Graphics-20032780-1-1-580x387.jpg"
				title="Under Construction"
			  />
			  <CardContent>
				<Typography gutterBottom variant="h5" component="div">
				 Under Construction
				</Typography>
				<Typography variant="body2" color="text.secondary">
				  this page is under construction
				</Typography>
			  </CardContent>
			  <CardActions>
				<Button size="small">Share</Button>
				<Button size="small">Learn More</Button>
			  </CardActions>
			</Card>
		</Grid>
	</Grid>
  );
}