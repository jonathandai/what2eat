import React, { useEffect, useState } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons

import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import Rating from '@material-ui/lab/Rating';
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import Modal from '@material-ui/core/Modal';
import InfoIcon from '@material-ui/icons/Info';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Card from "components/Card/Card.js";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const restaurants = [
  {
    id: 1,
    name: "Mid Kitchen",
    cuisine: ["Breakfast & Brunch", "Vegan"],
    location: "1512 Sherman Ave",
    price: 2,
    description: "",
    rating: 4.5,
    review: 51,
    comment: "",
    image: ["Mid_Kitchen_1"]
  },
  {
    id: 2,
    name: "Kabul House",
    cuisine: ["Afghan", "Halal", "Seafood"],
    location: "2424 Dempster St",
    price: 3,
    description: "",
    rating: 4.5,
    review: 899,
    comment: "",
    image: ["Kabul_House_1", "Kabul_House_2"]
  },
  {
    id: 3,
    name: "Blind Faith Cafe",
    cuisine: ["Vegetarian", "Vegan", "Gluten-Free"],
    location: "525 Dempster St",
    price: 2,
    description: "",
    rating: 3.5,
    review: 597,
    comment: "",
    image: ["Blind_Faith_Cafe_1", "Blind_Faith_Cafe_2"]
  }
];

const useStyles = makeStyles(styles);

const useStylesTheme = makeStyles(theme => ({
  spaceMargin: {
    margin: theme.spacing(2),
  },
  rightMargin: {
    marginRight: theme.spacing.unit,
  },
  leftMargin: {
    marginLeft: theme.spacing.unit,
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



const handleExpandClick = (e) => (
  alert("success")
);

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
       <GridList cellHeight={280} className={classesTheme.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">December</ListSubheader>
        </GridListTile>
        {restaurant.image.map(img => (
          <GridListTile key={img}>
            <img src={require(`assets/img/${img}.jpg`)} alt={img} />
            <GridListTileBar
              title={img}
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



const Restaurant = ({ restaurant, stateCheckState }) => {
  const classes = useStyles();
  const classesTheme = useStylesTheme();
  const [openDetail, setOpenDetail] = useState(false);

  const handleChange = id => event => {
    stateCheckState.checkSelection(restaurant.id)
  };

  const handleOpen = () => {
    setOpenDetail(true);
  };

  return (
  <React.Fragment>
   <RestaurantDetail restaurant={ restaurant } 
    stateOpenDetail={ { openDetail, setOpenDetail } }/>
    <GridItem xs={12}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cover}
          image={require(`assets/img/${restaurant.image[0]}.jpg`)}
          title="Mid Kitchen Photo"
        />
        <div className={classes.inColumns}>
          <CardContent className={classes.content}>
            <Typography 
            component="h5" 
            variant="h5" 
            style={{ cursor: 'pointer' }}
            onClick={handleOpen}>
              { restaurant.name }
            </Typography>
            <div className={classes.inRows}>
              <Rating name="half-rating" value={ restaurant.rating  } precision={0.5} readOnly />
              <div className={classesTheme.leftMargin}>
                <Typography variant="body1" color="textSecondary">
                  { restaurant.review } reviews
                </Typography>
              </div>
              </div>
              <div className={classes.inRows}>
              <StyledRating 
                value={ restaurant.price }
                icon={<AttachMoneyIcon />}
                max = { restaurant.price }
                size = "small"
                readOnly />
              
              <div className={classesTheme.leftMargin}>
                <Typography variant="subtitle1" color="textSecondary">
                  { restaurant.cuisine.map(food => <li >{ food }</li>) }
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
            { restaurant.location }
          </Typography>

          </CardContent>
        </div>
      </Card>
    </GridItem>
  </React.Fragment>
  );
};

const useCheckSelection = () => {
  const [checkState, setCheckList] = useState([]);
  const checkSelection = (id) => {
    if(checkState.includes(id))
      setCheckList(checkState.filter(i => i !== id));
    else
      setCheckList([id].concat(checkState.filter(i => false)));
    //setCheckList(checkState.includes(id) ? checkState.filter(i => i !== id) : [id].concat(checkState))
  };
  return [ checkState, checkSelection ];
};

export default function Dashboard() {  
  const [checkState, checkSelection] = useCheckSelection([]);
  const classes = useStyles();
  const classesTheme = useStylesTheme();
  return (
   <GridContainer>
     { restaurants.map(restaurant =>
        <Restaurant key={ restaurant.id } restaurant={ restaurant } stateCheckState = { { checkState, checkSelection } }
        />)
     }
      <Button 
      variant="contained" 
      className={classesTheme.button}
      color= "secondary"
      style={{maxWidth: '180px', maxHeight: '70px', minWidth: '180px', minHeight: '70px', fontSize: '20px'}}
      onClick={ ()=>alert('success!') }
      >
        Submit
      </Button>
   </GridContainer>
  

  );
}


/* <Button
              variant="contained"
              color="primary"
              size = "large"
              className={classesTheme.spaceMargin}
            >
              <CheckIcon className={classesTheme.rightMargin}/>
                Eat Here
            </Button>
            <Button
              variant="contained"
              color="default"
              size = "large"
              className={classesTheme.spaceMargin}
            >
              Not this time
            </Button> */