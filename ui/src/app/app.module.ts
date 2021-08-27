import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppInitializerService } from './app-initializer.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ConfigService } from './config.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    ConfigService,
    ConfigService.init(),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: APP_INITIALIZER,
      // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
      useFactory: () => function() {
        return new AppInitializerService(
          AppModule.injector.get(HttpClient),
          AppModule.injector.get(ConfigService)
        );
      },
      deps: [HttpClient],
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

  static injector: Injector;

  constructor(injector: Injector) {
    AppModule.injector = injector;
  }
}
