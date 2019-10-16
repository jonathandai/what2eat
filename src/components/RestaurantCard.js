import React from 'react'
import Card from 'components/Card/Card.js';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
import GridItem from 'components/Grid/GridItem.js';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';




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


const handleExpandClick = (e) => alert('success');

const StyledRating = withStyles({
    iconFilled: {
        color: '#616161'
    },
    iconHover: {
        color: '#ff3d47'
    }
})(Rating);


const RestaurantCard = ({ restaurant }) => {
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

export default RestaurantCard