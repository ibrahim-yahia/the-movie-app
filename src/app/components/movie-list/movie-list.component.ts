import {Component, OnInit} from '@angular/core';
import {MovieApiService} from '../../services/api/movie-api.service';
import {Page} from '../../model/page.model';
import {Movie} from '../../model/movie.model';
import {ConfigApiService} from '../../services/api/config-api.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  searchTerm: string;
  moviesPage: Page<Movie>;
  posterImageBaseUrl: string;

  constructor(private movieApi: MovieApiService, private config: ConfigApiService) {
  }

  ngOnInit(): void {
    this.posterImageBaseUrl = this.config.getPosterImageBaseUrl();
    this.movieApi.getUpcomingMovies().subscribe((moviesPage) => this.moviesPage = moviesPage);
  }

  getMoviesPage(pageNumber: number): void {
    this.movieApi.getUpcomingMovies(pageNumber).subscribe((moviesPage) => this.moviesPage = moviesPage);
  }

  searchMovies($event: any): void {
    if (!this.searchTerm) {
      return;
    }
    console.log($event.target.value);
    console.log(this.searchTerm);
  }

  showMovieDetails(): void {
    console.log('hiiiii');
  }
}
