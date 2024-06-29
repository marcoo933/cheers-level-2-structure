import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filterbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filterbox.component.html',
  styleUrl: './filterbox.component.scss'
})
export class FilterboxComponent {
  @Output() searchTermChange = new EventEmitter<string>();
  @Output() showFavoriteChange = new EventEmitter<boolean>();
  searchTerm: string = '';
  showFavorites: boolean = false;

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
