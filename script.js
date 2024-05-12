let search = document.getElementById("searchbtn");
let cityInput = document.getElementById("searchfield");
let tempc = document.getElementById("main_temp");
let temptype = document.getElementById("tempreture_type");
let dayanddate = document.getElementById("currentdate");
let city1 = document.getElementById("citytext");
let img1 = document.getElementById("mainimg");
let windspeed = document.getElementById("wind_speed");
let top1 = document.getElementById("topid1");


request("london");


search.addEventListener('click', () => {
    let city = cityInput.value;
    if (city) {
        top1.innerHTML = "";
        request(city);
    } else {
        alert("Please enter a city name");
    }
});

async function request(city) {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=5fded319a60e49f7a1c134515242101&q=${city}&days=6&aqi=no&alerts=no`;
    try {
        const fetch1 = await axios.get(url);
        city = fetch1.data.location.name;
        tempreture_c = fetch1.data.current.temp_c;
        humidity = fetch1.data.current.humidity;
        let day1 = getday(fetch1.data.current.is_day);
        let date = fetch1.data.location.localtime.slice(0,10);
        let condition = fetch1.data.current.condition.text;
        let windspeedf = fetch1.data.current.wind_mph;


        img1.src = `${condition.toLowerCase()}.png`;
        tempc.innerHTML = `${tempreture_c} <sup>o C</sup>`
        temptype.innerText = condition;
        dayanddate.innerText = `${day1} - ${date}`;
        city1.innerText = city;
        windspeed.innerText = `${windspeedf}MPH`;

        

        let smlday = fetch1.data.current.is_day + 1;
        fetch1.data.forecast.forecastday.forEach(forecastDay => {
            let temp = document.createElement("div");
            temp.classList.add("upper");
            temp.id = "after1";
            temp.innerHTML = `
                <p id="dateday">${getday(smlday++)}</p>
                <img src="${forecastDay.day.condition.text.toLowerCase()}.png" alt="" id="miniimage">
                <div id="coloreddata">
                    <p>${forecastDay.day.maxtemp_c}°C</p>
                    <p>${forecastDay.day.maxtemp_f}°F</p>
                </div>`;
            
            top1.appendChild(temp);
        });


    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

let getday = function (x){

    if (x ==0){
        return "Sunday"
    }else if (x ==1){
        return "Monday" 
    }
    else if (x ==2){
        return "tuesday" 
    }
    else if (x ==3){
        return "Wednesday" 
    }
    else if (x ==4){
        return "Thursday" 
    }
    else if (x ==5){
        return "Friday" 
    }
    else if (x ==6){
        return "Saturday" 
    }else if (x ==7){
        return "Sunday" 
    }

}

