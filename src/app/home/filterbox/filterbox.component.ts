import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filterbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filterbox.component.html',
  styleUrl: './filterbox.component.scss'
})
export class FilterboxComponent {
  @Input() favoriteChange = true; // Input property to receive favoriteChange boolean from parent component
  @Output() searchTermChange = new EventEmitter<string>(); // Output event emitter for notifying parent about search term change
  @Output() showFavoriteChange = new EventEmitter<boolean>(); // Output event emitter for notifying parent about show favorite change
  searchTerm: string = ''; // Variable to hold the search term entered by the user
  showFavorites: boolean = false; // Flag to indicate whether to show favorite items

  ngOnChanges(changes: SimpleChanges) {
    // Lifecycle hook called when input properties change
    if (changes['favoriteChange'] && this.showFavorites) {
      // If favoriteChange input changes and showFavorites is true
      this.showFavoriteChange.emit(this.showFavorites); // Emit event to notify parent about showFavorites change
    }
  }

  onShowFavoriteChange() {
    // Method called when user toggles showFavorites
    this.showFavorites = !this.showFavorites; // Toggle showFavorites flag
    this.searchTerm = ''; // Reset search term
    this.showFavoriteChange.emit(this.showFavorites); // Emit event to notify parent about showFavorites change
  }

  onSearchTermChange() {
    // Method called when search term changes
    this.showFavorites = false; // Set showFavorites to false
    this.searchTermChange.emit(this.searchTerm); // Emit event to notify parent about search term change
  }
}
