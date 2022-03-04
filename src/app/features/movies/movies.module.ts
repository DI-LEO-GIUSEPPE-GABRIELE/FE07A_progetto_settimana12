import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MoviesPage } from './movies.page';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { MoviesDetailsPage } from './movies-details.page';

const routes: Routes = [
  {
    canActivate:[AuthGuard],
     path: '', component: MoviesPage
},
{
  canActivate:[AuthGuard],
   path: 'movies-details',
    component: MoviesDetailsPage
}
];

@NgModule({
  declarations: [MoviesPage, MoviesDetailsPage],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class MoviesModule {}
