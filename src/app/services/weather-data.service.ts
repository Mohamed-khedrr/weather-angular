import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherDataService {
  constructor(private _httpClient: HttpClient) {}

  baseUrl = 'https://api.weatherapi.com/v1/forecast.json?';
  publicKey = '114a3959d7274e1585e171953223101';

  private handleError(error: HttpErrorResponse) {
    // Generic Error handler
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
      // Return an observable with a user-facing error message.
      return throwError(() => new Error('Error occured, please try again'));
    } else {
      return throwError(() => new Error('Not a correct location'));
    }
  }

  getWeatherData(location: string): Observable<any> {
    return this._httpClient
      .get<any>(`${this.baseUrl}key=${this.publicKey}&q=${location}&days=3`)
      .pipe(retry(2), catchError(this.handleError));
  }
}
