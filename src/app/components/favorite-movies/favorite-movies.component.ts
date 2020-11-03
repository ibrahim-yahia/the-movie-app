import {Component, OnInit} from '@angular/core';
import {FavoriteMoviesService} from '../../services/favorite-movies.service';
import {Movie} from '../../model/movie.model';
import {ConfigApiService} from '../../services/api/config-api.service';

@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.scss']
})
export class FavoriteMoviesComponent implements OnInit {
  movies: Movie[];
  posterImageBaseUrl: string;

  constructor(private config: ConfigApiService,
              private favorites: FavoriteMoviesService) {
  }

  ngOnInit(): void {
    this.posterImageBaseUrl = this.config.getPosterImageBaseUrl();
    this.movies = this.favorites.getMovies();
  }

  removeFromFavorite(movie: Movie): void {
    this.favorites.deleteMovie(movie);
    this.movies = this.favorites.getMovies();
  }
}
