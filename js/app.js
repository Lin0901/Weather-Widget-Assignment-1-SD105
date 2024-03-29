let latitude;
let longitude;
const key = '7549b0e653c49d3531c2d3a4141946ac';
http://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&appid=${key}
const day = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
}

navigator.geolocation.getCurrentPosition(position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    getWeather(latitude, longitude)
});

function getWeather(lati, long) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&appid=${key}`)
        .then(resp => resp.json())
        .then(data => {
            currentWeather(data);
        })
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&appid=${key}`)
        .then(resp => resp.json())
        .then(data => {
            (data.list);

        })
}

function currentWeather(data) {
    const currentConditionEle = document.querySelector(".current-conditions");
    currentConditionEle.innerHTML = `
          <h2>Current Conditions</h2>
          <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
          <div class="current">
            <div class="temp">${parseInt(data.main.temp)}&#8451;</div>
            <div class="condition">${data.weather[0].description}</div>
          </div>
        </div>`
}

function weatherForecast(data) {
    let date = new Date();
    let dates = {};
    let tempMax = {};
    let tempMin = {};
    const forecastEle = document.querySelector(".forecast");
    data.forEach(weather => {
        let date = new Date(weather.dt_txt);
        if (dates[date.toDateString(weather.dt_txt)] === undefined) {
            dates[date.toDateString(weather.dt_txt)] = [weather];
            tempMax[date.toDateString(weather.dt_txt)] = [weather.main.temp_max];
            tempMin[date.toDateString(weather.dt_txt)] = [weather.main.temp_min];
        } else {
            dates[date.toDateString(weather.dt_txt)].push(weather);
            tempMax[date.toDateString(weather.dt_txt)].push(weather.main.temp_max);
            tempMin[date.toDateString(weather.dt_txt)].push(weather.main.temp_min);
        }
        if (date.toLocaleTimeString() === "12:00:00 PM") {
            forecastEle.insertAdjacentHTML(`beforeend`, `<div class="day">
      <h3>${day[date.getDay()]}</h3>
      <img src="http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png">
      <div class="description">${weather.weather[0].description}</div>
      <div class="temp">
        <span class="high">${parseInt(tempMax[date.toDateString(weather.dt_txt)])}&#8451</span>/<span class="low">${parseInt((tempMin[date.toDateString(weather.dt_txt)]))}&#8451</span>
      </div>
    </div>`)
        }
    })
}
