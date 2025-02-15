// =============== DOM Elements for Today's Weather ===============

// Get elements for current weather display
const locationCurrent = document.getElementById("locationCurrent");
const tempToday = document.getElementById("tempToday");

const imageCondition = document.getElementById("imageCondition");

const todayConditionDes = document.getElementById("todayConditionDes");

const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const windDirection = document.getElementById("windDirection");

const searchInput = document.getElementById("searchInput");

// ===================== DOM Elements for Next Days' Weather =====================


// These elements display the forecast for the next two days
const maxTemNext = document.getElementsByClassName("temNextMax");
const minTemNext = document.getElementsByClassName("temNextMin");

const imgCondNext = document.getElementsByClassName("nextConditionImg");

const descConditionNext = document.getElementsByClassName("descNextDay");



const todayStr = document.getElementById("todayStr");

const todayNum = document.getElementById("todayDate");

const nextDayStr = document.getElementsByClassName("nextdayStr");

//fetch data

async function getWeatherData(cityName) {
    // Build the API URL using the provided city name. Note: The URL includes a fixed key and a days parameter.

  const weatherResponse = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=268cb2a7489f449c8af162325241907&q=${cityName}07112&days=3`
  );
  const weatherData = await weatherResponse.json();
  return weatherData;
}

// ===================== Display Today's Weather Data =====================
function displayData(data) {
  const date = new Date();

  // Update the current day name and date
  todayStr.innerHTML = date.toLocaleDateString("en-Us", { weekday: "long" });
  todayNum.innerHTML =
    date.getDate() + date.toLocaleDateString("en-Us", { month: "long" });

  // Display weather details
  locationCurrent.innerHTML = data.location.name;
  tempToday.innerHTML = data.current.temp_c;
  imageCondition.setAttribute("src", data.current.condition.icon);
  todayConditionDes.innerHTML = data.current.condition.text;
  humidity.innerHTML = data.current.humidity + "%";
  wind.innerHTML = data.current.wind_kph + "km/g";
  windDirection.innerHTML = data.current.wind_dir;
}

// ===================== Display Next Days' Weather Data =====================
function displayNextDay(data) {
  const forecastData = data.forecast.forecastday;

    // Loop through the next two days (i = 0 and 1 correspond to day 2 and day 3)
  for (let i = 0; i < 2; i++) {
    let nextDate = new Date(forecastData[i + 1].date);

   // Set the weekday name for the forecast day
    nextDayStr[i].innerHTML = nextDate.toLocaleDateString("en-Us", {
      weekday: "long",
    });

    // Update temperature, icon, and condition text for the forecast
    maxTemNext[i].innerHTML = forecastData[i + 1].day.maxtemp_c;
    minTemNext[i].innerHTML = forecastData[i + 1].day.mintemp_c;
    imgCondNext[i].setAttribute("src", forecastData[i + 1].day.condition.icon);
    descConditionNext[i].innerHTML = forecastData[i + 1].day.condition.text;
  }
}

//// ===================== Application Starter =====================
async function startApp(city = "aswan") {
  let weatherData = await getWeatherData(city);
  displayData(weatherData);
  displayNextDay(weatherData);
}

// Start the application with the default city
startApp();

// Listen for changes in the search input field and fetch weather data accordingly
searchInput.addEventListener("input", function () {
  startApp(searchInput.value);
});
