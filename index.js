const submit = document.getElementById('submit');
const description = document.getElementById('description');
const temperature = document.getElementById('temperature');
const weatherIcon = document.getElementById('weatherIcon');
const inputCity = document.getElementById('inputCity');
const placeImg = document.getElementById('placeImg');

submit.addEventListener('click', main);

function main() {
    let description;
    let lat;
    let lng;
    let temperature;
    let icon;
    let image;
    let country;
    let cityName;
    fetchGeonames().then((data) => {
        lat = data.geonames[0].lat;
        lng = data.geonames[0].lng;
        country = data.geonames[0].countryName;
        cityName = data.geonames[0].name;
        fetchWeather(lat, lng).then((data) => {
            description = data.data[0].weather.description;
            temperature = data.data[0].temp;
            icon = data.data[0].weather.icon;
            fetchPixabay(country).then((data) => {
                image = data.hits[0].largeImageURL;
                render(description, temperature, icon, image, cityName);
            });
        });
    });
}

function fetchGeonames() {
    return fetch(
        `http://api.geonames.org/searchJSON?q=${inputCity.value}&maxRows=1&username=` // add your username
    )
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((error) => console.log(error));
}

function fetchWeather(latitude, longitude) {
    return fetch(
        `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=` // add your weatherbit api
    )
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((error) => console.log(error));
}

function fetchPixabay(country) {
    return fetch(
        `https://pixabay.com/api/?key=&image_type=photo&orientation=horizontal&per_page=3&pretty=true&q=${country}` // add your Pixabay key
    )
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((error) => console.log(error));
}

function render(des, temp, icon, image, cityName) {
    description.innerHTML = des + " at " + cityName;
    temperature.innerHTML = `${temp}°C`;
    weatherIcon.src = `/iconosWeather/${icon}.svg`;
    placeImg.style.backgroundImage = `url(${image})`;
}
