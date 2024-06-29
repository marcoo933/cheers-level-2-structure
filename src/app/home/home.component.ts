import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Cocktail } from '../shared/interface';
import { CocktailService } from '../services/cocktail.service';
import { CommonModule } from '@angular/common';
import { CocktailComponent } from '../shared/cocktail/cocktail.component';
import { FormsModule } from '@angular/forms';
import { FilterboxComponent } from './filterbox/filterbox.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,CocktailComponent, FormsModule, FilterboxComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  cocktails: Cocktail[] = [];
  filteredCocktails: Cocktail[] = [];
  searchTerm: string = '';
  favoriteChange: boolean = true;

  constructor(private cocktailService: CocktailService) { }

  ngOnInit(): void {
    this.cocktailService.getCocktails().subscribe(data => {
      this.cocktailService.cocktailList = data;
      this.cocktails = data;
      this.filteredCocktails = data;
    });
  }

  updateSearchTerm(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.filterCocktails();
  }

  toggleFavorites(active: boolean) {
    if (active) {
      this.filteredCocktails = this.cocktailService.favoriteList;
    } else {
      this.filteredCocktails = this.cocktails;
    }
  }

  toggleFavorite() {
    this.favoriteChange = !this.favoriteChange;
  }

  filterCocktails(): void {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredCocktails = this.cocktails.filter(cocktail =>
      cocktail.name.toLowerCase().includes(searchTermLower)
    );
  }
}

