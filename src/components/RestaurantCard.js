import React, { useState } from 'react'
import Card from 'components/Card/Card.js';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
import GridItem from 'components/Grid/GridItem.js';
import Rating from '@material-ui/lab/Rating';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import Modal from '@material-ui/core/Modal';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import GridContainer from './Grid/GridContainer';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from "@material-ui/core/Grid";

import ListSubheader from '@material-ui/core/ListSubheader';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import {apiKey} from '../views/Dashboard/Dashboard'
import axios from 'axios';




const useStyles = makeStyles(styles);
const useStylesTheme = makeStyles((theme) => ({
    spaceMargin: {
        margin: theme.spacing(2)
    },
    rightMargin: {
        marginRight: theme.spacing.unit
    },
    leftMargin: {
        marginLeft: theme.spacing.unit
    },
    gridList: {
        width: 700,
        height: 500,
        transform: 'translateZ(0)'
      },
      modal: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
      },
      icon: {
        color: 'rgba(255, 255, 255, 0.54)',
      },
      button: {
        margin: theme.spacing(3),
      },
      root: {
        padding: theme.spacing(3, 2),
      },
      paper: {
        padding: theme.spacing(2),
        margin: "auto",
        maxWidth: 900
      },
}));

const StyledRating = withStyles({
    iconFilled: {
      color: '#616161',
    },
    iconHover: {
      color: '#ff3d47',
    },
  })(Rating);

/* const handleExpandClick = e => (restaurant, setOpenDetail) => {
  setOpenDetail(true);
  
}; */


