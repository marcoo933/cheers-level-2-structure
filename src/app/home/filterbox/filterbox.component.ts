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
  @Input() favoriteChange = true;
  @Output() searchTermChange = new EventEmitter<string>();
  @Output() showFavoriteChange = new EventEmitter<boolean>();
  searchTerm: string = '';
  showFavorites: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['favoriteChange'] && this.showFavorites) {
      this.showFavoriteChange.emit(this.showFavorites);
    }
  }

  onShowFavoriteChange() {
    this.showFavorites = !this.showFavorites;
    this.searchTerm = '';
    this.showFavoriteChange.emit(this.showFavorites);
  }

  onSearchTermChange() {
    this.showFavorites = false;
    this.searchTermChange.emit(this.searchTerm);
  }
}
