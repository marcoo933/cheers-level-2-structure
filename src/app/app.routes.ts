import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CocktailComponent } from './shared/cocktail/cocktail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cocktail/:id', component: CocktailComponent }
];
