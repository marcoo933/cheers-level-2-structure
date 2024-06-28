import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CocktailService } from './services/cocktail.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterModule ],
  templateUrl: 'app.component.html',
})
export class AppComponent {

  constructor(public cocktailService: CocktailService) {
    this.cocktailService.favorite; // get favorites on page refresh from session
  }
}
