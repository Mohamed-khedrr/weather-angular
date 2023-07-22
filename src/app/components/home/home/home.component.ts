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

  da = new Date().getDay();
  mo = new Date().getMonth();
  date = new Date().getDate();
  response: any;

  debounce(callback: Function, delay: number = 1000) {
    let timeOut: NodeJS.Timeout;

    return (...args: any[]) => {
      clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        callback.apply(this, args);
      }, delay);
    };
  }

  debounceGeneration = this.debounce(this.getData);

  getData(event: any) {
    this._weatherDataService
      .getWeatherData(event?.target.value || this.defaultLocation)
      .subscribe((response) => {
        this.response = response;
      });
    this.loading = false;
  }

  setLocation(e: any) {
    this.loading = true;
    this.debounceGeneration(e);
  }
}
