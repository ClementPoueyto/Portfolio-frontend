import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { Trip } from '../travel/map-display/map/map';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output()
  public trip:EventEmitter<Trip>= new EventEmitter();

  public path:string;

  constructor(router:Router) {

    this.path=router.url
  }

  ngOnInit() {
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView();
}

  emitValue($value){
    this.trip.emit($value)
  }

  get tripEnum(){
    return Trip;
  }





}
