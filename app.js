const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search-btn");
const errorMessage = document.querySelector("#error-message");
const weatherDisplay = document.querySelector("#weather-display");
const cityName = document.querySelector("#city-name");
const weatherIcon = document.querySelector("#weather-icon");
const temp = document.querySelector("#temperature");
const desc = document.querySelector("#description");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#wind-speed");

function searchFunction() {

    const city = cityInput.value.trim();

    if (!city) return
    
    const apiKey = "46ed7bd01aba066eae1f67de0ac177ab";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.cod !== 200) {
            showError();
            return;
        }
        displayWeather(data);
    })
    .catch(error => {
        console.error(error);
        showError();
    })
};

searchBtn.addEventListener("click", searchFunction);
cityInput.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {
        searchFunction();
    }
});

function showError() {
    errorMessage.classList.remove("hidden");
    weatherDisplay.classList.add("hidden");
}

function displayWeather(data) {
    console.log(data);
    errorMessage.classList.add("hidden");
    weatherDisplay.classList.remove("hidden");

    cityName.textContent = data.name
    temp.textContent = `${data.main.temp}°C`
    desc.textContent = data.weather[0].description;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind: ${data.wind.speed} m/s`;

    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}