const RestaurantDetail = ({ restaurantDetails, restaurantReviews, stateOpenDetail }) => {
    const classesTheme = useStylesTheme();
  
    return (
      <Modal
        open={stateOpenDetail.openDetail}
        onClose={() => stateOpenDetail.setOpenDetail(false)}
        className={classesTheme.modal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        
      >
         <GridList className={classesTheme.gridList}>
          <GridListTile key="Header" cols={2} style={{ height: 'auto' }}>
            <ListSubheader component="div">{restaurantDetails.name}</ListSubheader>
          </GridListTile>
          {restaurantDetails.photos && restaurantDetails.photos.map(img => (
            <GridListTile key={img}>
              <img src={img} alt={'img'} />
              <GridListTileBar
                title={restaurantDetails.name}
                subtitle={<span>by: {restaurantDetails.name}</span>}
                actionIcon={
                  <IconButton aria-label={`info about ${img}`} className={classesTheme.icon}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
          {restaurantReviews && restaurantReviews.map(r => (
            <GridListTile key={r.user.name}>
            <Paper className={classesTheme.root}>
              <Typography variant="h5" component="h3">
                { r.user.name }
              </Typography>
              <Typography component="p">
                { r.text }
              </Typography>
            </Paper>
            </GridListTile>
          ))}
        </GridList>
      </Modal>
    );
}


const RestaurantCard = ({ restaurant, stateCheckState }) => {
    
    const classes = useStyles();
    const classesTheme = useStylesTheme();
    const [openDetail, setOpenDetail] = useState(false);
    const [restaurantDetails, setRestaurantDtails] = useState();
    const [restaurantReviews, setRestaurantReviews] = useState();

    if (restaurant == null) {
        return null;
    }

    const handleChange = id => event => {
      stateCheckState.checkSelection(restaurant.id)
    };

    const handleOpen = () => {
      axios.get(
        `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/${restaurant.id}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`
          }
        }
      )
      .then((res) => {
        console.log("response",res.data);
        setRestaurantDtails(res.data);
      })
      .catch((err) => {
        console.log('Error',err);
      });
      axios.get(
        `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/${restaurant.id}/reviews`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`
          }
        }
      )
      .then((res) => {
        console.log("response",res.data.reviews);
        setRestaurantReviews(res.data.reviews);
      })
      .catch((err) => {
        console.log('Error',err);
      });
      setOpenDetail(true);
    };

    return (
      <Grid item xs={12} sm={12} md={12}>
       {restaurantDetails && <RestaurantDetail restaurantDetails ={ restaurantDetails } restaurantReviews={ restaurantReviews } stateOpenDetail = { { openDetail, setOpenDetail } } />}
       
        <div className={classes.root}>
          <Paper className={classesTheme.paper}>
            <Grid container spacing={1}>
              <Grid item>
                <ButtonBase className={classes.image}>
                  <img
                    width="280" height="280"
                    alt="complex"
                    src={ restaurant.image_url }
                  />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom 
                    variant="h5"
                    style={{ cursor: 'pointer' }}
                    onClick={handleOpen}
                    >
                      { restaurant.name }
                    </Typography>
                    <div className={classes.inRows}>
                      <Rating name="half-rating" value={restaurant.rating} precision={0.5} readOnly />
                      <Typography variant="body1" gutterBottom>
                      {restaurant.review_count} reviews
                      </Typography>
                    </div>
                    <div className={classes.inRows}>
                      <StyledRating
                        value={restaurant.price.length}
                        icon={<AttachMoneyIcon />}
                        max={restaurant.price.length}
                        size="small"
                        readOnly
                      /> 
                      <Typography variant="subtitle1" color="textSecondary">
                         {restaurant.categories.map((food) => <li>{food.title}</li>)}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item>
                    <FormControlLabel
                        control={
                        <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="large" />}
                        checkedIcon={<CheckBoxIcon fontSize="large" />}
                        checked={stateCheckState.checkState.includes(restaurant.id)}
                        onChange={handleChange(restaurant.id)}
                        value="eat here"
                    
                        />}
                        label="EAT HERE !"
                    />
                    <FormControlLabel
                        control={
                        <Checkbox
                          icon={<CheckBoxOutlineBlankIcon fontSize="large" />}
                          checkedIcon={<CheckBoxIcon fontSize="large" />}
                          checked={!stateCheckState.checkState.includes(restaurant.id)}
                          onChange={handleChange(restaurant.id)}
                          value="NO"
                          color="primary"
                        />}
                        label="Not This Time"
                    />
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">{restaurant.location.address1}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </Grid>
  );
};

export default RestaurantCard

/*         <RestaurantDetail restaurant={ restaurant } stateOpenDetail = { { openDetail, setOpenDetail } } />
 */


 /* <GridItem xs={12} sm={12} md={12}>
        {restaurantDetails && <RestaurantDetail restaurantDetails ={ restaurantDetails } restaurantReviews={ restaurantReviews } stateOpenDetail = { { openDetail, setOpenDetail } } />}
        <Card className={classes.card}>
                <CardMedia
                    className={classes.cover}
                    image={restaurant.image_url}
                    title="Photo"
                />
                <div className={classes.inColumns}>
                    <CardContent className={classes.content}>
                        <Typography
                            component="h5"
                            variant="h5"
                            style={{ cursor: 'pointer' }}
                            onClick={handleOpen}
                        >
                            {restaurant.name}
                        </Typography>
                        <div className={classes.inRows}>
                            <Rating name="half-rating" value={restaurant.rating} precision={0.5} readOnly />
                            <div className={classesTheme.leftMargin}>
                                <Typography variant="body1" color="textSecondary">
                                    {restaurant.review} reviews
                                </Typography>
                            </div>
                        </div>
                        <div className={classes.inRows}>
                          
                            <Typography variant="subtitle1" color="textSecondary">
                                    {restaurant.price}
                                </Typography>
                            <div className={classesTheme.leftMargin}>
                                <Typography variant="subtitle1" color="textSecondary">
                                    {restaurant.categories.map((food) => <li>{food.title}</li>)}
                                </Typography>
                            </div>
                        </div>
                    </CardContent>
                    <div className={classes.centerAlign}>
                    <FormGroup row>
                      <FormControlLabel
                        control={
                        <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="large" />}
                        checkedIcon={<CheckBoxIcon fontSize="large" />}
                        checked={stateCheckState.checkState.includes(restaurant.id)}
                        onChange={handleChange(restaurant.id)}
                        value="eat here"
                    
                        />}
                        label="EAT HERE !"
                      />
                      <FormControlLabel
                        control={
                        <Checkbox
                          icon={<CheckBoxOutlineBlankIcon fontSize="large" />}
                          checkedIcon={<CheckBoxIcon fontSize="large" />}
                          checked={!stateCheckState.checkState.includes(restaurant.id)}
                          onChange={handleChange(restaurant.id)}
                          value="NO"
                          color="primary"
                        />}
                        label="Not This Time"
                      />
                    </FormGroup>
                    </div>
                </div>
                <div className={classes.rightAlign}>
                    <CardContent>
                        <Typography variant="body1" color="textSecondary" justifyContent="flex-end">
                            {restaurant.location.address1}
                        </Typography>
                    </CardContent>
                </div>
            </Card>
        </GridItem> */