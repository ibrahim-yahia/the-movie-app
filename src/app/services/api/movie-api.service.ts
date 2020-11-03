import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from '../common/http.service';
import {Page} from '../../model/page.model';
import {Movie} from '../../model/movie.model';
import {HttpParams} from '@angular/common/http';
import {Credits} from '../../model/credits.model';

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {
  private readonly apiController: string = 'movie';

  constructor(private api: HttpService) { }

  getUpcomingMovies(pageNumber?: number): Observable<Page<Movie>> {
    pageNumber = pageNumber && pageNumber > 0 ? pageNumber : 1;
    const params = new HttpParams().set('page', pageNumber.toString());
    return this.api.get(this.apiController + '/upcoming', params);
  }

  getMovieDetails(movieId: number): Observable<Movie> {
    return this.api.get(this.apiController + `/${movieId}`);
  }

  getMovieCredits(movieId: number): Observable<Credits> {
    return this.api.get(this.apiController + `/${movieId}/credits`);
  }
}
