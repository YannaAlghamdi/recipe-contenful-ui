import { Injectable, APP_INITIALIZER } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  config: any;

  constructor(private http: HttpClient) { }

  static init() {
    return {
      provide: APP_INITIALIZER,
      useFactory: ConfigService.configFactory,
      deps: [ConfigService],
      multi: true
    };
  }

  static configFactory(config: ConfigService) {
    return async () => await config.load();
  }

  get(key: string) {
    return this.config[key];
  }

  async load() {
    await this.getConfig().toPromise().then(data => this.config = data);
  }

  private getConfig() {
    return this.http.get(`${environment.configUrl}`, {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    });
  }

}
