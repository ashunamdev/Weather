let loc = document.getElementById("location");
let tempIcon = document.getElementById("temp-icon");
let tempValue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let iconFile;

window.addEventListener("load", ()=> {
    let long;
    let lat;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";
           
           //appi not working now
            // const api=`${proxy}api.openweathermap.org/data/2.5/weather?q={city name}&appid={7d93d5e5f561e8ff36d827890d6b238d}`
            // const api = `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid={12163a331ab780b1f7af8a43b44d24c1}`;
            // const api = `http://dataservice.accuweather.com/locations/v1/cities/search`
            // const api = `https://climacell-microweather-v1.p.rapidapi.com/weather/realtime`
            fetch(`https://climacell-microweather-v1.p.rapidapi.com/weather/realtime?lat=${lat}&lon=${long}&fields=precipitation`, {
            	"method": "GET",
        	"headers": {
	    	"x-rapidapi-key": "1aac81894emsh6cc9192f09a56e8p15d953jsnac292f5a9f92",
	    	"x-rapidapi-host": "climacell-microweather-v1.p.rapidapi.com"
	                }
            })
            .then((response) => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const {name} = data;
                const {feels_Like} = data.main;
                const{id, main} = data.weather[0];
                loc.textContent = name;   
                climate.textContent = main;
                tempValue.textContent = Math.round(feels_Like-273);
                if (id< 250) {
                    tempIcon.src = './icon/storm.png'
                }
                else if (id < 350) {
                    tempIcon.src = './icon/drizzle.png'
                }
                else if (id < 550) {
                    tempIcon.src = './icon/rain.png'
                }    
                else if (id < 650) {
                    tempIcon.src = './icon/snow.png'
                }    
                else if (id < 800) {
                    tempIcon.src = './icon/atmosphere.png'
                }    
                else if (id === 800) {
                    tempIcon.src = './icon/clear.png'
                }
                else if (id > 800) {
                    tempIcon.src = './icon/clouds.png'
                }
                console.log(data);
            })
        })
    }
})