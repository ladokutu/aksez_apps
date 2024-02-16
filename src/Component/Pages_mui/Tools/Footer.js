import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';


export default function Footer(props) {
  
  return (
    <Box  sx={{ position: 'fixed',bottom: 0,  left: 0, right: 0}}>
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
		  {'Copyright © '}
		  <Link color="inherit" href="https://aksez.ladokutu.info">
			Ladokutu Info
		  </Link>{' '}
		  {new Date().getFullYear()}
		  {'.'}
		</Typography>
    </Box >
  );
}
