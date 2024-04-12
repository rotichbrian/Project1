const weatherForm = document.querySelector(".formContainer");
const cityInput = document.querySelector(".cityInput");
const weatherattributes = document.querySelector(".weatherattributes")
// API key for OpenWeather API
const apiKey = "afc368f03905f3e4ae3918426c6cbfee";
 
// EventListener that shows loading spinner before page unload
window.addEventListener("beforeunload", () => {
    showLoadingSpinner();
  });
//   EventListener for form submission
weatherForm.addEventListener("submit", async event => {
      
    event.preventDefault(); //prevents the browser from reloading the page After weatherForm submission

    
    const city = cityInput.value

    if(city){
         try{
             showLoadingSpinner();
              const weatherData = await getweatherData(city); //asynchronously weather fetching
              hideLoadingSpinner();
              displayWeatherInfo(weatherData)
         }  

         // catch any errors that might occur during asychronous operation
         catch(error){
            console.error(error)
            hideLoadingSpinner(); // hides the loading spinner after the loading is done
            displayError(error)
         } 
    }
    else{
        displayError("please enter a city")
    }
});
    // Function that I use to fetch weather data from OpenWeatherMap API
    async function getweatherData(city){
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error("Could not fetch weather data");
        }
        return await response.json();
       
    }
    // Function that disaplay error messages
    function displayError(message){
        const errorDisplay = document.createElement("p");
        errorDisplay.textContent = message;
        errorDisplay.classList.add("errorDisplay");

        weatherattributes.textContent = "";
        weatherattributes.style.display = "flex";
        weatherattributes.appendChild(errorDisplay);
    
        
        errorDisplay.classList.add("errorDisplay");
        
    }
    // Function to display weather information
    function displayWeatherInfo(data) {
        const { name: cityName, main: { temp, humidity }, weather } = data;
    
        weatherattributes.textContent = ""; 
        weatherattributes.style.display = "flex";
    
        const cityDisplay = document.createElement("h1");
        cityDisplay.textContent = `${cityName}`;
        cityDisplay.classList.add("cityDisplay");
        weatherattributes.appendChild(cityDisplay);

        
        weather.forEach(({ description, id }) => {
        
         const temperatureDisplay = document.createElement("p");
        temperatureDisplay.textContent = ` ${(temp - 273.15).toFixed(1)} °C`; // conversion of temperature value from Kelvin to celsius
        temperatureDisplay.classList.add("temperatureDisplay");
        weatherattributes.appendChild(temperatureDisplay);
            
        const humidityDisplay = document.createElement("p");
        humidityDisplay.textContent = `Humidity: ${humidity}%`;
        humidityDisplay.classList.add("humidityDisplay");
        weatherattributes.appendChild(humidityDisplay);

        const descDisplay = document.createElement("p");
        descDisplay.textContent = `Description: ${description}`;
        descDisplay.classList.add("descDisplay");
        weatherattributes.appendChild(descDisplay);
                  
        const weatherEmoji = document.createElement("p");
        weatherEmoji.textContent = getWeatherEmoji(id);
        weatherEmoji.classList.add("weatherEmoji");
        weatherattributes.appendChild(weatherEmoji);    
        

        });     
    }
       // function which i used to get weather Emoji based on weather ID
    function getWeatherEmoji(weatherId){
  
    let weatherEmoji;
       // Assigning of weather emoji based on weather ID range
    if (weatherId >= 200 && weatherId < 300) {
        weatherEmoji = "⛈️";         // Thunderstorm
    } else if (weatherId >= 300 && weatherId < 500) {
        weatherEmoji = "🌦️";        // Drizzle
    } else if (weatherId >= 500 && weatherId < 600) {
        weatherEmoji = "🌧️";       //Rain
    } else if (weatherId >= 600 && weatherId < 700) {
        weatherEmoji = "❄️";       //snow
    } else if (weatherId >= 700 && weatherId < 800) {
        weatherEmoji = "🌫️";      //mist / fog
    } else if (weatherId === 800) {
        weatherEmoji = "🌞";     // sunny / clear skies
    } else if (weatherId > 800 && weatherId < 810) {
        weatherEmoji = "⛅";    // cloudy
    } else {
        weatherEmoji = "❓";   // Default emoji for unknown weather ID
    }
    
    return weatherEmoji;
    
}
      // function to show loading spinner
function showLoadingSpinner() {
    const spinner = document.createElement("div");
    spinner.classList.add("spinner");
    spinner.textContent = "Loading..."; 
    weatherattributes.appendChild(spinner);

    
    setTimeout(() => {
        hideLoadingSpinner();
    }, 3000);   //Hiding loading spinner affter 3seconds
}
     // Function to hide loading spinner
function hideLoadingSpinner() {
    const spinner = document.querySelector(".spinner");
    if (spinner) {
        spinner.remove();
    }
}
    //function to add comment    
function addComment() {
    const commentText = commentInput.value.trim();
    if (commentText) {
        const commentDisplay = document.createElement("p");
        commentDisplay.textContent = `Comment: ${commentText}`;
        commentDisplay.classList.add("commentDisplay");

        weatherattributes.appendChild(commentDisplay);

        commentInput.value = "";
    }
}
        // EventListener to toggle weather dispaly
const toggleWeatherBtn =document.querySelector(".toggleWeatherBtn");
toggleWeatherBtn.addEventListener("click", () => {
    const isHidden = weatherattributes.style.display === "none";
    weatherattributes.style.display = isHidden ? "flex" : "none"
})
  