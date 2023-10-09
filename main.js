const API_KEY = "894728d054834d67b7370701231509";

// Define these variables in a common scope
var weatherData = null;
const locationInput = document.querySelector("#location");
locationInput.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    if (locationInput.value.length === 0) {
      alert("Enter Something");
    } else {
      await getWeatherData(locationInput.value);
    }
  }
});
async function getWeatherData(location) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=5&aqi=no&alerts=no`,
    );

    weatherData = await response.json();
    paintScreen(weatherData, "C");
    console.log(weatherData);
  } catch (error) {
    console.log("Error:", error);
    alert("City Not Found");
  }
}

// Cahneg Mode Event Listners
const celsiusBtn = document.querySelector('.celsius')
const franheightBtn = document.querySelector('.franheight')
celsiusBtn.addEventListener('click', () => {
  celsiusBtn.classList.add('celsius-active')
  franheightBtn.classList.remove('franheight-active')
  paintScreen(weatherData, "C");
})

franheightBtn.addEventListener('click', () => {
  franheightBtn.classList.add('franheight-active')
  celsiusBtn.classList.remove('celsius-active')
  paintScreen(weatherData, "F");
})

// The event listener remains the same


// all data variables

let celsius = document.querySelector(".celsius");
celsius.addEventListener("click", () => {
  changeTempMode("C");
});

let franheight = document.querySelector(".franheight");
franheight.addEventListener("click", () => {
  changeTempMode("F");
});

function changeTempMode(temp) {
  let celsius = document.querySelector(".celsius");
  let franheight = document.querySelector(".franheight");
  if (temp == "C") {
    celsius.classList.add("temp-selected");
    if (franheight.classList.contains("temp-selected")) {
      franheight.classList.remove("temp-selected");
    }
  } else {
    franheight.classList.add("temp-selected");
    if (celsius.classList.contains("temp-selected")) {
      celsius.classList.remove("temp-selected");
    }
  }
}

function paintScreen(weatherData, temp_mode) {
  // sidebar data variables
  const currentWeatherIcon = weatherData.current.condition.icon;
  const currentTempCel = weatherData.current.temp_c;
  const currentTempFar = weatherData.current.temp_f;
  const currentTempType = weatherData.current.condition.text;
  const currentDate = weatherData.current.last_updated;
  const currentLocation = weatherData.location.country;
  const currentLocationRegion = weatherData.location.region

  // get The DOM of Sidebar Weather Icon
  let sidebarWeatherIconImg = document.querySelector(
    ".sidebar-weather-icon-img",
  );
  sidebarWeatherIconImg.src = currentWeatherIcon;



  let sideBarWeatherTemp = document.querySelector(".sidebar-weather-temp");
  // TWO MODES 'T' AND 'F' temp and Farhenheit
  if (temp_mode == "C") {
    sideBarWeatherTemp.innerText = currentTempCel + "C";
  } else {
    sideBarWeatherTemp.innerText = currentTempFar + "F";
  }

  let sideBarWeatherType = document.querySelector(".sidebar-weather-type");
  sideBarWeatherType.innerText = currentTempType;

  let sideBarWeatherDate = document.querySelector(".sidebar-weather-date");
  sideBarWeatherDate.innerText = currentDate;
  formatDateTime(currentDate, sideBarWeatherDate)

  let sideBarWeatherLocation = document.querySelector(
    ".sidebar-weather-location",
  );
  sideBarWeatherLocation.innerText = currentLocation;

  let locationRegion = document.querySelector('.sidebar-weather-region');
  locationRegion.innerText = currentLocationRegion

  // main forecast variables

  // Tommorow
  const ForecastDate = weatherData.forecast.forecastday[0].date;
  const ForeCastIcon = weatherData.forecast.forecastday[0].day.condition.icon;
  const mintempForeCastTommorowCel =
    weatherData.forecast.forecastday[0].day.mintemp_c;
  const maxtempForeCastTommorowCel =
    weatherData.forecast.forecastday[0].day.maxtemp_c;
  const minTempForeCastTommorowFar =
    weatherData.forecast.forecastday[0].day.mintemp_f;
  const maxTempForeCastTommorowFar =
    weatherData.forecast.forecastday[0].day.maxtemp_f;

  let tommorow = document.querySelector(".tommorow");
  tommorow.innerText = "Tommorow";

  let forecastIconTommorowImg = document.querySelector(
    ".forecast-icon-tommorow-img",
  );
  forecastIconTommorowImg.src = ForeCastIcon;

  var forecastTempTommorowMin = document.querySelector(
    ".forecast-temp-tommorow-min",
  );
  var forecastTempTommorowMax = document.querySelector(
    ".forecast-temp-tommorow-max",
  );

  if (temp_mode == "C") {
    forecastTempTommorowMin.innerText = mintempForeCastTommorowCel;
    forecastTempTommorowMax.innerText = maxtempForeCastTommorowCel;
  } else {
    forecastTempTommorowMin.innerText = minTempForeCastTommorowFar;
    forecastTempTommorowMax.innerText = maxTempForeCastTommorowFar;
  }

  // Day 1
  const ForecastDateOne = weatherData.forecast.forecastday[1].date;
  const ForeCastIconOne =
    weatherData.forecast.forecastday[1].day.condition.icon;
  const mintempForeCastOneCel =
    weatherData.forecast.forecastday[1].day.mintemp_c;
  const maxtempForeCastOneCel =
    weatherData.forecast.forecastday[1].day.maxtemp_c;
  const minTempForeCastOneFar =
    weatherData.forecast.forecastday[1].day.mintemp_f;
  const maxTempForeCastOneFar =
    weatherData.forecast.forecastday[1].day.maxtemp_f;

  let DayOneForecastDate = document.querySelector(".dayOne");
  formatDateTime(ForecastDateOne, DayOneForecastDate)
  // DayOneForecastDate.innerText = ForecastDateOne; 

  let forecastIconDayOneImg = document.querySelector(
    ".forecast-icon-dayOne-img",
  );
  forecastIconDayOneImg.src = ForeCastIconOne;

  let forecastTempDayOneMin = document.querySelector(
    ".forecast-temp-dayOne-min",
  );
  let forecastTempDayOneMax = document.querySelector(
    ".forecast-temp-dayOne-max",
  );

  if (temp_mode == "C") {
    forecastTempDayOneMin.innerText = mintempForeCastOneCel;
    forecastTempDayOneMax.innerText = maxtempForeCastOneCel;
  } else {
    forecastTempDayOneMin.innerText = minTempForeCastOneFar;
    forecastTempDayOneMax.innerText = maxTempForeCastOneFar;
  }

  // Day 2
  const ForecastDateTwo = weatherData.forecast.forecastday[2].date;
  const ForeCastIconTwo =
    weatherData.forecast.forecastday[2].day.condition.icon;
  const mintempForeCastTwoCel =
    weatherData.forecast.forecastday[2].day.mintemp_c;
  const maxtempForeCastTwoCel =
    weatherData.forecast.forecastday[2].day.maxtemp_c;
  const minTempForeCastTwoFar =
    weatherData.forecast.forecastday[2].day.mintemp_f;
  const maxTempForeCastTwoFar =
    weatherData.forecast.forecastday[2].day.maxtemp_f;

  let DayTwoForecastDate = document.querySelector(".dayTwo");
  formatDateTime(ForecastDateTwo, DayTwoForecastDate)

  let forecastIconDayTwoImg = document.querySelector(
    ".forecast-icon-dayTwo-img",
  );
  forecastIconDayTwoImg.src = ForeCastIconTwo;

  let forecastTempDayTwoMin = document.querySelector(
    ".forecast-temp-dayTwo-min",
  );
  let forecastTempDayTwoMax = document.querySelector(
    ".forecast-temp-dayTwo-max",
  );

  if (temp_mode == "C") {
    forecastTempDayTwoMin.innerText = mintempForeCastTwoCel;
    forecastTempDayTwoMax.innerText = maxtempForeCastTwoCel;
  } else {
    forecastTempDayTwoMin.innerText = minTempForeCastTwoFar;
    forecastTempDayTwoMax.innerText = maxTempForeCastTwoFar;
  }

  // Day 3
  const ForecastDateThree = weatherData.forecast.forecastday[3].date;
  const ForeCastIconThree =
    weatherData.forecast.forecastday[3].day.condition.icon;
  const mintempForeCastThreeCel =
    weatherData.forecast.forecastday[3].day.mintemp_c;
  const maxtempForeCastThreeCel =
    weatherData.forecast.forecastday[3].day.maxtemp_c;
  const minTempForeCastThreeFar =
    weatherData.forecast.forecastday[3].day.mintemp_f;
  const maxTempForeCastThreeFar =
    weatherData.forecast.forecastday[3].day.maxtemp_f;

  let DayThreeForecastDate = document.querySelector(".dayThree");
  formatDateTime(ForecastDateThree, DayThreeForecastDate)

  let forecastIconDayThreeImg = document.querySelector(
    ".forecast-icon-dayThree-img",
  );
  forecastIconDayThreeImg.src = ForeCastIconThree;

  let forecastTempDayThreeMin = document.querySelector(
    ".forecast-temp-dayThree-min",
  );
  let forecastTempDayThreeMax = document.querySelector(
    ".forecast-temp-dayThree-max",
  );

  if (temp_mode == "C") {
    forecastTempDayThreeMin.innerText = mintempForeCastThreeCel;
    forecastTempDayThreeMax.innerText = maxtempForeCastThreeCel;
  } else {
    forecastTempDayThreeMin.innerText = minTempForeCastThreeFar;
    forecastTempDayThreeMax.innerText = maxTempForeCastThreeFar;
  }

  // Day 4
  const ForecastDateFour = weatherData.forecast.forecastday[4].date;
  const ForeCastIconFour =
    weatherData.forecast.forecastday[4].day.condition.icon;
  const mintempForeCastFourCel =
    weatherData.forecast.forecastday[4].day.mintemp_c;
  const maxtempForeCastFourCel =
    weatherData.forecast.forecastday[4].day.maxtemp_c;
  const minTempForeCastFourFar =
    weatherData.forecast.forecastday[4].day.mintemp_f;
  const maxTempForeCastFourFar =
    weatherData.forecast.forecastday[4].day.maxtemp_f;

  let DayFourForecastDate = document.querySelector(".dayFour");
  formatDateTime(ForecastDateFour, DayFourForecastDate)

  let forecastIconDayFourImg = document.querySelector(
    ".forecast-icon-dayFour-img",
  );
  forecastIconDayFourImg.src = ForeCastIconFour;

  let forecastTempDayFourMin = document.querySelector(
    ".forecast-temp-dayFour-min",
  );
  let forecastTempDayFourMax = document.querySelector(
    ".forecast-temp-dayFour-max",
  );

  if (temp_mode == "C") {
    forecastTempDayFourMin.innerText = mintempForeCastFourCel;
    forecastTempDayFourMax.innerText = maxtempForeCastFourCel;
  } else {
    forecastTempDayFourMin.innerText = minTempForeCastFourFar;
    forecastTempDayFourMax.innerText = maxTempForeCastFourFar;
  }

  // main today's highlights
  const windSpeed = weatherData.current.wind_mph;
  const windDirection = weatherData.current.wind_dir;
  const Humidity = weatherData.current.humidity;
  const visiblity = weatherData.current.vis_miles;
  const airPressure = weatherData.current.pressure_mb;

  let windSpeedValue = document.querySelector(".windSpeedValue");
  windSpeedValue.innerText = windSpeed;

  let windDirectionValue = document.querySelector(".windDirectionValue");
  windDirectionValue.innerText = windDirection;

  let humidityValue = document.querySelector(".humidityValue");
  humidityValue.innerText = Humidity;

  let visiblityValue = document.querySelector(".visiblityValue");
  visiblityValue.innerText = visiblity;

  let airPressureValue = document.querySelector(".airPressureValue");
  airPressureValue.innerText = airPressure;
}

window.onload = () => {
  getWeatherData('India')
}

function formatDateTime(inputDateTime, classVariableName) {
  // Create a Date object from the input datetime string
  const date = new Date(inputDateTime);

  // Define an array of day names and month names
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Get the day of the week, day of the month, and month name
  const dayOfWeek = dayNames[date.getDay()];
  const dayOfMonth = date.getDate();
  const monthName = monthNames[date.getMonth()];

  // Create the formatted date string
  const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${monthName}`;


  classVariableName.innerText = formattedDate
}