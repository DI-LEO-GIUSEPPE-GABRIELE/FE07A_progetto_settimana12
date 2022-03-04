import { Component, OnInit } from '@angular/core';
import { MovieService } from './movies.service';
import { Movie } from 'src/app/models/movie';
import { Subscription } from 'rxjs';

@Component({
  template: `
    <p>
    {{ this.movies }}
    </p>
  `,
  styles: [`
  * {
    color:white;
  }
  `
  ]
})
export class MoviesDetailsPage implements OnInit {
  movies: Movie[] | undefined;


  constructor(private movieSrv: MovieService) { }

  ngOnInit(): void {
    this.movies = this.movieSrv.movies;
  }

}
