'use strict'

const docu = document;
const table = docu.getElementById('table'),
  search = docu.getElementById('search'),
  targetSearch = docu.getElementById('targetSearch')
let targetLocation = 'cairo'
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const d = new Date();
let day = weekday[d.getDay()];
let day2 = weekday[d.getDay() + 1];
let day3 = weekday[d.getDay() + 2];

search.addEventListener('click', function () {
  getTargetLocation()
  getWeather(location)
})



let getWeather = async (location) => {

  let url = `https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${location}&days=3`
  const data = await fetch(url)
  const result = await data.json()

  displayWeather(result)
  console.log(result.location.country);

}


let displayWeather = (result) => {
  let tableData = `
    <div id="table" class="weather-table m-auto text-white rounded-2">
      <div class="container row main-day">
        <div class="col-4 p-0">
          <div class="weather-head d-flex justify-content-between align-items-center text-light fs-6">
            <p class="my-1 mx-2">${day}</p>
            <p class="my-1 mx-2">${result.forecast.forecastday[0].date.slice(2)}</p>
          </div>
          <div class="weather-data">
            <div class="weather-city m-4 fw-bolder fs-3">${result.location.country}</div>
            <div class="weather-state row d-flex justify-content-between align-items-center">
              <div class="weather-temp weather-temp-main col-8 text-center">
                <p>${result.forecast.forecastday[0].day.maxtemp_c}°C</p>
              </div>
              <div class="weather-icon col-4 d-flex justify-content-center">
                <img src="http://${result.forecast.forecastday[0].day.condition.icon.slice(2)}"></img>
              </div>
            </div>
            <p class="weather-cloud text-center">${result.forecast.forecastday[0].day.condition.text}</p>
          </div>
        </div>
        <div class="col-4 p-0 weather-head3">
          <div class="weather-head weather-head3 d-flex justify-content-between align-items-center text-light fs-6">
            <p class="my-1 mx-2 text-center">${day2}</p>
          </div>
          <div class="weather-data">
            <div class="weather-state row text-center my-3">
              <div class="weather-icon col-12 d-flex justify-content-center">
                <img src="http://${result.forecast.forecastday[1].day.condition.icon.slice(2)}"></img>
              </div>
              <div class="weather-temp col-12 h1">
                <p>${result.forecast.forecastday[1].day.maxtemp_c}°C</p>
              </div>
            </div>
            <p class="weather-cloud text-center">${result.forecast.forecastday[1].day.condition.text}</p>
          </div>
        </div>
        <div class="col-4 p-0">
          <div class="weather-head d-flex justify-content-between align-items-center text-light fs-6 text-center">
            <p class="my-1 mx-2">${day3}</p>
          </div>
          <div class="weather-data">
            <div class="weather-state row text-center my-3">
              <div class="weather-icon col-12 d-flex justify-content-center">
                <img src="http://${result.forecast.forecastday[2].day.condition.icon.slice(2)}"></img>
              </div>
              <div class="weather-temp col-12 h1">
                <p>${result.forecast.forecastday[2].day.maxtemp_c}°C</p>
              </div>
            </div>
            <p class="weather-cloud text-center">${result.forecast.forecastday[2].day.condition.text}</p>
          </div>
        </div>
      </div>
    </div>
    `
  table.innerHTML = tableData
}
let getTargetLocation = () => {
  targetLocation = targetSearch.value
  getWeather(targetLocation)
}


