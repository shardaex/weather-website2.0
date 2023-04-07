function formatDate(date) {
  let hours = date.GetHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.GetMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.GetDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector(".today-temp").innerHTML = Match.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchCity(city) {
  let apiKey = "c5e8a5f5115f94296481a48e25ef2ca4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function submit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "c5e8a5f5115f94296481a48e25ef2ca4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function toFahrenheit(event) {
  event.preventDefault();
  let tempElem = document.querySelector(".today-temp");
  tempElem.innerHTML = 66;
}

function toCelcius(event) {
  event.preventDefault();
  let tempElem = document.querySelector(".today-temp");
  tempElem.innerHTML = 19;
}

let dateElem = document.querySelector(".today-date");
let currentTime = new Date();
dateElem.innerHTML = formatDate(currentTime);

let search = document.querySelector("#weather-form");
search.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
