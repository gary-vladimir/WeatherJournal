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
    return fetch(`/fetchGeonames?city=${encodeURIComponent(inputCity.value)}`)
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((error) => console.log(error));
}

function fetchWeather(latitude, longitude) {
    return fetch(`/fetchWeather?lat=${latitude}&lon=${longitude}`)
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((error) => console.log(error));
}

function fetchPixabay(country) {
    return fetch(`/fetchPixabay?country=${encodeURIComponent(country)}`)
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
