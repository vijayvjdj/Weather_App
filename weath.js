const apiKey = "9417164e0cb6290cb0d09389433e6e05";

const themeToggle = document.getElementById("theme-toggle");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.innerText = "☀️";
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        themeToggle.innerText = "☀️";
    } else {
        localStorage.setItem("theme", "light");
        themeToggle.innerText = "🌙";
    }
});



async function getWeatherByCoords(lat, lon) {
    document.getElementById("loading").classList.remove("hidden");
    document.getElementById("weather-result").innerHTML = "";

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        document.getElementById("loading").classList.add("hidden");

        if (data.cod !== 200) {
            document.getElementById("weather-result").innerHTML = 
                `<p class="text-red-500 font-semibold">❌ Location not found</p>`;
        } else {
            displayWeather(data);
        }
    } catch (error) {
        document.getElementById("weather-result").innerHTML = 
            `<p class="text-red-500 font-semibold">⚠️ Something went wrong. Try again.</p>`;
    }
}


async function getWeather() {
    const city = document.getElementById("city").value.trim();
    if (!city) {
        alert("Please enter a city name");
        return;
    }

    document.getElementById("loading").classList.remove("hidden");
    document.getElementById("weather-result").innerHTML = "";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        document.getElementById("loading").classList.add("hidden");

        if (data.cod === "404") {
            document.getElementById("weather-result").innerHTML = 
                `<p class="text-red-500 dark:text-red-400 font-semibold">❌ City not found</p>`;
        } else {
            displayWeather(data);
        }
    } catch (error) {
        document.getElementById("weather-result").innerHTML = 
            `<p class="text-red-500 dark:text-red-400 font-semibold">⚠️ Something went wrong. Please try again.</p>`;
    }
}


function displayWeather(data) {
    const weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    document.getElementById("weather-result").innerHTML = `
        <div class="mt-4 p-4 bg-blue-50 dark:bg-gray-700 rounded-md shadow-md">
            <h3 class="text-xl font-semibold">${data.name}, ${data.sys.country}</h3>
            <img src="${weatherIcon}" alt="Weather Icon" class="mx-auto">
            <p class="text-lg font-bold">${data.main.temp}°C</p>
            <p class="capitalize">${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
        </div>
    `;
}

