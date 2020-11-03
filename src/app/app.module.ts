import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { FavoriteMoviesComponent } from './components/favorite-movies/favorite-movies.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import {ConfigApiService} from './services/api/config-api.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';


export const appInit = (configApiService: ConfigApiService) => () => configApiService.load();

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MovieListComponent,
    FavoriteMoviesComponent,
    MovieDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [ConfigApiService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      multi: true,
      deps: [ConfigApiService]
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
