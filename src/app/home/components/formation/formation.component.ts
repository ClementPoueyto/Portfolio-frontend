import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/service/blog.service';
import { Formation } from 'src/app/models/formation.models';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css'],
  providers : [BlogService]
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
