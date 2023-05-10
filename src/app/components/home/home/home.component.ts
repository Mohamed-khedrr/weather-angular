import { Component } from '@angular/core';
import { WeatherDataService } from 'src/app/services/weather-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private _weatherDataService: WeatherDataService) {}
  defaultLocation: any;

  ngOnInit(): void {
    this.defaultLocation = 'cairo';
    this.setLocation(null);
  }

  days: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  da = new Date().getDay();
  mo = new Date().getMonth();
  date = new Date().getDate();
  response: any;

  setLocation(e: any) {
    this._weatherDataService
      .getWeatherData(e?.target.value ?? this.defaultLocation)
      .subscribe((response) => (this.response = response));
  }
}

/*
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const da = new Date().getDay(); //FIX
const mo = new Date().getMonth();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const todayTemp = document.querySelector('#today-temp');
const todayText = document.querySelector('#today-text');
const locat = document.querySelector('#location');
const day = document.querySelector('#day');
const date = document.querySelector('#date')
const secDay = document.querySelector('#sec-day')
const thirdDay = document.querySelector('#third')
const secMaxTemp = document.querySelector('#sec-max-temp')
const secMinTemp = document.querySelector('#sec-min-temp')
const secDayText = document.querySelector('#sec-day-text')
const thirdMaxTemp = document.querySelector('#third-max-temp')
const thirdMinTemp = document.querySelector('#third-min-temp')
const thirdDayText = document.querySelector('#third-day-text')
const thirdDayIcon = document.querySelector('#third-day-icon')
const secDayIcon = document.querySelector('#sec-day-icon')
const todayIcon = document.querySelector('#today-icon')
const searchInput = document.querySelector('#search')
const searchButton = document.querySelector('#search-button')


// ================== Fetch Api =======================

myHttp()


async function myHttp(country = "cairo") {

    try {
        let x = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=114a3959d7274e1585e171953223101&q=${country}&days=3`)
        let response = await x.json();
        todayText.innerHTML = response.current.condition.text;
        todayTemp.innerHTML = `${response.current.temp_c}°C`
        locat.innerHTML = response.location.name

        day.innerHTML = days[da] FIX
        date.innerHTML = new Date().getDate() + " " + months[mo]
        secDay.innerHTML = days[da + 1];
        thirdDay.innerHTML = days[da + 2];

        secMaxTemp.innerHTML = response.forecast.forecastday[1].day.maxtemp_c + "°C";
        secMinTemp.innerHTML = response.forecast.forecastday[1].day.mintemp_c + "°C";
        secDayText.innerHTML = response.forecast.forecastday[1].day.condition.text;
        thirdMaxTemp.innerHTML = response.forecast.forecastday[2].day.maxtemp_c + "°C";
        thirdMinTemp.innerHTML = response.forecast.forecastday[2].day.mintemp_c + "°C"
        thirdDayText.innerHTML = response.forecast.forecastday[2].day.condition.text;
        thirdDayIcon.setAttribute('src', "https:" + response.forecast.forecastday[2].day.condition.icon)
        secDayIcon.setAttribute('src', "https:" + response.forecast.forecastday[1].day.condition.icon)
        todayIcon.setAttribute('src', "https:" + response.current.condition.icon)

    } catch (error) {
    }


}

// ================== Search ======================
searchInput.addEventListener('keydown', getCountry);
searchButton.addEventListener("click", getCountry)
function getCountry() {
    country = searchInput.value;
    myHttp(country)
}

*/
