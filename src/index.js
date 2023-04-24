let now = new Date();
let dateElement = document.querySelector(".today-date");
dateElement.innerHTML = formatDate(now);

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
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

  document.querySelector(".today-temp").innerHTML =
    Math.round(response.data.main.temp) + "°C";

  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector("#forecast").innerHTML = response.data.weather[0].main;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector(".daily-forecast");

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      `
      <div class="row">
              <div class="col-md-6">
                <div class="card">
                  <div class="card-header">${formatDay(forecastDay.dt)}</div>
                  <div class="card-body">
                    <img
                      src="https://openweathermap.org/img/wn/${
                        forecastDay.weather[0].icon
                      }@2x.png"
                      alt=" "
                    />
                    <br />
                    <span class="max"> ${Math.round(
                      forecastDay.temp.max
                    )}°</span>
                    <span class="min">${Math.round(
                      forecastDay.temp.min
                    )}°</span>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="card">
                  <div class="card-header">${formatDay(forecastDay.dt)}</div>
                  <div class="card-body">
                    <img
                      src="https://openweathermap.org/img/wn/${
                        forecastDay.weather[0].icon
                      }@2x.png"
                      alt=" "
                    />
                    <br />
                    <span class="max">${Math.round(
                      forecastDay.temp.max
                    )}°</span>
                    <span class="min">${Math.round(
                      forecastDay.temp.min
                    )}°</span>
                  </div>
                </div>
              </div>
              <div class="row mt-4">
                <div class="col-md-6">
                  <div class="card">
                    <div class="card-header">${formatDay(forecastDay.dt)}</div>
                    <div class="card-body">
                      <img
                        src="https://openweathermap.org/img/wn/${
                          forecastDay.weather[0].icon
                        }@2x.png"
                        alt=" "
                      />
                      <br />
                      <span class="max">${Math.round(
                        forecastDay.temp.max
                      )}°</span>
                      <span class="min">${Math.round(
                        forecastDay.temp.min
                      )}°</span>
                    </div>
                  </div>
                </div>
                
                  <div class="col-md-6">
                  <div class="card">
                    <div class="card-header">${formatDay(forecastDay.dt)}</div>
                    <div class="card-body">
                      <img
                        src="https://openweathermap.org/img/wn/${
                          forecastDay.weather[0].icon
                        }@2x.png"
                        alt=" "
                      />
                      <br />
                      <span class="max">${Math.round(
                        forecastDay.temp.max
                      )}°</span>
                      <span class="min">${Math.round(
                        forecastDay.temp.min
                      )}°</span>
                    </div>
                  </div>
                
              </div>
              <div class="row mt-4">
                <div class="col-md-12">
                <div class="card">
                  <div class="card-header">${formatDay(forecastDay.dt)}</div>
                  <div class="card-body">
                    <img
                      src="https://openweathermap.org/img/wn/${
                        forecastDay.weather[0].icon
                      }@2x.png"
                      alt=" "
                    />
                    <br />
                    <span class="max">${Math.round(
                      forecastDay.temp.max
                    )}°</span>
                    <span class="min">${Math.round(
                      forecastDay.temp.min
                    )}°</span>
                  </div>
                </div>
              </div>
        </div>
  `;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

function searchCity(city) {
  let apiKey = "bd0c4ab33b8b99c1e91a7e40227990d7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function toSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "bd0c4ab33b8b99c1e91a7e40227990d7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let dateElem = document.querySelector(".today-date");
let currentTime = new Date();
dateElem.innerHTML = formatDate(currentTime);

let search = document.querySelector("#weather-form");
search.addEventListener("submit", toSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Amsterdam");
