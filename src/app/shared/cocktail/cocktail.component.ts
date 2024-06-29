import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Cocktail } from '../interface'; // Importing the Cocktail interface from the interface file
import { CommonModule } from '@angular/common';
import { CocktailService } from '../../services/cocktail.service'; // Importing CocktailService for interacting with cocktails data
import { HomeComponent } from '../../home/home.component'; // Importing HomeComponent for routing purposes

@Component({
  selector: 'app-cocktail',
  standalone: true,
  imports: [CommonModule, RouterModule, HomeComponent],
  templateUrl: './cocktail.component.html',
  styleUrl: './cocktail.component.scss'
})
export class CocktailComponent {
  @Input() cocktail: Cocktail; // Input property to receive cocktail object from parent component
  @Output() onFavoriteChange = new EventEmitter<null>(); // Output event emitter for notifying parent about favorite change
  isFavorite: boolean = false; // Flag to indicate if the cocktail is marked as favorite
  cocktailId: string; // ID of the current cocktail
  favorites: string[] = []; // Array to store IDs of favorite cocktails
  isDetail: boolean = false; // Flag to indicate if the component is in detail view

  constructor(
    private route: ActivatedRoute, // Injecting ActivatedRoute for accessing route parameters
    private cocktailService: CocktailService // Injecting CocktailService for data operations
  ) { }

  ngOnInit(): void {
    // Subscribe to route parameters to get the cocktail ID from the URL
    this.route.paramMap.subscribe(params => {
      this.cocktailId = params.get('id') || '';
      if (this.cocktailId) {
        // If cocktail ID is present, fetch cocktail details
        this.isDetail = true; // Set detail view flag to true
        this.cocktailService.getCocktailDetail(this.cocktailId).subscribe(cocktail => {
          this.cocktail = cocktail; // Assign fetched cocktail details to component property
          this.updateFavorite(); // Update favorite status after fetching details
        });
      }
    });
    if (this.cocktail) this.updateFavorite(); // Update favorite status if cocktail object is already present
  }

  // Method to toggle favorite status of a cocktail
  toggleFavorite(cocktailId: string): void {
    this.cocktailService.favorite = cocktailId; // Set or unset cocktail as favorite in service
    this.updateFavorite(); // Update favorite status locally
    this.onFavoriteChange.emit(); // Emit event to notify parent component about favorite change
  }

  // Method to update favorite status of the current cocktail
  updateFavorite() {
    this.isFavorite = this.cocktailService.isFavorite(this.cocktail.id); // Check if current cocktail is favorite
  }
}
