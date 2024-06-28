import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Cocktail } from '../shared/interface';
import { CocktailService } from '../services/cocktail.service';
import { CommonModule } from '@angular/common';
import { CocktailComponent } from '../shared/cocktail/cocktail.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,CocktailComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  cocktails: Cocktail[] = [];
  filteredCocktails: Cocktail[] = [];
  searchTerm: string = '';

  constructor(private cocktailService: CocktailService) { }

  ngOnInit(): void {
    this.cocktailService.getCocktails().subscribe(data => {
      this.cocktails = data;
      this.filteredCocktails = data;
    });
  }

  filterCocktails(): void {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredCocktails = this.cocktails.filter(cocktail =>
      cocktail.name.toLowerCase().includes(searchTermLower)
    );
  }
}

