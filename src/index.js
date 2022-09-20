function citySearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;
  let citySearch = cityInput.value;
  let nameResult = document.querySelector("h2");
  nameResult.innerHTML = `${city}`;
  let apiKey = `c95d60a1e3adbeb286133f1ebebc2579`;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(getTemp);
}

let nameChange = document.querySelector("#search-form");
nameChange.addEventListener("submit", citySearch);

function getTemp(response) {
  let mainTemp = Math.round(response.data.main.temp);
  let tempToday = document.querySelector("#temp-display");
  tempToday.innerHTML = `${mainTemp}`;
  let description = document.querySelector("h4");
  description.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#current-humidity");
  humidity.innerHTML = response.data.main.humidity;
  let windSpeed = document.querySelector("#current-speed");
  windSpeed.innerHTML = response.data.wind.speed;
  let iconElement = document.querySelector("#currenticon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

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
