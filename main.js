let dataWeather = {
  titleOfCity: "Екатеринбург",
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

const API_KEY = "";
const urlNow = `https://api.openweathermap.org/data/2.5/weather?q=${dataWeather.titleOfCity}&lang=ru&units=metric&appid=${API_KEY}`;

fetch(
  `https://api.openweathermap.org/data/2.5/forecast?q=${dataWeather.titleOfCity}&lang=ru&units=metric&appid=${API_KEY}`
)
  .then((result) => result.json())
  .then((data) => {
    console.log(data);
  });

// const getData = async () => {
//   const result = await fetch(urlNow);
//   const data = await result.json();
//   console.log(data);

//   let {
//     name: titleOfCity,
//     clouds: { all },
//     main: {
//       feels_like: feelsLike,
//       humidity,
//       pressure,
//       temp,
//       temp_max: tempMax,
//       temp_min: tempMin,
//     },
//     sys: { sunrise, sunset },
//     visibility,
//     weather: [{ description: weatherDescription }],
//     wind: { speed: windSpeed },
//   } = data;
//   dataWeather = {
//     ...dataWeather,
//     titleOfCity,
//     clouds: all,
//     feelsLike,
//     humidity,
//     pressure,
//     temp,
//     tempMax,
//     tempMin,
//     sunrise,
//     sunset,
//     visibility,
//     weatherDescription,
//     windSpeed,
//   };
//   console.log(dataWeather);
// };

// getData();
console.log(dataWeather);
