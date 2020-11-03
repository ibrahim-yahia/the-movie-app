import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {MovieApiService} from '../../services/api/movie-api.service';
import {Page} from '../../model/page.model';
import {Movie} from '../../model/movie.model';
import {ConfigApiService} from '../../services/api/config-api.service';
import {SearchApiService} from '../../services/api/search-api.service';
import {StateService} from '../../services/common/state.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  searchTerm: string;
  moviesPage: Page<Movie>;
  posterImageBaseUrl: string;

  constructor(private config: ConfigApiService,
              private movieApi: MovieApiService,
              private searchApi: SearchApiService,
              private state: StateService) {
  }

  ngOnInit(): void {
    this.searchTerm = this.state.map.get('searchTerm');
    this.posterImageBaseUrl = this.config.getPosterImageBaseUrl();
    this.getMoviesPage(this.state.map.get('pageNumber'));
  }

  searchMovies($event: any): void {
    if (this.searchTerm === $event.target.value) {
      return;
    }
    this.searchTerm = $event.target.value;
    this.state.map.set('searchTerm', this.searchTerm);
    this.state.map.set('pageNumber', 1);
    this.getMoviesPage();
  }

  getMoviesPage(pageNumber?: number): void {
    this.getApi(pageNumber).subscribe((moviesPage) => {
      this.moviesPage = moviesPage;
      this.state.map.set('pageNumber', moviesPage.page);
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    });
  }

  private getApi(pageNumber: number): Observable<Page<Movie>> {
    if (this.searchTerm) {
      return this.searchApi.searchMovies(this.searchTerm, pageNumber);
    }
    return this.movieApi.getUpcomingMovies(pageNumber);
  }
}
