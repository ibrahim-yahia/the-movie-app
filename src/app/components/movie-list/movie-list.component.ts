import {Component, OnInit} from '@angular/core';
import {MovieApiService} from '../../services/api/movie-api.service';
import {Page} from '../../model/page.model';
import {Movie} from '../../model/movie.model';
import {ConfigApiService} from '../../services/api/config-api.service';
import {Observable} from "rxjs";
import {SearchApiService} from "../../services/api/search-api.service";

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
              private searchApi: SearchApiService) {
  }

  ngOnInit(): void {
    this.posterImageBaseUrl = this.config.getPosterImageBaseUrl();
    this.getMoviesPage();
  }

  searchMovies($event: any): void {
    if (this.searchTerm === $event.target.value) {
      return;
    }
    this.searchTerm = $event.target.value;
    this.getMoviesPage();
  }

  getMoviesPage(pageNumber?: number): void {
    this.getApi(pageNumber).subscribe((moviesPage) => {
      this.moviesPage = moviesPage;
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

  showMovieDetails(): void {
    console.log('hiiiii');
  }
}
