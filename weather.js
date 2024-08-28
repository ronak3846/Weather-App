let cityName = document.querySelector(".weather_city");
let datetime = document.querySelector(".weather_time");
let w_forcast = document.querySelector(".weather_forcast");
let w_temp= document.querySelector(".weather_temp");
let w_icon = document.querySelector(".weather_icon");
let w_min = document.querySelector(".weather_min");
let w_max = document.querySelector(".weather_max");

let w_feelslike = document.querySelector(".weather_feelslike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");


let citySearch = document.querySelector(".weather_search");
// let suggestions = document.getElementById("suggestions");
// let cityInput = document.querySelector(".city_name");


const getCountryName = (code) => {
    return  new Intl.DisplayNames([code], { type: 'region' }).of(code);
};

// to get date and time
const getDateTime = (dt) => {
    const curDate = new Date(dt*1000);
    console.log(curDate);

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };

    const formatter = new Intl.DateTimeFormat("en-US" , options);
    console.log(formatter);

    return  formatter.format(curDate);
    
};
let city = "pune";
citySearch.addEventListener('submit' , (e) => {
    e.preventDefault();
    let cityName = document.querySelector(".city_name");
    console.log(cityName.value);
    city = cityName.value;
    getWheatherData();
    cityName.vaule = "";
    

});

const getWheatherData = async() => {
   const weatherurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2f6b0402ccb214116e0bc810e4de2697`;
    try{
        const res = await fetch(weatherurl);
        const data = await res.json();
        console.log(data);
        

        const {main , name , weather , wind , sys , dt} = data;
        const tempKelvin = data.main.temp;
        const tempCelsius = tempKelvin - 273.15;

        cityName.innerHTML = `${name} , ${getCountryName(sys.country)}`;
        datetime.innerHTML = getDateTime(dt);

        w_forcast.innerHTML = weather[0].main;
        w_icon.innerHTML = ` <img src= "http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" />`;
        

        w_temp.innerHTML = `${tempCelsius.toFixed(1)}°C`;
        document.querySelector('.weather_min').textContent = `Min: ${(data.main.temp_min - 273.15).toFixed(1)}°C`;
            document.querySelector('.weather_max').textContent = `Max: ${(data.main.temp_max - 273.15).toFixed(1)}°C`;

        w_feelslike.innerHTML = `${main.feels_like}&#176`;
        w_humidity.innerHTML = `${main.humidity}%`;
        w_wind.innerHTML = `${wind.speed} m/s`;
        w_pressure.innerHTML = `${main.pressure} hPa`;
        
    }catch(error){
        console.log(error);
        
    }
};

// citySearch.addEventListener('submit', (e) => {
//     e.preventDefault();
//     city = cityInput.value;
//     getWeatherData();
//     cityInput.value = "";
//     suggestions.innerHTML = ''; // Clear suggestions after search
// });

// // Autocomplete functionality
// cityInput.addEventListener('input', async () => {
//     let query = cityInput.value;

//     if (query.length > 2) {
//         const citiesUrl = `https://api.openweathermap.org/data/2.5/find?q=${query}&type=like&appid=2f6b0402ccb214116e0bc810e4de2697`;
//         try {
//             const res = await fetch(citiesUrl);
//             const data = await res.json();
//             const cities = data.list.map(item => item.name);

//             // Clear previous suggestions
//             suggestions.innerHTML = '';

//             // Display new suggestions
//             cities.forEach(city => {
//                 let listItem = document.createElement('li');
//                 listItem.textContent = city;
//                 listItem.addEventListener('click', () => {
//                     cityInput.value = city;
//                     suggestions.innerHTML = ''; // Clear suggestions on selection
//                     getWeatherData();
//                 });
//                 suggestions.appendChild(listItem);
//             });

//         } catch (error) {
//             console.log(error);
//         }
//     } else {
//         suggestions.innerHTML = ''; // Clear suggestions if query is too short
//     }
// });

document.body.addEventListener('load' , getWheatherData());

