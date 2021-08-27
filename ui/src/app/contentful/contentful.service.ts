import { Injectable } from '@angular/core';
import { ContentfulClientApi, createClient, Entry } from 'contentful';
import { ConfigService } from '../config.service';
import { ListOpts } from '../models/list-opts';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {
  private cdaClient: ContentfulClientApi;

  constructor(private configService: ConfigService) {}

  getRecipes(opts: ListOpts): Promise<Recipe[]> {
    this.cdaClient = createClient({
      space: this.configService?.get('spaceID'),
      accessToken: this.configService?.get('accessToken')
    });
    return this.cdaClient.getEntries(Object.assign({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      content_type: this.configService.get('contentTypeIDs').recipe,
      skip: opts.getSkip(),
      limit: opts.getLimit()
    }))
    .then(res => {
      const recipes = new Array<Recipe>();
      res.items.forEach(item => recipes.push(this.deserialize(item)));
      return recipes;
    });
  }

  getRecipeById(id: string): Promise<Recipe> {
    this.cdaClient = createClient({
      space: this.configService?.get('spaceID'),
      accessToken: this.configService?.get('accessToken')
    });
    return this.cdaClient.getEntries({'sys.id': id})
    .then(res => this.deserialize(res.items[0]));
  }

  deserialize(entry: Entry<any>): Recipe {
    const recipe = new Recipe()
      .withTitle(entry.fields?.title)
      .withDescription(entry.fields?.description)
      .withPhotoUrl(entry.fields?.photo?.fields?.file?.url)
      .withCalories(entry.fields?.calories)
      .withChef(entry.fields?.chef?.fields?.name || null)
      .withId(entry.sys.id);

    const tags = entry.fields?.tags?.map(({ fields }) => fields.name);

    recipe.withTags(tags || null);

    return recipe;
  }
}
