//today
let locationCurrent = document.getElementById('locationCurrent');
let tempToday  = document.getElementById('tempToday');

let imageCondation = document.getElementById('imageCondation');

let todayCondationDes = document.getElementById('todayCondationDes');

let humidity = document.getElementById('humidity');
let wind =  document.getElementById('wind');
windDirection =  document.getElementById('windDirection');

let searchInput =  document.getElementById('searchInput');

//next day

let maxTemNext = document.getElementsByClassName('temNextMax');
let minTemNext = document.getElementsByClassName('temNextMin');

let imgCondNext= document.getElementsByClassName('nextConditionImg'); 

let descConditionNext= document.getElementsByClassName('descNextDay');  

let todayStr = document.getElementById('todayStr');

let todayNum = document.getElementById('todayDate');

let nextDayStr= document.getElementsByClassName('nextdayStr');

//fetch data

async function getWeatherData(cityName) {
  let weatherRespose =  await fetch(`https://api.weatherapi.com/v1/forecast.json?key=268cb2a7489f449c8af162325241907&q=${cityName}07112&days=3` );

  let weatherData =  await weatherRespose.json();
  return weatherData;
}


//display today data
function displayData(data) {
  let date = new Date();
  todayStr.innerHTML= date.toLocaleDateString('en-Us',{weekday:'long'})
  todayNum.innerHTML=date.getDate()+date.toLocaleDateString('en-Us',{month:'long'});
  locationCurrent.innerHTML = data.location.name;

  tempToday.innerHTML  = data.current.temp_c;
  imageCondation.setAttribute('src',data.current.condition.icon);
  todayCondationDes.innerHTML  = data.current.condition.text;
  humidity.innerHTML = data.current.humidity+'%';
  wind.innerHTML= data.current.wind_kph+"km/g";
  windDirection.innerHTML = data.current.wind_dir;
  
}

//display next days

function displayNextDay(data) {
  let forecastData = data.forecast.forecastday;
  for (let i = 0; i < 2; i++) {
    let nextDate = new Date(forecastData[i+1].date); 

    nextDayStr[i].innerHTML= nextDate.toLocaleDateString('en-Us',{weekday:'long'})
    // nextDayNum.innerHTML=nextDate.getDate()+nextDate.toLocaleDateString('en-Us',{month:'long'});
    // locationCurrent.innerHTML = nextDate.location.name;



    maxTemNext[i].innerHTML = forecastData[i+1].day.maxtemp_c;
    minTemNext[i].innerHTML =forecastData[i+1].day.mintemp_c;
    imgCondNext[i].setAttribute('src',forecastData[i+1].day.condition.icon);
    descConditionNext[i].innerHTML = forecastData[i+1].day.condition.text;
  }
  
}


//start 

async function startApp(city = "aswan" ) {


  let weatherData = await getWeatherData(city);
   displayData(weatherData) ;
    displayNextDay(weatherData);
  
}

startApp();

//search city 
searchInput.addEventListener('input',function () {
  startApp(searchInput.value);

})