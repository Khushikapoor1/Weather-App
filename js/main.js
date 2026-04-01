function getWeather() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {

            let lat = position.coords.latitude;
            let lon = position.coords.longitude;

            fetch(`weather.php?lat=${lat}&lon=${lon}&type=current`)
                .then(res => res.json())
                .then(data => {
                    document.getElementById("weather-main").innerHTML = data.weather[0].main;

                    document.getElementById("city-name").innerHTML = data.name;
                    document.getElementById("metric").innerHTML = Math.floor(data.main.temp) + "°";

                    document.getElementById("humidity").innerHTML = data.main.humidity + "%";
                    document.getElementById("feels-like").innerHTML = Math.floor(data.main.feels_like) + "°";

                    document.getElementById("temp-min-today").innerHTML = Math.floor(data.main.temp_min) + "°";
                    document.getElementById("temp-max-today").innerHTML = Math.floor(data.main.temp_max) + "°";

                    let condition = data.weather[0].main.toLowerCase();
                    let weatherImg = document.querySelector(".weather-icon");

                    if (condition === "rain") weatherImg.src = "img/rain.png";
                    else if (condition === "clear") weatherImg.src = "img/sun.png";
                    else if (condition === "snow") weatherImg.src = "img/snow.png";
                    else if (condition === "clouds") weatherImg.src = "img/cloud.png";
                    else if (condition === "mist" || condition === "fog") weatherImg.src = "img/mist.png";
                    else if (condition === "haze") weatherImg.src = "img/haze.png";
                    else if (condition === "thunderstorm") weatherImg.src = "img/thunderstorm.png";

                });

            fetch(`weather.php?lat=${lat}&lon=${lon}&type=forecast`)
                .then(res => res.json())
                .then(data => displayForecast(data));

        });

    } else {
        alert("Geolocation not supported");
    }
}