import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import * as firebase from 'firebase'
import { AUTH_PROVIDERS, AuthHttp  } from 'angular2-jwt';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { routing, appRoutingProviders } from './app.routes';
import { appConfig } from './app.config';
import './rxjs-extensions';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    routing,
    AngularFireModule.initializeApp(appConfig.firebase),
    HttpModule
  ],
  providers: [
        appRoutingProviders,
        AUTH_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
