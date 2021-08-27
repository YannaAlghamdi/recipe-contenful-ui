import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Model } from './model';

@Injectable({
  providedIn: 'root'
})
export class AppInitializerService {
  constructor(private http: HttpClient, private configService: ConfigService) {
  }
}
