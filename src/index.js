function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("input#search-input");
  let resultCity = document.querySelector("div#city");
  let inputLow = searchInput.value.toLowerCase().trim();
  resultCity.innerHTML = inputLow.charAt(0).toUpperCase() + inputLow.slice(1);

  let apiKey = "c5e8a5f5115f94296481a48e25ef2ca4";
  let units = "metric";
  let currentCity = searchInput.value;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemp);
}

let form = document.querySelector("form#weather");
form.addEventListener("submit", search);

function showTemp(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let tempElem = document.querySelector("today-temp");
  tempElem.innerHTML = `${currentTemp}`;
}