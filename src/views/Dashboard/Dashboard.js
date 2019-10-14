import React from "react";
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
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';

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

const Restaurant = ({ restaurant }) => {
  const classes = useStyles();
  const classesTheme = useStylesTheme();

  return (
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
            onClick={handleExpandClick}>
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
            <Button
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
            </Button>
          </div>
        </div>
        <div className={classes.rightAlign}>
        <CardContent className={classes.rightAlign}>
          <Typography variant="body1" color="textSecondary" justifyContent="flex-end">
            { restaurant.location }
          </Typography>

          </CardContent>
        </div>
      </Card>
    </GridItem>
  );
};

export default function Dashboard() {  
  return (
   <GridContainer>
     { restaurants.map(restaurant =>
        <Restaurant key={ restaurant.id } restaurant={ restaurant }
        />)
     }
     
   </GridContainer>

  );
}
