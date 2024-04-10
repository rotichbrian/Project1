const weatherForm = document.querySelector(".weatherform");
const cityInput = document.querySelector(".cityInput");
const weatherattributes = document.querySelector(".weatherattributes")

const apiKey = "afc368f03905f3e4ae3918426c6cbfee";
 
weatherForm.addEventListener("submit", async event => {
      
    event.preventDefault();
    const city = cityInput.value

    if(city){
         try{
             
              const weatherData = await getweatherData(city);
              
              displayWeatherInfo(weatherData)
         } 
         catch(error){
            console.error(error)
            displayError(error)
         }
    } 
    else{
        displayError("please enter a city")
    }    
     
})

async function getweatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
     
    if (!response.ok) {
        throw new Error("Could not fetch weather data");
    }
    return await response.json();
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    weatherattributes.textContent = "";
        weatherattributes.style.display = "flex";
        weatherattributes.appendChild(errorDisplay);
    
        
        errorDisplay.classList.add("errorDisplay");
}

function displayWeatherInfo(data) {
    const { name: cityName, main: { temp, humidity }, weather } = data;

    weatherattributes.textContent = ""; // Clear existing content
    weatherattributes.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    cityDisplay.textContent = `${cityName}`;
    cityDisplay.classList.add("cityDisplay");

    weather.forEach(({ description, id }) => {
        const descDisplay = document.createElement("p");
        descDisplay.textContent = `Description: ${description}`;
        descDisplay.classList.add("descDisplay");
    })

        const temperatureDisplay = document.createElement("p");
            temperatureDisplay.textContent = ` ${(temp - 273.15).toFixed(1)} °C`;
            temperatureDisplay.classList.add("temperatureDisplay");

         const humidityDisplay = document.createElement("p");
            humidityDisplay.textContent = `Humidity: ${humidity}%`;
            humidityDisplay.classList.add("humidityDisplay");

}