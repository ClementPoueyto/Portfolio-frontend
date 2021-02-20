import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HttpClientModule} from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { FormationComponent } from './home/components/formation/formation.component';


import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProfilComponent } from './home/components/profil/profil.component';
import { ProjetComponent } from './home/components/projet/projet.component';
import { ButtonsModule } from 'angular-bootstrap-md'
import { NgCircleProgressModule } from 'ng-circle-progress';
import { IconsModule } from 'angular-bootstrap-md';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { CompetenceComponent } from './home/components/competence/competence.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { TravelComponent } from './travel/travel.component';
import { MapBoxComponent } from './travel/map-display/map-box/map-box.component';
import { Redirection404Component } from './redirection404/redirection404.component';
import { AngularResizedEventModule} from 'angular-resize-event'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FormationComponent,
    ProfilComponent,
    ProjetComponent,
    CompetenceComponent,
    FooterComponent,
    HomeComponent,
    TravelComponent,
    MapBoxComponent,
    Redirection404Component
  ],
  imports: [
    AngularResizedEventModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    IconsModule,
    ScrollToModule.forRoot(),
    ButtonsModule.forRoot(),
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 50,
      outerStrokeWidth: 8,
      showInnerStroke:false,
      animationDuration: 500,
      showImage:true,
      animation : true,
      imageHeight:70,
      imageWidth:70,
      showBackground:true,
      showTitle:false,
      lazy:false,
      renderOnClick:false

    }),

  ],
  providers: [
  ],
  bootstrap: [
    AppComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule { }
