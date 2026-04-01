let searchinput = document.querySelector(`.searchinput`);

async function search(city, state = "", country = "") {
    try {
        let url = await fetch(`weather.php?city=${city}&state=${state}&country=${country}`);

        if (!url.ok) throw new Error("Network response not ok");

        let data = await url.json();
        console.log(data);

        
        if (data.cod == 404 || data.cod == "404") {
            document.querySelector(".return").style.display = "none";
            document.querySelector(".message").style.display = "none";
            document.querySelector(".error-message").style.display = "block";
            return;
        }

        document.querySelector(".return").style.display = "block";
        document.querySelector(".message").style.display = "none";
        document.querySelector(".error-message").style.display = "none";

        let weatherImg = document.querySelector(".weather-img");

        document.querySelector(".city-name").innerHTML = data.name;
        document.querySelector(".weather-temp").innerHTML = Math.floor(data.main.temp) + '°';
        document.querySelector(".wind").innerHTML = Math.floor(data.wind.speed) + " m/s";
        document.querySelector(".pressure").innerHTML = Math.floor(data.main.pressure) + " hPa";
        document.querySelector(".humidity").innerHTML = Math.floor(data.main.humidity)+ "%";
        document.querySelector(".sunrise").innerHTML = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"});
        document.querySelector(".sunset").innerHTML = new Date(data.sys.sunset * 1000).toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"});

        
        let condition = data.weather[0].main.toLowerCase();
        if (condition === "rain") weatherImg.src = "img/rain.png";
        else if (condition === "clear") weatherImg.src = "img/sun.png";
        else if (condition === "snow") weatherImg.src = "img/snow.png";
        else if (condition === "clouds" || condition === "smoke") weatherImg.src = "img/cloud.png";
        else if (condition === "mist" || condition === "fog") weatherImg.src = "img/mist.png";
        else if (condition === "haze") weatherImg.src = "img/haze.png";
        else if (condition === "thunderstorm") weatherImg.src = "img/thunderstorm.png";

    } catch (error) {
        console.error("Error fetching weather:", error);
        document.querySelector(".return").style.display = "none";
        document.querySelector(".message").style.display = "none";
        document.querySelector(".error-message").style.display = "block";
    }
}


searchinput.addEventListener('keydown', function(event) {
    if (event.key === "Enter" && searchinput.value.trim() !== "") {
        search(searchinput.value.trim());
        console.log("worked");
    }
});