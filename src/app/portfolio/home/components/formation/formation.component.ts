import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Formation } from 'src/app/portfolio/models/formation.models';
import { BlogService } from 'src/app/portfolio/service/blog.service';


@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css'],
  providers : [BlogService],
  animations : [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('500ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
    ])
  ]
})
export class FormationComponent implements OnInit {
  formations:Formation[] = [];
  showLoader:boolean=true;

  constructor(private api:BlogService) {
    this.getFormations();
   }
  ngOnInit() {
  }

  getFormations = () => {
    this.api.getAllFormations().subscribe(
      data => {
        this.formations = data;
        this.showLoader=false;
      },
      error => {
        console.log(error);
      }
    )
  }

}
