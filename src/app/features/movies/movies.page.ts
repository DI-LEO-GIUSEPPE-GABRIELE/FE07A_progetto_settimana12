import { Component, OnInit } from '@angular/core';
import { MovieService } from './movies.service';
import { Movie } from 'src/app/models/movie';
import { HttpClient } from '@angular/common/http';

@Component({
  template: `
    <div class="container text-center">
      <div class="row justify-content-between">
        <div *ngFor="let movie of movies" class="card mt-5 p-3 bg-dark text-white rounded" style="width: 18rem; height: 40rem; margin: 0 auto; overflow-y:scroll;">
          <img
            class="img-fluid rounded"
            srcset="http://image.tmdb.org/t/p/w500{{movie.poster_path}}"
          />
          <div class="card-body">
            <h4 class="card-title">{{ movie.title }}</h4>
           <div class="card-text">
              <p class="card-text">{{ movie.overview }}</p>
              <p>{{ movie.popularity }}</p>
              <p>{{ movie.release_date }}</p>
           </div>
              <svg *ngIf="movie.like" (click)="unlike(movie)"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="red"
                class="bi bi-heart-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                />
              </svg>
              <svg *ngIf="!movie.like" (click)="like(movie)"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                class="bi bi-heart"
                viewBox="0 0 16 16"
              >
                <path
                  d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                />
              </svg>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    svg {
      cursor:pointer;
    }

    svg:hover {
      transform: scale(1.1)
    }
  `],
})
export class MoviesPage implements OnInit {
  constructor(private movieSrv: MovieService, private http: HttpClient) {}
  movies=this.movieSrv.movies;

  ngOnInit(): void {
    setInterval(() => {
      this.movies = this.movieSrv.movies;
    }, 20);
    if(!this.movies){
      this.movieSrv.getMovies();
    }
  }

  async like(movie: Movie) {
     await(await (this.movieSrv.addFavorite(movie))).toPromise();
  }

  unlike(movie: Movie) {
    this.movieSrv.removeFavourite(movie);
  }
}
