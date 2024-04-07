let dataWeather = {
  titleOfCity: "Москва",
  clouds: 0,
  feelsLike: 0,
  humidity: 0,
  pressure: 0,
  temp: 0,
  tempMax: 0,
  tempMin: 0,
  sunrise: 0,
  sunset: 0,
  visibility: 0,
  weatherDescription: "",
  windSpeed: 0,
};

let API_KEY = "";
let url = new URL('https://api.openweathermap.org/data/2.5/weather');
url.searchParams.set('q', `${dataWeather.titleOfCity}`)
url.searchParams.set('appid', `${API_KEY}`)
url.searchParams.set('lang', 'ru' )
url.searchParams.set('units', 'metric' )
let urlNow = url;

const btnGetweather = document.getElementById('popup__btn');
const popupInput = document.querySelector(".popup__input");
btnGetweather.addEventListener('click', ()=>{
  dataWeather ={
    ...dataWeather,
    titleOfCity: popupInput.value,
  }
  url.searchParams.set('q', `${dataWeather.titleOfCity}`)
  getData(urlNow);
})
popupInput.addEventListener("keypress", (event)=>{
  if (event.key === "Enter"){
    dataWeather ={
      ...dataWeather,
      titleOfCity: event.target.value,
    }
    url.searchParams.set('q', `${dataWeather.titleOfCity}`)
    getData(urlNow);
  }
}
)
// fetch(
//   `https://api.openweathermap.org/data/2.5/forecast?q=${dataWeather.titleOfCity}&lang=ru&units=metric&appid=${API_KEY}`
// )
//   .then((result) => result.json())
//   .then((data) => {
//     console.log(data);
//   });


function correctingValueOfPressure(){
 return Math.round(dataWeather.pressure * 0.75006)
}
function correctingValueOfCurrentTemp(){
return Math.round(dataWeather.temp)
}

function renderComponents(){
  const currentCity = document.querySelector('.top__name-city')
  currentCity.innerHTML = `${dataWeather.titleOfCity}`

  const currentDescription = document.querySelector(".top__description");
  currentDescription.innerHTML = `${dataWeather.weatherDescription}`

  const currentTemp = document.querySelector('.top__current-temp');
  currentTemp.innerHTML = `${correctingValueOfCurrentTemp()}°`;

  const currentPressure = document.querySelector(".pressure__data");
  currentPressure.innerHTML = `${correctingValueOfPressure()} мм рт ст`;

  const currentHumidity = document.querySelector('.humidity__data');
  currentHumidity.innerHTML = `${dataWeather.humidity} %`;

  const currentWindSpeed = document.querySelector('.wind-speed__data');
  currentWindSpeed.innerHTML = `${dataWeather.windSpeed} м/c`
};
const getData = async (url) => {
  const result = await fetch(url);
  const data = await result.json();
  console.log(data);

  let {
    name: titleOfCity,
    clouds: { all },
    main: {
      feels_like: feelsLike,
      humidity,
      pressure,
      temp,
      temp_max: tempMax,
      temp_min: tempMin,
    },
    sys: { sunrise, sunset },
    visibility,
    weather: [{ description: weatherDescription }],
    wind: { speed: windSpeed },
  } = data;
  dataWeather = {
    ...dataWeather,
    titleOfCity,
    clouds: all,
    feelsLike,
    humidity,
    pressure,
    temp,
    tempMax,
    tempMin,
    sunrise,
    sunset,
    visibility,
    weatherDescription,
    windSpeed,
  };
  correctingValueOfPressure()
  renderComponents()
};
