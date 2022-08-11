//function for adding zero to month, hour, minute  1 => 01
function checkZero(number) {
  number = number.toString();
  while (number.length < 2) number = "0" + number;
  return number;
}

//function for showing time => 15:29
function showCurrentTime() {
  let currentTime = new Date();
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  hours = checkZero(hours);
  minutes = checkZero(minutes);
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

//function for showing date => Sunday, 17.07.2022
function showCurrentDate() {
  let currentTime = new Date();
  let day = days[currentTime.getDay()];
  let number = currentTime.getDate();
  let month = currentTime.getMonth() + 1;
  let year = currentTime.getFullYear();

  month = checkZero(month);

  let fullDate = document.querySelector("#date");
  fullDate.innerHTML = `${day}, ${number}.${month}.${year}`;
}

//showing tempreture in Fahrenheit
function showFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  let fahrenheitTemperature = Math.round(celsiusTemperature * 1.8 + 32);
  temperature.innerHTML = fahrenheitTemperature;
  //changing classes
  unitCelsius.classList.remove("active");
  unitCelsius.classList.add("non-active");
  unitFahrenheit.classList.remove("non-active");
  unitFahrenheit.classList.add("active");
  //changing units everywhere
  let allUnits = document.querySelectorAll("#unit");
  for (var i = 0; i < allUnits.length; i++) {
    allUnits[i].innerHTML = "°F";
  }
}

//showing tempreture in Celsius
function showCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
  //changing classes
  unitCelsius.classList.remove("non-active");
  unitCelsius.classList.add("active");
  unitFahrenheit.classList.remove("active");
  unitFahrenheit.classList.add("non-active");
  //changing units everywhere
  let allUnits = document.querySelectorAll("#unit");
  for (var i = 0; i < allUnits.length; i++) {
    allUnits[i].innerHTML = "°C";
  }
}

//showing temperature, city, humidity, wind
function showTemperature(response) {
  //changing classes to celsius
  unitCelsius.classList.remove("non-active");
  unitCelsius.classList.add("active");
  unitFahrenheit.classList.remove("active");
  unitFahrenheit.classList.add("non-active");

  celsiusTemperature = Math.round(response.data.main.temp);
  let tempy = document.querySelector("#temperature");
  tempy.innerHTML = celsiusTemperature;

  let wind = Math.round(response.data.wind.speed);
  let windy = document.querySelector("#wind");
  windy.innerHTML = wind;

  let humidity = response.data.main.humidity;
  let humy = document.querySelector("#humidity");
  humy.innerHTML = humidity;

  let description = response.data.weather[0].description;
  let weatherText = document.querySelector(".weather_text");
  weatherText.innerHTML = description;

  let pictureName = response.data.weather[0].icon;
  let bigIcon = document.querySelector(".big_icon");
  bigIcon.setAttribute("src", `media/color/${pictureName}.png`);
  bigIcon.setAttribute("alt", description);

  //checking if we have to change city for current place
  let city = document.querySelector("#input").value;
  city = "";
  if (city === "" && city.length === 0) {
    let cityForChange = document.querySelector("#city");
    cityForChange.innerHTML = response.data.name;
  }
}

//changing all data
function changeData(event) {
  event.preventDefault();
  let city = document.querySelector("#input").value;

  //changing temperature, city, humidity, wind
  let apiKey = "ce8a5720a4218dbb8ae301a6c1f4ec3e";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(apiURL).then(showTemperature);
}

//showing data of current place
function showDataOfCurrentPlace() {
  function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let apiKey = "ce8a5720a4218dbb8ae301a6c1f4ec3e";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

    axios.get(apiURL).then(showTemperature);
  }
  navigator.geolocation.getCurrentPosition(showPosition);
}

let celsiusTemperature = null;

let unitCelsius = document.querySelector("#celsius-link");
unitCelsius.addEventListener("click", showCelsius);

let unitFahrenheit = document.querySelector("#fahrenheit-link");
unitFahrenheit.addEventListener("click", showFahrenheit);

let searchButton = document.querySelector("#submit-button");
searchButton.addEventListener("click", changeData);

let searchCurrentPlaceButton = document.querySelector("#current-place-button");
searchCurrentPlaceButton.addEventListener("click", showDataOfCurrentPlace);

showCurrentTime();
showCurrentDate();
showDataOfCurrentPlace();
