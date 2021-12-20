//Current Date & Time
let currentTime = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

let currentYear = currentTime.getFullYear();
let currentDay = days[currentTime.getDay()];
let currentDate = currentTime.getDate();
let currentMonth = months[currentTime.getMonth()];
let currentHour = ("0" + currentTime.getHours()).slice(-2);
let currentMinutes = ("0" + currentTime.getMinutes()).slice(-2);

let dateTime = document.querySelector("#display-date-time");
dateTime.innerHTML = `${currentDay}, ${currentMonth} ${currentDate} ${currentYear}, ${currentHour}:${currentMinutes}`;

//Search Location
function showLocation(cityName) {
  console.log(cityName);
  let units = "imperial";
  let apiKey = "6eb0baa2cd02434f0f744ae325ff5602";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  console.log();
  let temperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("#temperature");
  h1.innerHTML = `${temperature}`;
}

function searchCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#inputLocation").value;
  showLocation(cityName);
}

let searchForm = document.querySelector("#new-city-form");
searchForm.addEventListener("submit", searchCity);

function search(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#inputLocation");
  let replaceCity = document.querySelector("#replaceLocation");
  replaceCity.innerHTML = inputCity.value;
}

let form = document.querySelector("#new-city-form");
form.addEventListener("submit", search);

//Current Location
function currentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "6eb0baa2cd02434f0f744ae325ff5602";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(currentTemperature);
}

function currentTemperature(response) {
  console.log();
  let currentTemp = Math.round(response.data.main.temp);
  let currentCity = response.data.name;
  let replaceLocation = document.querySelector("#replaceLocation");
  replaceLocation.innerHTML = `${currentCity}`;
  let replaceTemp = document.querySelector("#temperature");
  replaceTemp.innerHTML = `${currentTemp}`;
}

function geoLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let button = document.querySelector("#currentLocation");
button.addEventListener("click", geoLocation);

//Change °F|°C
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temp = temperatureElement.innerHTML;
  temp = Number(temp);
  temperatureElement.innerHTML = Math.round((temp * 9) / 5 + 32);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temp = temperatureElement.innerHTML;
  temp = Number(temp);
  temperatureElement.innerHTML = Math.round(((temp - 32) * 5) / 9);
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
