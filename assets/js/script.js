// search, current weather, and forecast
// grid (Bootstrap)
var weatherSummary = $('#weather-main');
var divContainer = $('<div class="container-fluid h-100">');
var divRow = $('<div class="row no-gutters">');
weatherSummary.append(divContainer);
divContainer.append(divRow);

var divForm = $('<div class="col-12 col-md-4 pl-2 bg-dark text-white">');
var divWeatherSummary = $('<div class="col-12 col-md-8">');
divRow.append(divForm, divWeatherSummary);

var currentWeather = $('<section id="current-section" class="col text-dark">');
var forecastWeather = ($('<section class="col bg-info text-white">'));
divWeatherSummary.append(currentWeather, forecastWeather);

// for the search form and search history
var searchSection = $('<form>');
var searchLabel = $('<label>');
var searchInput = $('<input>');
var messageOutput = $('<p>'); // for error messages
var searchButton = $('<button>');
var searchHistoryContainer = $('<div>');
var searchedCitiesList = $("<ul>");
var searchedHistory = [];

divForm.append(searchSection);
searchSection.append(searchLabel, searchInput, messageOutput, searchButton, searchHistoryContainer, searchedCitiesList);

searchLabel.text('Search for a city:').attr({
    for: 'search-input',
    style: 'display: block; font-size: 1.5em; color: white'
});

searchInput.attr({
    id: 'search-input',
    type: 'text',
    placeholder: 'type here',
    style: 'display: block; width: 95%; margin-top: 2%; font-size: 1em; color: black'
});

searchButton.text('Search').attr({
    type: 'submit',
    style: 'display: block; width: 95%; margin-top: 2%; font-size: 1em; color: black'
});

searchedCitiesList.attr('style', 'color: black; margin-top: 2em; border-top: 2px solid white; padding: 0');

// for the current weather section
var sectionCurrentHeading = $('<h2>Current Weather</h2>');
var cityDateHeading = $('<p class="h4">');
var infoTemp = $('<p>');
var infoWind = $('<p>');
var infoHumidity = $('<p>');

currentWeather.append(sectionCurrentHeading, cityDateHeading, infoTemp, infoWind, infoHumidity);

// for the forecast section
var sectionForecastHeading = $('<h2>Five Day Forecast</h2>');
var divForecastDays = $('<div class="row justify-content-center">');
forecastWeather.append(sectionForecastHeading, divForecastDays);

// for search
var citySearchName;
// source of data: https://openweathermap.org/api
var keyOpenW = "4b473443b5c6795af3c6b075e5849721";

var startingDate;
var convertedTZone;

// get data
function getData() {

    messageOutput.empty();

    citySearchName = searchInput.val();

    // source: https://openweathermap.org/api
    var apiCurrentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearchName + "&units=imperial" + "&appid=" + keyOpenW;

    fetch(apiCurrentURL)
        .then((response) => {
            if (response.ok) {
                response.json().then((data) => { dataCurrentDisplay(data, citySearchName) });
            } else {
                messageOutput.text(response.statusText).attr('style', 'background: red; width: 75%');
                searchInput.val('');
                return;
            }
        })
        .catch((error) => {
            messageOutput.text(error).attr('style', 'background: red; width: 75%');
            searchInput.val('');
            return;
        });
}

// submit and get data 
searchSection.on('submit', function (event) {
    event.preventDefault();

    // if there is no input
    if (searchInput.val() == "") {
        messageOutput.text("please enter a city name").attr('style', 'background: red; width: 75%');
        return;
    };

    getData();
})

//  to display current weather info
function dataCurrentDisplay(data, citySearchName) {

    if (!data.main || !data.wind || !data) {
        messageOutput.text("Only some data / no data is available").attr('style', 'background: red; width: 75%');
        searchInput.val('');
        return;
    } else {
        searchInput.val('');

        // conversion to minutes
        var tZone = ["-14400", "-18000", "-21600", "-25200", "-36000", "-28800"];
        var conversionToMinutes = [-240, -300, -360, -420, -600, -480];
        var indexTZ;

        switch (true) {
            case (tZone.includes(data.timezone)):
                indexTZ = tZone.indexOf(data.timezone);
                convertedTZone = conversionToMinutes[indexTZ];
                break;
            default:
                tZone.push(data.timezone);
                conversionToMinutes.push(data.timezone / 60);
                indexTZ = tZone.indexOf(data.timezone);
                convertedTZone = conversionToMinutes[indexTZ];
        };

        // Moment.js
        startingDate = moment.unix(data.dt).utc().utcOffset(convertedTZone).format('MMM DD, YYYY');

        // display city name and date
        cityDateHeading.text(data.name + " | " + startingDate);

        // weather icon
        var todaysWeatherIcon = data.weather[0].icon;
        cityDateHeading.append($("<img id='today-weather-icon' src='http://openweathermap.org/img/wn/" + todaysWeatherIcon + "@2x.png'>"));

        // temperature, wind speed, and humidity
        infoTemp.text("Temperature: " + Math.round(data.main.temp) + "\u2109");
        infoWind.text("Wind Speed: " + Math.round(data.wind.speed) + " MPH");
        infoHumidity.text("Humidity: " + Math.round(data.main.humidity) + "%");
    };
}