import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from '../common/http.service';
import {Page} from '../../model/page.model';
import {Movie} from '../../model/movie.model';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {
  private readonly apiController: string = 'movie/upcoming';

  constructor(private api: HttpService) { }

  getUpcomingMovies(pageNumber?: number): Observable<Page<Movie>> {
    pageNumber = pageNumber && pageNumber > 0 ? pageNumber : 1;
    const params = new HttpParams().set('page', pageNumber.toString());
    return this.api.get(this.apiController, params);
  }
}
