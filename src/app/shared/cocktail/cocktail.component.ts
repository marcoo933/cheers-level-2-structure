import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Cocktail } from '../interface';
import { CommonModule } from '@angular/common';
import { CocktailService } from '../../services/cocktail.service';
import { HomeComponent } from '../../home/home.component';


@Component({
  selector: 'app-cocktail',
  standalone: true,
  imports: [CommonModule, RouterModule, HomeComponent],
  templateUrl: './cocktail.component.html',
  styleUrl: './cocktail.component.scss'
})
export class CocktailComponent {
  @Input() cocktail: Cocktail;
  @Output() onFavoriteChange = new EventEmitter<null>();
  isFavorite: boolean = false;
  cocktailId: string;
  favorites: string[] = [];
  isDetail: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coktailService: CocktailService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.cocktailId = params.get('id') || '';
      if(this.cocktailId) {
        this.isDetail = true;
        this.coktailService.getCocktailDetail(this.cocktailId).subscribe(cocktail => {
          this.cocktail = cocktail
          this.updateFavorite();
        });
      }
    });
    if (this.cocktail) this.updateFavorite();
  }

  toggleFavorite(cocktailId: string): void {
    this.coktailService.favorite = cocktailId;
    this.updateFavorite();
    this.onFavoriteChange.emit();
  }

  updateFavorite() {
    this.isFavorite = this.coktailService.isFavorite(this.cocktail.id);
  }



}
