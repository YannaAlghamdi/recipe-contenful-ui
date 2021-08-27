import { Component } from '@angular/core';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private configService: ConfigService) {}

  ionViewWillEnter() {
    console.log(this.configService.get('accessToken'));
  }

}
