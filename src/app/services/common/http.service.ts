import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private readonly options: any = {};

  get apiUrl(): string {
    return environment.movieApiBaseUrl;
  }

  constructor(private http: HttpClient) {
  }

  get(endpoint: string, params?: HttpParams): Observable<any> {
    params = params ? params : new HttpParams();
    this.options.params = params.set('api_key', environment.movieApiKey);
    return this.http.get(`${this.apiUrl}/${endpoint}`, this.options);
  }

  post(endpoint: string, data): Observable<any> {
    return this.http.post(`${this.apiUrl}/${endpoint}`, data, this.options);
  }

  put(endpoint: string, data): Observable<any> {
    return this.http.put(`${this.apiUrl}/${endpoint}`, data, this.options);
  }

  delete(endpoint: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${endpoint}`, this.options);
  }
}
