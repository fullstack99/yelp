const axios = require('axios');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.session({ secret: 'wgv-app' }));

app.use(cors());

const YELP_API_KEY =
  '6EaKQnq6qIROQLtmM7JR6rqfJBGg9TV84NytudrK31-Rmt-ghKzxeg2JkDdHE-KNw_TV2-rb7t_gaj2gzVfP4mVCZACxleDvVZhgzQ7oj7VTB_LW6ixKKF4YGYQsYXYx';
const YELP_BASE_URL = 'https://api.yelp.com/v3';
const GOOGLE_BASE_URL = 'https://maps.googleapis.com/maps/api';
const GOOGLE_API_KEY = 'AIzaSyBdgGAKaRWsISI9JcV63UYcvmIjU-S0fuc';

app.get('/business_search', async (req, res) => {
  const { term, location, limit, offset } = req.query;
  let googleData = [];
  try {
    const { data } = await axios({
      method: 'GET',
      url: `${YELP_BASE_URL}/businesses/search?term=${term}&location=${location}&limit=${limit}&offset=${offset}`,
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    });

    const names = data.businesses.map((v) => v.name);
    const actions = [];
    names.forEach((name) => {
      actions.push(
        axios({
          method: 'GET',
          url: `${GOOGLE_BASE_URL}/place/findplacefromtext/json?input=${term} ${encodeURIComponent(
            name
          )} ${location}&inputtype=textquery&fields=formatted_address,name,rating,photos,user_ratings_total&key=${GOOGLE_API_KEY}`,
        })
      );
    });
    try {
      const data = await Promise.all(actions);
      googleData = data.map((v) => v.data.candidates);
    } catch (err) {
      console.log(err);
    }

    res.status(200).send({
      yelp: data,
      google: googleData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      succcess: false,
      error: err,
    });
  }
});

const port = process.env.PORT || 8000;
app.listen(port);
console.log('The magic happens on port ' + port);
