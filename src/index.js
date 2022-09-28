let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[now.getDay()];
let currentYear = now.getFullYear();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let currentMonth = months[now.getMonth()];
let date = now.getDate();
let hours = now.getHours();
let amPm;

if (hours >= 0 && hours <= 12) {
  amPm = "AM";
} else {
  amPm = "PM";
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}

if (hours > 12) {
  hours = hours - 12;
} else if (hours == 0) {
  hours = 12;
}

function displayDate() {
  let today = document.querySelector("#current-date");
  today.innerHTML = `${currentDay}, ${currentMonth} ${date}, ${currentYear}`;
}

function displayTime() {
  let todaysTime = document.querySelector("#current-time");
  todaysTime.innerHTML = `${hours}:${minutes} ${amPm}`;
}

displayDate();
displayTime();

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return weekdays[day];
}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col-2">
                <div class="forecast-date">${formatDay(forecastDay.dt)}</div>
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  width="42"
                />
                <div class="forecast-temperatures">
                  <span class="forecast-temperature-max">${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                  <span class="forecast-temperature-min">${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                </div>
              </div>
                  
    `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getDailyForecast(coordinates) {
  let apiKey = `7746bdeabca928cfedcad71e52fd9d66`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showForecast);
}

function getTemp(response) {
  let mainTemp = Math.round(response.data.main.temp);
  let nameResult = document.querySelector("h2");

  let tempToday = document.querySelector("#temp-display");
  let description = document.querySelector("h4");
  let humidity = document.querySelector("#current-humidity");
  let windSpeed = document.querySelector("#current-speed");
  let iconElement = document.querySelector("#currenticon");

  celsiusTemperature = response.data.main.temp;

  nameResult.innerHTML = response.data.name;
  tempToday.innerHTML = `${mainTemp}`;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = response.data.wind.speed;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getDailyForecast(response.data.coord);
}

function citySearch(city) {
  let apiKey = `7746bdeabca928cfedcad71e52fd9d66`;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(getTemp);
}
function citySubmit(event) {
  event.preventDefault();
  let cityEntered = document.querySelector("#city-input");
  citySearch(cityEntered.value);
}

let controlForm = document.querySelector("#search-form");
controlForm.addEventListener("submit", citySubmit);

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-display");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temp-display");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

citySearch("Atlanta");
