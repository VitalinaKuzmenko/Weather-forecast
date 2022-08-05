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

showCurrentTime();
showCurrentDate();

//showing temperature, city, humidity, wind
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempy = document.querySelector("#temperature");
  tempy.innerHTML = temperature;

  let wind = Math.round(response.data.wind.speed);
  let windy = document.querySelector("#wind");
  windy.innerHTML = wind;

  let humidity = response.data.main.humidity;
  let humy = document.querySelector("#humidity");
  humy.innerHTML = humidity;

  let description = response.data.weather[0].description;
  let weatherText = document.querySelector(".weather_text");
  weatherText.innerHTML = description;

  //checking if we have to change city for current place
  let city = document.querySelector("#input").value;
  console.log("the city before: " + city);
  city = "";
  console.log("the city after: " + city);
  if (city === "" && city.length === 0) {
    console.log("the city inside " + city);
    console.log("hm" + response.data.name);
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

let searchButton = document.querySelector("#submit-button");
searchButton.addEventListener("click", changeData);

let searchCurrentPlaceButton = document.querySelector("#current-place-button");
searchCurrentPlaceButton.addEventListener("click", showDataOfCurrentPlace);
