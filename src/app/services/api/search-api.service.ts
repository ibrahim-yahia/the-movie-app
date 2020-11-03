import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HttpService} from '../common/http.service';
import {Page} from '../../model/page.model';
import {Movie} from '../../model/movie.model';


@Injectable({
  providedIn: 'root'
})
export class SearchApiService {
  private readonly apiController: string = 'search/movie';

  constructor(private api: HttpService) {
  }

  searchMovies(searchTerm: string, pageNumber?: number): Observable<Page<Movie>> {
    pageNumber = pageNumber && pageNumber > 0 ? pageNumber : 1;
    const params = new HttpParams()
      .set('query', searchTerm)
      .set('page', pageNumber.toString());
    return this.api.get(this.apiController, params);
  }
}
