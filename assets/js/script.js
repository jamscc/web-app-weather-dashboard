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