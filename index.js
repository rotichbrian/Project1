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

}