import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  @ViewChild(NgScrollbar) scrollbarRef: NgScrollbar;


  opened: boolean = true;

  scrollDown($event){
    this.scrollbarRef.scrollToElement('#formations');
  }
  
  ngOnInit() {
  }



}
