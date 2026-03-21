import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import {TextareaModule } from 'primeng/textarea'


interface Movie {
  id: number;
  title: string;
  genre: string;
  rating: number;
  watched: boolean;
  notes: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ButtonModule,
    TableModule,
    InputTextModule,
    FormsModule,
    RatingModule,
    SelectModule,
    TagModule,
    TextareaModule
],
  templateUrl: './app.html',

})
export class App {
  movieTitle = '';
  movieGenre = '';
  movieRating = 0;
  nextId = 0;
  notes ='';
  movies = signal<Movie[]>([]);
  genres = [
    {label: 'Action', value: 'Action'},
    {label: 'Horror', value: 'Horror'},
    {label: 'Comedy', value: 'Comedy'},
    {label: 'Romance', value: 'Romance'},
    {label: 'Drama', value: 'Drama'},
    {label: 'Sci-Fi', value: 'Sci-Fi'},
  ];
  filterGenre = '';

  get filteredMovies(){
    if(!this.filterGenre){
      return this.movies();
    }
    return this.movies().filter(m => m.genre === this.filterGenre);
  }

  addMovie(){
    const title = this.movieTitle.trim();
    if(!title) return;
    if(!this.movieGenre) return;
    this.movies.update(movieList => [
      ...movieList,
      {
        id: this.nextId,
        title: title,
        genre: this.movieGenre,
        rating: this.movieRating,
        watched: false,
        notes: this.notes
      }
    ]);
    this.nextId++;
    this.movieTitle = '';
    this.movieGenre = '';
    this.movieRating = 0;
    this.notes = '';
  }

  ifWatched(movie: Movie){
    this.movies.update(movieList => 
      movieList.map(m => {
        if(m.id !== movie.id) return m;
          return {...m, watched: !m.watched };
      })
    );
  }
  deleteMovie(id: number){
    this.movies.update(movieList => movieList.filter(m => m.id !== id));
  }
}

