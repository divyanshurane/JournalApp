// const style = {color:"red",backgroundColor:"Beige",border:"1px solid red",width:"200px",height:"200px"};

// export default function JournalCard({props}){

//     return(
//         <div className="card" style={style}>
//             <h2>title : </h2>
//             <p>content : </p>
//         </div>
//     )
// }

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent>
      <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
        Word of the Day
      </Typography>
      <Typography variant="h5" component="div">
        Title : 
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>Date</Typography>
      <Typography variant="body2">
        Content : 
        <br />
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Edit</Button>
      <Button size="small">Delete</Button>      
    </CardActions>
  </React.Fragment>
);

export default function OutlinedCard() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}
