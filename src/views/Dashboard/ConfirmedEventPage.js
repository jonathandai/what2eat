import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red, green } from '@material-ui/core/colors';
import LinkIcon from '@material-ui/icons/Link';
import Button from '@material-ui/core/Button';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  card: {
    width: '900px',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  root: {
    flexGrow: 1,
  },
}));

export default function ConfirmedEventCard({ confirmedRestaurant, confirmedTime }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid container className={classes.root}>
        <Grid item xs={12}>
        <Grid container justify="center" >
            <Card className={classes.card}>
            <CardHeader 
                avatar={
                    <CheckCircleOutlineIcon  style={{ fontSize: 30, color: "#8BC34A" }}/>
                }
        
                title="Your Event is Confirmed!"
            />
            <CardMedia
                className={classes.media}
                image={ confirmedRestaurant.image_url }
                title={ confirmedRestaurant.id }
            />
            <CardContent>
             <Typography variant="h5" component="h2">
                { confirmedRestaurant.name }
            </Typography>
            <Typography variant="subtitle1" component="p">
                {  "Time: ".concat(confirmedTime[0]) }
            </Typography>
            <Typography variant="subtitle1" component="p">
                {  "Address: ".concat(confirmedRestaurant.location.address1).concat(", ").concat(confirmedRestaurant.location.city).concat(", ").concat(confirmedRestaurant.location.state) }
            </Typography>
        </CardContent>
        <CardActions >  
            <LinkIcon />
            <Button 
                onClick={()=> window.open(confirmedRestaurant.url, "_blank")}
                size="small" 
                color="primary"
            >
                More Info
            </Button>   
        </CardActions>
   
        </Card>
        </Grid>
    </Grid>
    </Grid>
  );
}
