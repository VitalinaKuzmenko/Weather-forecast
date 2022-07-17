//function for showing time => 15:29
function showCurrentTime() {
  let currentTime = new Date();
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  let time = `${hours}:${minutes}`;

  let timeInSite = document.querySelector("#time");
  timeInSite.innerHTML = time;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

//function for adding zero to month  1 => 01
function checkZero(number) {
  number = number.toString();
  while (number.length < 2) number = "0" + number;
  return number;
}

//function for showing date => Sunday, 17.07.2022
function showCurrentDate() {
  let currentTime = new Date();
  let day = days[currentTime.getDay()];
  let number = currentTime.getDate();
  let month = currentTime.getMonth() + 1;
  let year = currentTime.getFullYear();
  let numberOfMonth;

  month = checkZero(month);

  let fullDate = document.querySelector("#date");
  fullDate.innerHTML = `${day}, ${number}.${month}.${year}`;
}

showCurrentTime();
showCurrentDate();

//changing city
function changeCity(event) {
  event.preventDefault();
  let cityForChange = document.querySelector("#city");
  let city = document.querySelector("#input").value;
  cityForChange.innerHTML = city;
}

let searchButton = document.querySelector("#submit-button");
searchButton.addEventListener("click", changeCity);

//changing temperature
function showFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  let temperature1 = parseFloat(temperature.textContent);
  if (temperature1 === 15) {
    let changedTemperature = temperature1 * 1.8 + 32;
    temperature.innerHTML = changedTemperature;
  }
}

function showCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  let temperature1 = parseFloat(temperature.textContent);
  if (temperature1 !== 15) {
    let changedTemperature = (temperature1 - 32) / 1.8;
    temperature.innerHTML = changedTemperature;
  }
}

let unit1 = document.querySelector("#celsius");
unit1.addEventListener("click", showCelsius);

let unit2 = document.querySelector("#fahrenheit");
unit2.addEventListener("click", showFahrenheit);
