import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarouselModule, WavesModule } from 'angular-bootstrap-md';
import { HomeComponent } from './home/home.component';
import { TravelComponent } from './travel/travel.component';
import { Redirection404Component } from './redirection404/redirection404.component';

const routes: Routes = [
  { path: '', component : HomeComponent },
  { path: 'travels', component : TravelComponent },
  { path: '**', component : Redirection404Component}


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CarouselModule.forRoot(),
    WavesModule.forRoot()
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
