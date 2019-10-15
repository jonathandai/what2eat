import React, { useState, useEffect } from 'react';
// react plugin for creating charts
// @material-ui/core
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
// @material-ui/icons
import axios from 'axios';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';

import initialCuisineSelection from '../Events/Events'

// const rest = [
//   {
//     id: 1,
//     name: "Mid Kitchen",
//     cuisine: ["Breakfast & Brunch", "Vegan"],
//     location: "1512 Sherman Ave",
//     price: 2,
//     description: "",
//     rating: 4.5,
//     review: 51,
//     comment: "",
//     image: ["Mid_Kitchen_1"]
//   },
//   {
//     id: 2,
//     name: "Kabul House",
//     cuisine: ["Afghan", "Halal", "Seafood"],
//     location: "2424 Dempster St",
//     price: 3,
//     description: "",
//     rating: 4.5,
//     review: 899,
//     comment: "",
//     image: ["Kabul_House_1", "Kabul_House_2"]
//   },
//   {
//     id: 3,
//     name: "Blind Faith Cafe",
//     cuisine: ["Vegetarian", "Vegan", "Gluten-Free"],
//     location: "525 Dempster St",
//     price: 2,
//     description: "",
//     rating: 3.5,
//     review: 597,
//     comment: "",
//     image: ["Blind_Faith_Cafe_1", "Blind_Faith_Cafe_2"]
//   }
// ];

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

export default function Dashboard() {
  const [ restaurants, setRestaurants ] = useState(defaultRest);
  const [ refresh, setRefresh ] = useState(false);
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
		}
	}));
	const StyledRating = withStyles({
		iconFilled: {
			color: '#616161'
		},
		iconHover: {
			color: '#ff3d47'
		}
	})(Rating);

	const handleExpandClick = (e) => alert('success');

	const Restaurant = ({ restaurant }) => {
		const classes = useStyles();
		const classesTheme = useStylesTheme();

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
								<StyledRating
									value={restaurant.price}
									icon={<AttachMoneyIcon />}
									max={restaurant.price}
									size="small"
									readOnly
								/>

								<div className={classesTheme.leftMargin}>
									<Typography variant="subtitle1" color="textSecondary">
										{restaurant.categories.map((food) => <li>{food.title}</li>)}
									</Typography>
								</div>
							</div>
						</CardContent>
						<div className={classes.centerAlign}>
							<Button
								variant="contained"
								color="primary"
								size="large"
								className={classesTheme.spaceMargin}
							>
								<CheckIcon className={classesTheme.rightMargin} />
								Eat Here
							</Button>
							<Button
								variant="contained"
								color="default"
								size="large"
								className={classesTheme.spaceMargin}
							>
								Not this time
							</Button>
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

	const config = {
		headers: { Authorization: 'Bearer API key' },
		params: {
			term: 'tacos',
			location: 'main 123st'
		}
  };
  
  const rec = [
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
  
  const apiKey =
		'bWKtDZgaFdt5Zq-srgXTP_nLbhQuHA4kNw0Y8tH0GOIB8bCJsK2KgAW0epvwAhu6YJUD9CN-VG-96IOUhD9sHm_t69ZpPR_HoLnEeXgAdv_IZ-mtX67a4ftZK8GkXXYx';

  useEffect(() => {
    console.log(initialCuisineSelection)
    // getRestaurantsFromApi = (locationSearched) => {
		//UI feedback to tell the user when we are retrieving infromation from the API
		// this.setState({ loading: true })

		//using a proxy server cors-anywhere to get rid of the CROS probblem
		//SUPER HOT TIP: passing the location variable, which equals to the user's input (see below). Instead of grabbbing the entire API, it will only retrieve the restaurants that are closed to the lcoation information we entered. This makes the lodading wayyyyyyy faster.
		axios
			.get(
				// `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?location=${'locationSearched'}`,
				`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?location=Evanston`,
				{
					//required authorization format from API
					headers: {
						//to get the API from the .env file use process.env.{variable name}
						Authorization: `Bearer ${apiKey}`
						// Authorization: `Bearer ${process.env.YELP_API_KEY}`
						// Authorization: `Bearer ${process.env.YELP_CLIENT_ID}`
					},
					//option params passed to API call to retrieve only breakfast and lunch spots
					params: {
						categories: 'chinese'
					}
				}
			)
			// axios.get('https://api.yelp.com/v3/businesses/search', config)
			// .then(response => console.log(response));

			.then((res) => {
				console.log(res.data.businesses);
				setRestaurants(res.data.businesses);
				// rec = res.data.businesses
			})
			.catch((err) => {
				//fire the errorState message if there is no information return from the API
				// this.setState({
        // console.log(rec);
				console.log('Error');
				// 	errorState: `Sorry we coudln't find information related to the location you search, do you want to try something else?`,
				// 	loading: false
				// });
			});
	// };
  }, [refresh]);

	return (
    <div>
    <Button onClick={()=>setRefresh(!refresh)}>Refresh List</Button>
		 <GridContainer>
		   { restaurants.map(restaurant =>
		      <Restaurant key={ restaurant.id } restaurant={ restaurant }
		      />)
		   }
		 </GridContainer>
     </div>
	);
}
