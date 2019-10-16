import React, { useEffect, useState } from "react";
// react plugin for creating charts
// @material-ui/core
import { makeStyles} from '@material-ui/core/styles';
// @material-ui/icons
import axios from 'axios';
import Button from '@material-ui/core/Button';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";


import Card from "components/Card/Card.js";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from '@material-ui/core/CardMedia';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Tasks from "components/Tasks/Tasks.js";
import TextField from '@material-ui/core/TextField';
import DollarSign from "@material-ui/icons/AttachMoney";
import RestaurantCard from '../../components/RestaurantCard.js'
import RestaurantIcon from "@material-ui/icons/Restaurant";
import LocationIcon from "@material-ui/icons/MyLocation";

const apiKey =
		'bWKtDZgaFdt5Zq-srgXTP_nLbhQuHA4kNw0Y8tH0GOIB8bCJsK2KgAW0epvwAhu6YJUD9CN-VG-96IOUhD9sHm_t69ZpPR_HoLnEeXgAdv_IZ-mtX67a4ftZK8GkXXYx';

const defaultRest = [
  {
    id: "",
    alias: "",
    prices:"",
    location: "",
    image_url:"",
    rating: 0, 
    categories: [
      {
        alias: "",
        title: ""
      }
    ]
  }
]

const CuisineList = [
  "Pizza","Chinese","Mexican","Burgers", "Thai", "Seafood", "Italian", "Steakhouse", "Korean", "Japanese",
  "Sandwiches", "Breakfast", "Vietnamese", "Vegetarian", "Sushi Bars", "American",
]
const PriceList = [
  "$","$$","$$$","$$$$"
]

export default function Dashboard() {
    const [ restaurants, setRestaurants ] = useState(defaultRest);
    
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
	return (
    <div>
		 <GridContainer>
     <GridItem xs={6} sm={6} md={6}>
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
                tasksIndexes={[0, 1, 2, 3,4,5,6]}
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
      <GridItem xs={6} sm={6} md={6}>
        <Button onClick={handleRecommendationClick} className={classes.button} type="button" >Get Your Recommendations</Button>
      </GridItem>
    { restaurants.slice(0,4).map(restaurant =>
      <RestaurantCard key={ restaurant.id } restaurant={ restaurant }
      />)
    }   
		 </GridContainer>
     </div>
	);
}
