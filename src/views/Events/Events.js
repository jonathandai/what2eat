import React, {useState} from "react";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Tasks from "components/Tasks/Tasks.js";
import TextField from '@material-ui/core/TextField';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";


// @material-ui/icons
import Restaurant from "@material-ui/icons/Restaurant";
import Location from "@material-ui/icons/MyLocation";
import DollarSign from "@material-ui/icons/AttachMoney";


const CuisineList = [
    "Pizza","Chinese","Mexican","Burgers", "Thai", "Seafood", "Italian", "Steakhouse", "Korean", "Japanese",
    "Sandwiches", "Breakfast", "Vietnamese", "Vegetarian", "Sushi Bars", "American",
]
const PriceList = [
    "$","$$","$$$","$$$$","$$$$$"
]


const styles = {
    button:{
        marginTop:20,
    },
   
}

const useStyles = makeStyles(styles);

export default function Events() {
    const classes = useStyles();

    const initialCuisineSelection = []
    const initialPriceSelection = []
    
    const [cuisines, setCuisines]  = useState(initialCuisineSelection.map(i=>CuisineList[i]))
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState(initialPriceSelection.map(i=>PriceList[i]))


    const handleCuisineChange = (newCuisinesIndex) => {
        setCuisines(newCuisinesIndex.map(i=>CuisineList[i]));
    }

    const handlePriceRangeChange = (newPriceRangeIndex) => {
        setPrice(newPriceRangeIndex.map(i=>PriceList[i]))
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
                tabIcon: Restaurant,
                tabContent: (
                  <Tasks
                    checkedIndexes={initialCuisineSelection}
                    tasksIndexes={[0, 1, 2, 3,4,5,6,7,8,9,10,11,12,13,14,15]}
                    tasks={CuisineList}
                    onChange={handleCuisineChange}
                  />
                )
              },
              {
                tabName: "Location",
                tabIcon: Location,
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
                    checkedIndexes={initialPriceSelection}
                    tasksIndexes={[0,1,2,3,4]}
                    tasks={PriceList}
                    onChange={handlePriceRangeChange}
                  />
                )
              }
            ]}
          />
          </GridItem>
          <GridItem xs={6} sm={6} md={6} className={classes.centerGrid}>
            <Button component={Link} to='/admin/dashboard' className={classes.button} type="button" color="warning" >Get Your Recommendations</Button>
          </GridItem>
          </GridContainer>
        </div>
    )
}