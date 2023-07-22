import { Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { WeatherDataService } from 'src/app/services/weather-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    private _weatherDataService: WeatherDataService,
    private renderer: Renderer2
  ) {}

  defaultLocation: any;
  ngOnInit(): void {
    this.defaultLocation =
      this._weatherDataService.getDefaultLocation() || 'cairo';
    this.getData(null);
  }

  loading: boolean = false;
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

  response: any;

  validateDayNum(day: number) {
    return day + 1 < 7 ? day + 1 : day + 1 - 7;
  }

  getDayName(response: any, objNum: number) {
    const currentDate = response.forecast.forecastday[objNum].date;
    const currentDay = new Date(currentDate);
    return this.days[this.validateDayNum(currentDay.getDay() - 1)];
  }

  getDayNumber(response: any, objNum: number) {
    const currentDate = response.forecast.forecastday[objNum].date;
    const currentDay = new Date(currentDate);
    return currentDay.getDate();
  }
  getMonthName(response: any, objNum: number) {
    const currentDate = response.forecast.forecastday[objNum].date;
    const currentDay = new Date(currentDate);
    return this.months[currentDay.getMonth()];
  }

  // debounce requests
  debounce(callback: Function, delay: number = 1000) {
    let timeOut: NodeJS.Timeout;

    return (...args: any[]) => {
      clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        callback.apply(this, args);
      }, delay);
    };
  }

  // giving debounce the callback function
  debounceGeneration = this.debounce(this.getData);

  // sending request and subscribe response
  getData(event: any) {
    this._weatherDataService
      .getWeatherData(event?.target.value || this.defaultLocation)
      .subscribe((response) => {
        this.response = response;
      });
    this.loading = false;
  }

  // Keyup function
  setLocation(e: any) {
    this.loading = true;
    this.debounceGeneration(e);
  }
}
