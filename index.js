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

//function for formation day of Day for Section4. It is forecast for 5 days.
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

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

//showing temperature in Celsius
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

  //checking coordianates for section 3 & 4.
  let coordinates = response.data.coord;
  changeSection4(coordinates);
  changeSection3(coordinates);
}

//changing data in section 4
function changeSection4(coordinates) {
  let apiKey = "ce8a5720a4218dbb8ae301a6c1f4ec3e";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displaySection4);
}

//changing data in section 3. Daytime and Nightime forecast
function changeSection3(coordinates) {
  let apiKey = "ce8a5720a4218dbb8ae301a6c1f4ec3e";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displaySection3);
}

function displaySection3(response) {
  let dayTime = document.querySelector("#day_temperature");
  let nightTime = document.querySelector("#night_temperature");
  dayTimeTemperature = Math.round(response.data.daily[0].temp.day);
  nightTimeTemperature = Math.round(response.data.daily[0].temp.night);
  dayTime.innerHTML = dayTimeTemperature;
  nightTime.innerHTML = nightTimeTemperature;

  //changing description in section 3
  let day24 = response.data.hourly;
  let dayDescription = document.querySelector("#day-description");
  let nightDescription = document.querySelector("#night-description");
  let dayPicture = document.querySelector("#day_icon");
  let nightPicture = document.querySelector("#night_icon");

  //changing picture and description of section 3
  for (var i = 0; i < 24; i++) {
    let date = new Date(day24[i].dt * 1000);
    let hour = date.getHours();
    if (hour === 12) {
      dayDescription.innerHTML = day24[i].weather[0].description;
      dayPicture.setAttribute(
        "src",
        `media/color/${day24[i].weather[0].icon}.png`
      );
    }
    if (hour === 22) {
      nightDescription.innerHTML = day24[i].weather[0].description;
      nightPicture.setAttribute(
        "src",
        `media/color/${day24[i].weather[0].icon}.png`
      );
    }
  }
}

//displaying section 4. It is 5 days forecast.
function displaySection4(response) {
  let forecastDaily = response.data.daily;
  let forecastElement = document.querySelector(".section_4");
  let forecastHTML = "";

  forecastDaily.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="day">
          <p>${formatDay(forecastDay.dt)}</p>
          <img class="small_icon" src="media/color/${
            forecastDay.weather[0].icon
          }.png" alt="Sunny" />
          <p>+${Math.round(forecastDay.temp.max)}°C +${Math.round(
          forecastDay.temp.min
        )}°C</p>
        </div>`;
    }
  });
  forecastElement.innerHTML = forecastHTML;
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
