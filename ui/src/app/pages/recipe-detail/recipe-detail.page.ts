import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentfulService } from 'src/app/contentful/contentful.service';
import { Recipe } from 'src/app/models/recipe';
import { LinkifyPipe } from 'src/app/pipes/linkify.pipe';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {
  recipe: Recipe = new Recipe();
  id: string;
  title: string[] = [];
  subtitle: string;
  private description: string;

  constructor(
    private contentfulService: ContentfulService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ionViewWillEnter() {
    this.contentfulService?.getRecipeById(this.id).then(res => {
      this.recipe = res;
      this.description = this.formatText(this.recipe?.getDescription());
      this.title = this.recipe.getTitle().split(/(?=with)/);
    }).catch(err => console.error(err));
  }

  formatText(text: string) {
    let formattedText = '';
    const linkifyPipe = new LinkifyPipe();
    formattedText = text.replace(/\*(.*?)\*/gm, '<strong>$1</strong>');
    formattedText = formattedText.replace(/\_\_(.*?)\_\_/gm, '<i>$1</i>');
    formattedText = formattedText.replace('[VIDEO]', '');
    formattedText = linkifyPipe.transform(formattedText);
    return formattedText;
  }
}
