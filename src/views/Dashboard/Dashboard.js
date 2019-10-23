import React, { useState } from "react";
// react plugin for creating charts
// @material-ui/core
import { makeStyles} from '@material-ui/core/styles';
// @material-ui/icons
import axios from 'axios';
import Button from '@material-ui/core/Button';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Tasks from "components/Tasks/Tasks.js";
import TextField from '@material-ui/core/TextField';
import DollarSign from "@material-ui/icons/AttachMoney";
import RestaurantCard from '../../components/RestaurantCard.js'
import RestaurantIcon from "@material-ui/icons/Restaurant";
import LocationIcon from "@material-ui/icons/MyLocation";
import Grid from "@material-ui/core/Grid";

import TimeSelectionPage from "./TimeSelectionPage";


export const apiKey =
		'bWKtDZgaFdt5Zq-srgXTP_nLbhQuHA4kNw0Y8tH0GOIB8bCJsK2KgAW0epvwAhu6YJUD9CN-VG-96IOUhD9sHm_t69ZpPR_HoLnEeXgAdv_IZ-mtX67a4ftZK8GkXXYx';

const CuisineList = [
  "Pizza","Chinese","Mexican","Burgers", "Thai", "Seafood", "Italian", "Steakhouse", "Korean", "Japanese",
  "Sandwiches", "Breakfast", "Vietnamese", "Vegetarian", "Sushi Bars", "American",
]
const PriceList = [
  "$","$$","$$$","$$$$"
]

const useStylesTheme = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(3),
  }
}));

export default function Dashboard() {
    const [ restaurants, setRestaurants ] = useState();
    
    const [cuisineSelection, setCuisineSelection] = useState([]);
    const [location, setLocation] = useState("");
    const [priceSelection, setPriceSelection] = useState([]);

    const handleCuisineChange = (newCuisinesIndex) => {
      setCuisineSelection(newCuisinesIndex);
    }

    const handlePriceRangeChange = (newPriceRangeIndex) => {
      setPriceSelection(newPriceRangeIndex)
    }
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const handleRecommendationClick = () => {
    const cuisines = cuisineSelection.map(i=>CuisineList[i]);
    const categories = cuisines.map(cuisine=>cuisine.toLowerCase()).join();
    console.log('categories', categories)
    
    const prices = priceSelection.map(i=>PriceList[i]);
    const dollarsigns = prices.map(str=>str.length).join();
    console.log('dollarsigns', dollarsigns)
    axios.get(
      `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?location=${location.toLowerCase()}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`
        },
        params: {
          categories: categories,
          price:dollarsigns
        }
      }
    )
    .then((res) => {
      console.log("response",res.data.businesses);
      setRestaurants(res.data.businesses);
    })
    .catch((err) => {
      console.log('Error',err);
    });
  }

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

  const [checkState, checkSelection] = useCheckSelection([]);
  const classesTheme = useStylesTheme();

  const [restaurantHours, setRestaurantHours] = useState();
  const [openTimeSelection, setOpenTimeSelection] = useState(false);



  const handleOpen = () => {
    /* if(checkState == null)
 */
    axios.get(
      `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/${checkState[0]}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`
        }
      }
    )
    .then((res) => {
      console.log("response",res.data.hours);
      setRestaurantHours(res.data.hours);
    })
    .catch((err) => {
      console.log('Error',err);
    });
    setOpenTimeSelection(true);
  };



	return (
    <div>
      <TimeSelectionPage restaurantHours={ restaurantHours } stateOpenTimeSelection={ { openTimeSelection, setOpenTimeSelection } } />
		  <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <CustomTabs
        title="Creating New Event"
        headerColor="primary"
        tabs={[
          {
            tabName: "Cuisine",
            tabIcon: RestaurantIcon,
            tabContent: (
              <Tasks
                checkedIndexes={cuisineSelection}
                tasksIndexes={[0, 1, 2, 3, 4, 5, 6]}
                tasks={CuisineList}
                onChange={handleCuisineChange}
              />
            )
          },
          {
            tabName: "Location",
            tabIcon: LocationIcon,
            tabContent: (
                <TextField fullWidth 
                variant="outlined" 
                label="Input Location" 
                onChange={(event)=>{setLocation(event.target.value)}}
                defaultValue={location}/>
            )
          },
          {
            tabName: "Price",
            tabIcon: DollarSign,
            tabContent: (
              <Tasks
                checkedIndexes={priceSelection}
                tasksIndexes={[0,1,2,3]}
                tasks={PriceList}
                onChange={handlePriceRangeChange}
              />
            )
          }
        ]}
      />
      </GridItem>
      <GridItem xs={12} sm={6} md={6}>
        <Button onClick={handleRecommendationClick} className={classes.button} type="button" >Get Your Recommendations</Button>
      </GridItem>
      <Grid container spacing={3}>
    { restaurants && restaurants.slice(0,4).map(restaurant =>
      <RestaurantCard key={ restaurant.id } restaurant={ restaurant } stateCheckState = { { checkState, checkSelection } }
      />)
    }
    </Grid>
      {restaurants ? <Button 
         variant="contained" 
         className={classesTheme.button}
         color= "secondary"
         style={{maxWidth: '180px', maxHeight: '70px', minWidth: '180px', minHeight: '70px', fontSize: '20px'}}
         onClick={handleOpen}
        >
          Submit
        </Button>: null   } 
		 </GridContainer>
     </div>
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
           /*  export default function Dashboard() {  
              const [checkState, checkSelection] = useCheckSelection([]);
              const classes = useStyles();
              const classesTheme = useStylesTheme();
              return (
               <GridContainer>
                 { restaurants.map(restaurant =>
                    <Restaurant key={ restaurant.id } restaurant={ restaurant } stateCheckState = { { checkState, checkSelection } }
                    />)
                 }
                 
               </GridContainer>
              );
            }; */