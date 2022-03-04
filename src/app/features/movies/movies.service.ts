import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { Favourite } from 'src/app/models/favourite';
import { catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  baseURL = 'http://localhost:4201/api/movies-popular';
  movies: Movie[] | undefined;
  preferiti: Movie[] = [];
  liked: boolean = false;
  favoritesCounter = 0;
  constructor(private http: HttpClient, private authSrv: AuthService) {}

  get() {
    return this.http.get<Movie[]>(`${this.baseURL}`).pipe(
      catchError((err) => {
        return throwError(this.getErrorMess(err.status));
      })
    );
  }

  getMovies(): void {
    this.http
      .get<Movie[]>('http://localhost:4201/api/movies-popular')
      .subscribe((res) => {
        this.movies = <Movie[]>res;
        console.log(this.movies[0].poster_path);
      });

  }
  addFavorite(movie: Movie) {
    this.preferiti.push(movie);
    this.favoritesCounter++;
    movie.like = true;


  }

  removeFavourite(movie: Movie) {
    this.preferiti.splice(this.preferiti.indexOf(movie), 1);
    this.favoritesCounter--;
    movie.like=false;
  }

  private getErrorMess(status: number) {
    let mess = '';
    switch (status) {
      case 404:
        mess = 'errore nella chiamata';
        break;

      default:
        mess = 'qualcosa non va controlla la connessione';
        break;
    }
    return mess;
  }
}
