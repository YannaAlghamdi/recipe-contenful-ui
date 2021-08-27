import { Component } from '@angular/core';
import { ContentfulService } from 'src/app/contentful/contentful.service';
import { ListOpts } from 'src/app/models/list-opts';
import { Recipe } from 'src/app/models/recipe';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage {
  recipes: Array<Recipe> = new Array<Recipe>();
  listOpts: ListOpts;

  constructor(private contentfulService: ContentfulService) {}

  ionViewWillEnter() {
    this.listOpts = new ListOpts()
      .withLimit(10)
      .withSkip(0);
    this.getRecipes(false, '');
  }

  getRecipes(isFirstLoad, event) {
    this.contentfulService.getRecipes(this.listOpts).then(res => {
      this.recipes.push(...res);
      if (isFirstLoad) {
          event.target.complete();
      }
      const newSkip = this.listOpts.getSkip() + 10;
      this.listOpts.withSkip(newSkip);
    });
  }

  load(event) {
    this.getRecipes(true, event);
  }
}
