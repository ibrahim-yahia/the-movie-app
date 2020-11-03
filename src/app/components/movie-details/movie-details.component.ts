import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MovieApiService} from '../../services/api/movie-api.service';
import {Movie} from '../../model/movie.model';
import {Crew} from '../../model/crew.model';
import {ConfigApiService} from '../../services/api/config-api.service';

enum CrewJob {
  DIRECTOR = 'Director',
  SCREENPLAY = 'Screenplay',
  NOVEL = 'Novel',
  STORY = 'Story',
}

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  movie: Movie;
  directors: Crew[];
  screenplays: Crew[];
  writers: Crew[];
  posterImageBaseUrl: string;
  isFavorite: boolean;

  constructor(private config: ConfigApiService,
              private movieApi: MovieApiService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.posterImageBaseUrl = this.config.getPosterImageBaseUrl();
    const movieId = +this.route.snapshot.paramMap.get('id');
    this.movieApi.getMovieDetails(movieId).subscribe((movie) => this.movie = movie);
    this.getFeaturedCrew(movieId);
  }

  addToFavorites(): void {
    this.isFavorite = !this.isFavorite;
  }

  private getFeaturedCrew(movieId: number): void {
    this.movieApi.getMovieCredits(movieId).subscribe((credits) => {
      const featuredCrew = credits.crew.filter(
        crew => crew.job === CrewJob.DIRECTOR || crew.job === CrewJob.SCREENPLAY ||
          crew.job === CrewJob.NOVEL || crew.job === CrewJob.STORY
      );
      this.directors = featuredCrew.filter(crew => crew.job === CrewJob.DIRECTOR);
      this.screenplays = featuredCrew.filter(crew => crew.job === CrewJob.SCREENPLAY);
      this.writers = featuredCrew.filter(crew => crew.job === CrewJob.NOVEL || crew.job === CrewJob.STORY);
    });
  }
}
