import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ContentfulService } from 'src/app/contentful/contentful.service';
import { RouterTestingModule } from '@angular/router/testing';
import { RecipeDetailPage } from './recipe-detail.page';
import { HeaderComponent } from 'src/app/components/header/header.component';

describe('RecipeDetailPage', () => {
  let component: RecipeDetailPage;
  let fixture: ComponentFixture<RecipeDetailPage>;
  let contentfulService;

  const contentfulServiceStub = {
    getRecipes: () => null,
    getRecipeById: () => new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            title: 'recipe1',
            description: 'test1'
          }, {
            title: 'recipe2',
            description: 'test1'
          },
          {
            title: 'recipe3',
            description: 'test1'
          }
        ]);
      }, 4000);
    }),
    deserialize: () => null,
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeDetailPage, HeaderComponent ],
      imports: [IonicModule.forRoot(), RouterTestingModule, HttpClientTestingModule],
      providers: [
        {provide: ContentfulService, useValue: contentfulServiceStub},
        { //creates a mock for activated route
          provide: ActivatedRoute,
          useValue: {
            snapshot: {paramMap: convertToParamMap( { id: '5jy9hcMeEgQ4maKGqIOYW6' } ) } }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeDetailPage);
    component = fixture.componentInstance;
    contentfulService = TestBed.inject(ContentfulService);

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('recipe should be empty', (() => {
    fixture.detectChanges();
    expect(component.recipe.getTitle()).toBeUndefined();
  }));

  it('id should be equal to 1', (() => {
    fixture.detectChanges();
    expect(component.id).toBe('5jy9hcMeEgQ4maKGqIOYW6');
  }));
});
