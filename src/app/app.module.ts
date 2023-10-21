import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgChartsModule } from 'ng2-charts';
import { HttpClient, HttpHandler, HttpClientModule  } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { FormBuilder } from '@angular/forms';
import { ParentModule } from './parent/parent.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    NgChartsModule,
    HttpClientModule,
    ParentModule
  ],
  providers: [
    HttpClient,
    Storage,
    FormBuilder,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA 
  ]
})
export class AppModule {}
