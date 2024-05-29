const inp = document.querySelector("input");
const srchbtn = document.querySelector(".srch-btn");
const weather_img = document.querySelector(".w-img");
const temp = document.querySelector(".temp");
const description = document.querySelector(".description");
const h_value = document.querySelector(".humidity-value"); 
const w_value = document.querySelector(".wind-value");
const weather_box = document.querySelector(".weather-box");
const weather_detail = document.querySelector(".weather-detail");
const notfound = document.querySelector(".locationnotfound")
const feels_like = document.querySelector(".feelslike");

srchbtn.addEventListener("click",()=>{
    checkweather(inp.value);
})

 async function checkweather(city) {
   const api_key = "c1a9fb42b974a39b8edeff60afb1d1ba";
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

   const weather_data = await fetch(`${url}`).then(request=>request.json());


//    ! wrong city
if (weather_data.cod === `404`) {
    notfound.style.display = "flex";
    weather_box.style.display = "none";
    weather_detail.style.display = "none";
    return;
}
notfound.style.display = "none";
weather_box.style.display = "flex";
weather_detail.style.display = "flex";

   temp.innerHTML = `${Math.round(weather_data.main.temp-273.15)}°C`;
   description.innerHTML = `${weather_data.weather[0].description}`;
   h_value.innerHTML = `${weather_data.main.humidity}%`;
   w_value.innerHTML = `${weather_data.wind.speed}Km/H`;
   feels_like.innerHTML = `Feels like ${Math.round(weather_data.main.feels_like-273.15)}°C`
   console.log(weather_data)

   switch (weather_data.weather[0].main) {
    case 'Clouds':
        weather_img.src = "./cloud.png"
        break;
    case 'Clear':
        weather_img.src = "./clear.png"
        break;
    case 'Rain':
        weather_img.src = "./rain.png"
        break;
    case 'Mist':
        weather_img.src = "./mist.png"
        break;
    case 'Snow':
        weather_img.src = "./snow.png"
        break;
   }
}