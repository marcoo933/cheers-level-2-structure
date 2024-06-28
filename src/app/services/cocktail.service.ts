import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cocktail } from '../shared/interface';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {
  private apiUrl: string = '/cockails';
  private favorites: string[] = [];

  set favorite(cocktailId: string) {
    const index = this.favorites.indexOf(cocktailId);
    if (index === -1) {
      this.favorites.push(cocktailId);
    } else {
      this.favorites.splice(index, 1);
    }
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  get favorite(): string[] {
    const favoritesString = localStorage.getItem('favorites');
    if (favoritesString) {
      this.favorites = JSON.parse(favoritesString);
    }
    return this.favorites;
  }

  constructor(private http: HttpClient) { }

  getCocktails(): Observable<Cocktail[]> {
    return this.http.get<Cocktail[]>(this.apiUrl);
  }

  getCocktailDetail(cocktailId: string): Observable<Cocktail> {
    return this.http.get<Cocktail>(this.apiUrl + '/' + cocktailId);
  }

  isFavorite(cocktailId: string): boolean {
    return this.favorites.includes(cocktailId);

  }
}
