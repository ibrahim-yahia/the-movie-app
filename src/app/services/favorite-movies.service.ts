import {Injectable} from '@angular/core';
import {Movie} from '../model/movie.model';

@Injectable({
  providedIn: 'root'
})
export class FavoriteMoviesService {
  private moviesMap: Map<number, Movie> = new Map<number, Movie>();

  constructor() {
  }

  addMovie(movie: Movie): void {
    this.moviesMap.set(movie.id, movie);
  }

  deleteMovie(movie: Movie): boolean {
    return this.moviesMap.delete(movie.id);
  }

  getMovies(): Movie[] {
    return Array.from(this.moviesMap.values());
  }

  contains(movie: Movie): boolean {
    return movie && this.moviesMap.has(movie.id);
  }
}
