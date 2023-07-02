import { Component } from '@angular/core';
import { WeatherDataService } from 'src/app/services/weather-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private _weatherDataService: WeatherDataService) {}
  DefaultLocationValue: string = '';
  setDefaultLocation() {
    this._weatherDataService.setDefaultLocation(this.DefaultLocationValue);
  }
}
