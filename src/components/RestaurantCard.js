import React, { useState } from 'react'
import Card from 'components/Card/Card.js';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
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

import ListSubheader from '@material-ui/core/ListSubheader';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';



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
        width: 500,
        height: 450,
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
      }
}));

const StyledRating = withStyles({
    iconFilled: {
      color: '#616161',
    },
    iconHover: {
      color: '#ff3d47',
    },
  })(Rating);

const handleExpandClick = (e) => alert('success');


const RestaurantDetail = ({ restaurant, stateOpenDetail }) => {
    const classesTheme = useStylesTheme();
  
    return (
      <Modal
        open={stateOpenDetail.openDetail}
        onClose={() => stateOpenDetail.setOpenDetail(false)}
        className={classesTheme.modal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
         <GridList cellHeight={220} className={classesTheme.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            <ListSubheader component="div">December</ListSubheader>
          </GridListTile>
          {restaurant.image.map(img => (
            <GridListTile key={img}>
              <img src={require(`assets/img/${img}.jpg`)} alt={img} />
              <GridListTileBar
                title={img}
                subtitle={<span>by: {img}</span>}
                actionIcon={
                  <IconButton aria-label={`info about ${img}`} className={classesTheme.icon}>
                    <InfoIcon />
                  </IconButton>
                }
              />
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

    if (restaurant == null) {
        return null;
    }

    const handleChange = id => event => {
      stateCheckState.checkSelection(restaurant.id)
    };

    const handleOpen = () => {
      setOpenDetail(true);
    };

    return (
        <GridItem xs={12}>
        <Card className={classes.card}>
                <CardMedia
                    className={classes.cover}
                    image={restaurant.image_url}
                    title="Mid Kitchen Photo"
                />
                <div className={classes.inColumns}>
                    <CardContent className={classes.content}>
                        <Typography
                            component="h5"
                            variant="h5"
                            style={{ cursor: 'pointer' }}
                            onClick={handleExpandClick}
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
                           {/*  <StyledRating
                                value={restaurant.price.length}
                                icon={<AttachMoneyIcon />}
                                max={restaurant.price.length}
                                size="small"
                                readOnly
                            /> */}
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
        </GridItem>
  );
};

export default RestaurantCard