import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { Favourite } from 'src/app/models/favourite';
import { catchError, take } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { AuthData, AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  baseURL = 'http://localhost:4201/api/movies-popular';
  UrlFav = 'http://localhost:4201/api/favourites';
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

  // async addFavorites(movie: Movie) {
  //   const user: AuthData = (await this.authSrv.user$
  //     .pipe(take(1))
  //     .toPromise()) as AuthData;
  //   this.preferiti.push(movie);
  //   movie.like = true;
  //   this.http.post<Favourite>('http://localhost:4201/api/favourites', {
  //     userId: user.user.id,
  //     movieId: movie.id,
  //   });
  // }

  async addFavorite(movie: Movie) {
    const user: AuthData = (await this.authSrv.user$
      .pipe(take(1))
      .toPromise()) as AuthData;
    this.preferiti.push(movie);
    movie.like = true;
    const data: Favourite = {
      movieId: movie.id,
      userId: user.user.id,
      id: 1,
    };
    console.log(data);
    return this.http.post<Favourite>(
      'http://localhost:4201/api/favourites',
      data
    );
  }

  // async addFavorites(movieId: number) {
  //   const user = (await this.authSrv.user$.pipe(take(1)).toPromise()) as AuthData;
  //   console.log(user.user.id);
  //   return this.http.post<Favourite>('http://localhost:4201/api/favourites', {
  //     userId: user.user.id,
  //     movieId
  //   })
  // }

  removeFavourite(movie: Movie) {
    this.preferiti.splice(this.preferiti.indexOf(movie), 1);
    this.favoritesCounter--;
    movie.like = false;
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
