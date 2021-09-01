import React from 'react';
import { useSelector } from 'react-redux';
import {
  makeStyles,
  Typography,
  Grid,
  Paper,
  Link,
  Box,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

const GOOGLE_API_KEY = 'AIzaSyBdgGAKaRWsISI9JcV63UYcvmIjU-S0fuc';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 15,
  },
  img: {
    width: '100%',
    maxWidth: 320,
    height: 240,
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 15,
  },
  info: {
    textAlign: 'center',
    fontWeight: '600',
  },
}));

const SearchItem = ({ item, index }) => {
  const classes = useStyles();
  const { google } = useSelector((state) => state.search);

  return (
    <Grid item xs={12} key={item.id}>
      <Paper className={classes.paper}>
        <Typography className={classes.info}>
          <Link href={item.url} target="_blank">
            {item.name}
          </Link>
          : {item.location?.display_address?.join(',')}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} className={classes.item}>
            <Box>
              <Typography>
                Yelp Rating: {item.rating || 0} of 5 starts({item.review_count}{' '}
                total views)
              </Typography>
              <Rating
                value={item.rating}
                readOnly
                precision={0.1}
                name="half-rating-read"
              />
            </Box>
            {item?.image_url && (
              <img src={item.image_url} alt="img" className={classes.img} />
            )}
          </Grid>
          <Grid item xs={12} md={6} className={classes.item}>
            <Box>
              <Typography>
                Google Rating: {google[index][0]?.rating || 0} of 5 starts(
                {google[index][0]?.user_ratings_total} total views)
              </Typography>
              <Rating
                value={google[index][0]?.rating}
                readOnly
                precision={0.1}
                name="half-rating-read"
              />
            </Box>
            {google[index][0]?.photos && (
              <img
                src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${google[index][0]?.photos?.[0].photo_reference}&key=${GOOGLE_API_KEY}`}
                alt="img"
                className={classes.img}
              />
            )}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default SearchItem;
