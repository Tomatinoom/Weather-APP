//Написать выбор города из списка
//улучшить апи, убрать все лишнее
// восход и заход солнца
//рефакторинг рендера
// дата в углу страницы

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

window.addEventListener("DOMContentLoaded", () => {
  if (window.localStorage.length) {
    dataWeather = JSON.parse(window.localStorage.getItem("dataWeather"));
    renderComponents(dataWeather);
    loader.classList.remove("loader--active");
    togglePopup();
  }
});

let API_KEY = "";
let url = new URL("https://api.openweathermap.org/data/2.5/weather");
url.searchParams.set("q", `${dataWeather.titleOfCity}`);
url.searchParams.set("appid", `${API_KEY}`);
url.searchParams.set("lang", "ru");
url.searchParams.set("units", "metric");
let urlNow = url;

const btnGetWeather = document.getElementById("popup__btn");
const popupInput = document.querySelector(".popup__input");
const btnChangeCity = document.querySelector(".btn__change-city");
const popup = document.querySelector(".popup");
const loader = document.querySelector(".loader");

function handlerGetWeather() {
  dataWeather = {
    ...dataWeather,
    titleOfCity: popupInput.value,
  };
  loader.classList.add("loader--active");
  url.searchParams.set("q", `${dataWeather.titleOfCity}`);
  getData(urlNow);
  togglePopup();
}
function handlerInput(event) {
  if (event.key === "Enter") {
    if (event.target.value.length > 1) {
      dataWeather = {
        ...dataWeather,
        titleOfCity: event.target.value,
      };
      loader.classList.add("loader--active");
      url.searchParams.set("q", `${dataWeather.titleOfCity}`);
      event.target.value = "";
      getData(urlNow);
      togglePopup();
    }
  }
}
function togglePopup() {
  popup.classList.toggle("popup--active");
  popupInput.focus();
}

btnGetWeather.addEventListener("click", handlerGetWeather);

popupInput.addEventListener("keypress", handlerInput);

btnChangeCity.addEventListener("click", togglePopup);

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
  let weatherHTML = `
  <div class="app-content">
    <header class="top">
      <h2 class="top__name-city">${weather.titleOfCity}</h2>
      <img class="top__icon" src="https://openweathermap.org/img/wn/${
        dataWeather.icon
      }.png" alt="" />
      <p class="top__description">${toUpperCaseFirstSimbol(
        weather.weatherDescription
      )}</p>

      <div class="top__current-temp">${getCorrectingValueOfTemp(
        weather.temp
      )}°</div>
    </header>
    <main class="weather">
    <div class="weather__left">
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
        </div>
        <div class="weather__rigth">
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
  const appWeather = document.querySelector(".container-app");
  removeWeatherHTML();
  appWeather.insertAdjacentHTML("beforeend", weatherHTML);
  loader.classList.remove("loader--active");
}

function removeWeatherHTML() {
  const oldWeatherHTML = document.querySelector(".app-content");
  if (oldWeatherHTML !== null) {
    oldWeatherHTML.remove();
  }
}

const getData = async (url) => {
  const result = await fetch(url);
  const data = await result.json();
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
  window.localStorage.removeItem("dataWeather");
  window.localStorage.setItem("dataWeather", JSON.stringify(dataWeather));
  renderComponents(dataWeather);
};
