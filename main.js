//Написать выбор города из списка
// написать функцию для сброса
// кнопка поиска для перехода к попап
//улучшить апи, убрать все лишнее
//Локальное хранение
// восход и заход солнца

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

window.addEventListener("load", () => {
  if (window.localStorage.length) {
    dataWeather = JSON.parse(window.localStorage.getItem("dataWeather"));
    renderComponents(dataWeather);
  }
});

let API_KEY = "";
let url = new URL("https://api.openweathermap.org/data/2.5/weather");
url.searchParams.set("q", `${dataWeather.titleOfCity}`);
url.searchParams.set("appid", `${API_KEY}`);
url.searchParams.set("lang", "ru");
url.searchParams.set("units", "metric");
let urlNow = url;

const btnGetweather = document.getElementById("popup__btn");
const popupInput = document.querySelector(".popup__input");
btnGetweather.addEventListener("click", () => {
  dataWeather = {
    ...dataWeather,
    titleOfCity: popupInput.value,
  };
  url.searchParams.set("q", `${dataWeather.titleOfCity}`);
  getData(urlNow);
});
popupInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    dataWeather = {
      ...dataWeather,
      titleOfCity: event.target.value,
    };
    url.searchParams.set("q", `${dataWeather.titleOfCity}`);
    getData(urlNow);
  }
});
// fetch(
//   `https://api.openweathermap.org/data/2.5/forecast?q=${dataWeather.titleOfCity}&lang=ru&units=metric&appid=${API_KEY}`
// )
//   .then((result) => result.json())
//   .then((data) => {
//     console.log(data);
//   });

function getCorrectingValueOfPressure(pressure) {
  return Math.round(pressure * 0.75006);
}
function getCorrectingValueOfTemp(temp) {
  return Math.round(temp);
}
function toUpperCaseFirstSimbol(str) {
  return str[0].toUpperCase() + str.slice(1);
}

function renderComponents(weather) {
  let weatherHTML = `<div class="container">
  <button class="search">Выбрать город</button>
  <header class="top">
    <h2 class="top__name-city">${weather.titleOfCity}</h2>
    <p class="top__description">${toUpperCaseFirstSimbol(
      weather.weatherDescription
    )}</p>
    <img src="https://openweathermap.org/img/wn/${
      dataWeather.icon
    }.png" alt="" />
    <div class="top__current-temp">${getCorrectingValueOfTemp(
      weather.temp
    )}°</div>
  </header>
  <main class="weather">
    <div class="wrapper">
      <div class="feelsLike">
        <p class="feelsLike__text">Ощущается как</p>
        <p class="feelsLike__data">${getCorrectingValueOfTemp(
          weather.feelsLike
        )}°</p>
      </div>
      <div class="pressure">
        <p class="pressure__text">Давление</p>
        <p class="pressure__data">${getCorrectingValueOfPressure(
          weather.pressure
        )}мм рт ст</p>
      </div>
      <div class="humidity">
        <p class="humidity__text">Влажность</p>
        <p class="humidity__data">${weather.humidity}%</p>
      </div>
      <div class="wind-speed">
        <p class="wind-speed__text">Ветер</p>
        <p class="wind-speed__data">${getCorrectingValueOfTemp(
          weather.windSpeed
        )}м/с</p>
      </div>
      
    </div>
  </main>
</div>`;
  const appWeather = document.querySelector(".app");
  appWeather.insertAdjacentHTML("beforeend", weatherHTML);
}

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
    weather: [{ description: weatherDescription, icon }],
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
    icon,
    windSpeed,
  };
  // console.log(dataWeather);
  renderComponents(dataWeather);
  // console.log(new Date(dataWeather.sunrise));
  window.localStorage.removeItem("dataWeather");
  window.localStorage.setItem("dataWeather", JSON.stringify(dataWeather));
};
