require('dotenv').config();

const express = require('express');

const app = express();

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors())

const port = 5000;
app.use(express.static('.'))

const server = app.listen(port, () => { console.log(`running on localhost: ${port}`) })

const axios = require('axios');

app.get('/fetchGeonames', async (req, res) => {
    const inputCity = req.query.city; // Assuming you pass the city as a query parameter
    const url = `http://api.geonames.org/searchJSON?q=${inputCity}&maxRows=1&username=${process.env.GEONAMES_KEY}`;

    try {
        const response = await axios.get(url);
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data from GeoNames');
    }
});

app.get('/fetchWeather', async (req, res) => {
    const latitude = req.query.lat;
    const longitude = req.query.lon;
    const url = `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${process.env.WEATHERBIT_API_KEY}`;

    try {
        const response = await axios.get(url);
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data from Weatherbit');
    }
});

app.get('/fetchPixabay', async (req, res) => {
    const country = req.query.country;
    const url = `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&image_type=photo&orientation=horizontal&per_page=3&pretty=true&q=${country}`;

    try {
        const response = await axios.get(url);
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data from Pixabay');
    }
});
