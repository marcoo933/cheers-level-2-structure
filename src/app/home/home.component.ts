import { Component } from '@angular/core';
import { Cocktail } from '../shared/interface'; // Importing Cocktail interface from shared directory
import { CocktailService } from '../services/cocktail.service'; // Importing CocktailService for data fetching
import { CommonModule } from '@angular/common';
import { CocktailComponent } from '../shared/cocktail/cocktail.component'; // Importing CocktailComponent for cocktail display
import { FormsModule } from '@angular/forms';
import { FilterboxComponent } from './filterbox/filterbox.component'; // Importing FilterboxComponent for filtering functionality

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, CocktailComponent, FilterboxComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  cocktails: Cocktail[] = []; // Array to hold all cocktails
  filteredCocktails: Cocktail[] = []; // Array to hold filtered cocktails based on search term
  searchTerm: string = ''; // Variable to hold the search term entered by the user
  favoriteChange: boolean = true; // Flag to indicate if favorites filter is active

  constructor(private cocktailService: CocktailService) { } // Dependency injection of CocktailService

  ngOnInit(): void {
    // Lifecycle hook called after component initialization
    this.cocktailService.getCocktails().subscribe(data => {
      // Fetch cocktails from CocktailService
      this.cocktailService.cocktailList = data; // Update cocktail list in CocktailService
      this.cocktails = data; // Initialize cocktails array with fetched data
      this.filteredCocktails = data; // Initialize filtered cocktails array with fetched data
    });
  }

  updateSearchTerm(searchTerm: string) {
    // Method to update search term and filter cocktails
    this.searchTerm = searchTerm; // Update search term with input value
    this.filterCocktails(); // Filter cocktails based on updated search term
  }

  toggleFavorites(active: boolean) {
    // Method to toggle favorites filter
    if (active) {
      this.filteredCocktails = this.cocktailService.favoriteList; // Apply favorites filter
    } else {
      this.filteredCocktails = this.cocktails; // Show all cocktails
    }
  }

  toggleFavorite() {
    // Method to toggle favorite change flag
    this.favoriteChange = !this.favoriteChange; // Toggle favoriteChange flag
  }

  filterCocktails(): void {
    // Method to filter cocktails based on search term
    const searchTermLower = this.searchTerm.toLowerCase(); // Convert search term to lowercase
    this.filteredCocktails = this.cocktails.filter(cocktail =>
      cocktail.name.toLowerCase().includes(searchTermLower) // Filter cocktails by name containing search term
    );
  }
}
