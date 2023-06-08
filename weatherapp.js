const weatherInfo = document.getElementById("weatherContainer");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
const mainInfo = document.getElementsByClassName("mainInformation")
const showCity = document.getElementById("city");
let api1 = "https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&lang=se&appid=3ee1fe60512466d911afa2c70e2190c9"

placeholder()
setTimeAndDate();

// event Listener
searchBtn.addEventListener("click", e => {

    fetchWeather(searchInput.value)

})
//ta bort texten i sökrutan när du klickar på input fältet
searchInput.addEventListener("click", () => {
    searchInput.value = '';
})

setInterval(() => {
    fetchWeather(searchInput.value)
}, 30 * 60 * 1000);
///////////////funktioner///////////////

//funktion för tid och dag
function setTimeAndDate() {
    //pilfunktion för att sätta tiden. OBS!!! anpassar sig inte efter tidszoner
    let ShowDateTime = document.getElementById("dateTime")
    setInterval(() => {
        let currentTime = new Date().getTime();
        let time = new Date(currentTime).toLocaleTimeString();
        // let minut = nu.getMinutes().toString();
        //uppdelning för att skriva ut datum i rätt ordning
        let showDate = new Date();
        let day = showDate.getDate().toString().padStart(2, "0");
        let month = showDate.getMonth() + 1
        let month2 = month.toString().padStart(2, "0");
        let year = showDate.getFullYear();
        let currentDate = `${day}-${month2}-${year}`;
        ShowDateTime.innerHTML = "Datum: " + currentDate + ", Tid: " + time;
    }, 1000)
}


//funktion som hämtar vädret från API
function fetchWeather(city) {

    const api = fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&lang=se&appid=3ee1fe60512466d911afa2c70e2190c9")
        // .then((respons) => respons.json())

        .then(response => {
            if (response.status !== 200) {
                document.querySelector(".errorMessage").style.display = "block";
                weatherInfo.style.display = "none";

            } else {
                weatherInfo.style.display = "block";
                document.querySelector(".errorMessage").style.display = "none";
                return response.json()
            }
            return response.json()
        })

        .then((json) => displayWeather(json))

};

//funktion för vad för väder information som ska vissas
function displayWeather(display) {


    showCity.innerText = display.name;

    let showTemp = document.getElementById("temp");
    showTemp.innerText = Math.round(display.main.temp) + " °C";

    let showDescription = document.getElementById("description");
    showDescription.innerText = display.weather[0].description;

    let showWind = document.getElementById("wind");
    showWind.innerText = "Vindhastighet: " + display.wind.speed + " m/s ";

    let showHumidity = document.getElementById("humidity");
    showHumidity.innerText = "Luftfuktighet: " + display.main.humidity + "%";

    let showPressure = document.getElementById("pressure");
    showPressure.innerText = "Lufttryck: " + display.main.pressure + " hPa ";


    if (display.weather[0].main == "Clear") {
        document.querySelector(".fa-sun").style.display = "block";

    } else if (display.weather[0].description == "few clouds: 11-25% ") {
        document.querySelector(".fa-cloud-sun").style.display = "block";

    } else if (display.weather[0].main == "Clouds") {
        document.querySelector(".fa-cloud").style.display = "block";

    } else if (display.weather[0].description == "light rain") {
        document.querySelector(".fa-cloud-sun-rain").style.display = "block";

    } else if (display.weather[0].main == "Rain") {
        document.querySelector(".fa-cloud-rain").style.display = "block";

    } else if (display.weather[0].main == "Drizzly") {
        document.querySelector(".fa-cloud-showers-heavy").style.display = "block";

    } else if (display.weather[0].main == "Mist", "Haze", "Fog") {
        document.querySelector(".fa-smog").style.display = "block";

    } else if (display.weather[0].main == "Snow") {
        document.querySelector(".fa-snow").style.display = "block";

    } else if (display.weather[0].main == "Thunderstorm") {
        document.querySelector(".fa-bolt-lightning").style.display = "block";
    }

}
//skriver ut vädret i göteborg tills någon har sökt 
function placeholder() {
    const api = fetch("https://api.openweathermap.org/data/2.5/weather?q=göteborg&units=metric&lang=se&appid=3ee1fe60512466d911afa2c70e2190c9")
        .then((respons) => respons.json())
        .then((json) => displayWeather(json))
}

