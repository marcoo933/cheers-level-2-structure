import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cocktail } from '../shared/interface'; // Importing the Cocktail interface from shared folder

@Injectable({
  providedIn: 'root'
})
export class CocktailService {
  private apiUrl: string = '/cockails'; // API endpoint for cocktails
  private favorites: string[] = []; // Array to store favorite cocktail IDs
  private cocktails: Cocktail[] = []; // Array to store all cocktails

  // Getter for retrieving the list of cocktails
  get cocktailsList(): Cocktail[] {
    return this.cocktails;
  }

  // Setter for updating the list of cocktails
  set cocktailList(cocktails: Cocktail[]) {
    this.cocktails = cocktails;
  }

  // Setter for adding or removing a cocktail from favorites
  set favorite(cocktailId: string) {
    const index = this.favorites.indexOf(cocktailId);
    if (index === -1) {
      // Add to favorites if not already present
      this.favorites.push(cocktailId);
    } else {
      // Remove from favorites if already present
      this.favorites.splice(index, 1);
    }
    // Store updated favorites in local storage
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  // Getter for retrieving the list of favorite cocktail IDs from local storage
  get favorite(): string[] {
    const favoritesString = localStorage.getItem('favorites');
    if (favoritesString) {
      this.favorites = JSON.parse(favoritesString);
    }
    return this.favorites;
  }

  // Getter for retrieving the list of favorite cocktails based on stored IDs
  get favoriteList(): Cocktail[] {
    return this.favorite
      .map(id => this.cocktails.find(c => c.id === id))
      .filter((cocktail): cocktail is Cocktail => cocktail !== undefined);
  }

  constructor(private http: HttpClient) { }

  // Method to fetch all cocktails from the API
  getCocktails(): Observable<Cocktail[]> {
    return this.http.get<Cocktail[]>(this.apiUrl);
  }

  // Method to fetch details of a specific cocktail using its ID
  getCocktailDetail(cocktailId: string): Observable<Cocktail> {
    return this.http.get<Cocktail>(this.apiUrl + '/' + cocktailId);
  }

  // Method to check if a cocktail is marked as favorite
  isFavorite(cocktailId: string): boolean {
    return this.favorites.includes(cocktailId);
  }
}
