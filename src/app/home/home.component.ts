import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public showOverlay = true;

  constructor(private router: Router) { router.events.subscribe((event: RouterEvent) => {
    this.navigationInterceptor(event)
  })}

  ngOnInit() {
  }

  navigationInterceptor(event: RouterEvent) : void {
    console.log(event)
    if (event instanceof NavigationStart) {
      this.showOverlay = true;

    }
    if (event instanceof NavigationEnd) {
      this.showOverlay = false;
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.showOverlay = false;
    }
    if (event instanceof NavigationError) {
      this.showOverlay = false;
    }
  }


}
