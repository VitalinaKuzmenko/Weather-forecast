let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    temp: -5,
    humidity: 20,
  },
};

let city = prompt("Enter a city").toLowerCase();
let exists3 = weather.hasOwnProperty(city);

let cityName = city[0].toUpperCase() + city.substring(1);

if (exists3) {
  let tempInC = Math.round(weather[city].temp);
  let tempInF = Math.round((weather[city].temp * 9) / 5 + 32);

  alert(
    `It is currently ${tempInC} °C (${tempInF}°F) in ${cityName} with a humidity of ${weather[city].humidity}%`
  );
} else {
  alert(
    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
  );
}
