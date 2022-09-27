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
}

function citySearch(city) {
  let apiKey = `c95d60a1e3adbeb286133f1ebebc2579`;
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

function showForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
              <div class="col-2">
                <div class="forecast-date">${day}</div>
                <img
                  src="http://openweathermap.org/img/wn/10d@2x.png"
                  alt=""
                  width="42"
                />
                <div class="forecast-temperatures">
                  <span class="forecast-temperature-max">18°</span>
                  <span class="forecast-temperature-min">12°</span>
                </div>
              </div>
                  
    `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

citySearch("Atlanta");
showForecast();
