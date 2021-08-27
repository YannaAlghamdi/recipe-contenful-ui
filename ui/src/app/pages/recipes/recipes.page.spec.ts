import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ContentfulService } from 'src/app/contentful/contentful.service';

import { RecipesPage } from './recipes.page';

describe('RecipesPage', () => {
  let component: RecipesPage;
  let fixture: ComponentFixture<RecipesPage>;

  let contentfulService;

  const contentfulServiceStub = {
    getRecipes: () => new Promise((resolve) => {
        setTimeout(() => {
          resolve([{title: 'recipe1'}, {title: 'recipe2'}, {title: 'recipe3'}]);
        }, 4000);
      }),
    getRecipe: () => null,
    deserialize: () => null,
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipesPage, HeaderComponent ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(RecipesPage);
    component = fixture.componentInstance;

    contentfulService = TestBed.inject(ContentfulService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('recipes should be an array', () => {
    expect(component.recipes.length).toBeDefined();
  });

  it('getRecipes should be array of Recipe', (() => {
    fixture.detectChanges();
    expect(component.getRecipes.length).toBeDefined();
  }));
});
