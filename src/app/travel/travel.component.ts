import { Component, OnInit } from '@angular/core';
import { Trip, GeoJson } from './map-display/map/map';


@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css']
})
export class TravelComponent implements OnInit{


  public trip:Trip;
  public requestMap:number=0;
  displayMarker=true
  public markerToDisplay:GeoJson;

  constructor() {

   }


  ngOnInit() {
  }

  _receiveTrip($event){
    this.trip=$event;
    this.markerToDisplay=null
    this.requestMap++;
  }

  _receiveMarker($event){
    this.markerToDisplay=$event


  }


}
