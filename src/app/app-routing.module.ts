import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MovieListComponent} from './components/movie-list/movie-list.component';
import {MovieDetailsComponent} from './components/movie-details/movie-details.component';
import {FavoriteMoviesComponent} from './components/favorite-movies/favorite-movies.component';

const routes: Routes = [
  {path: 'movie/:id', component: MovieDetailsComponent},
  {path: 'movies', component: MovieListComponent},
  {path: 'favorites', component: FavoriteMoviesComponent},
  {path: '', redirectTo: '/movies', pathMatch: 'full'},
  {path: '**', redirectTo: '/movies'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
