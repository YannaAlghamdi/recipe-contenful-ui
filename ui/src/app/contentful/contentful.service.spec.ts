import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ContentfulClientApi, createClient, Entry } from 'contentful';
import { Recipe } from '../models/recipe';

import { ContentfulService } from './contentful.service';

describe('ContentfulService', () => {
  let service: ContentfulService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(ContentfulService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deserialize() must return an object of type Recipe', () => {
    const entry = {
      fields: {
        title: 'test'
      },
      sys: {
        id: 1
      }
    };
    expect(service.deserialize(entry as unknown as Entry<any>)).toBeInstanceOf(Recipe);
  });
});
