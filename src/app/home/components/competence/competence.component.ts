import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/service/blog.service';
import { Competence } from 'src/app/models/competence.models';

@Component({
  selector: 'app-competence',
  templateUrl: './competence.component.html',
  styleUrls: ['./competence.component.css'],
  providers : [BlogService]

})
export class CompetenceComponent implements OnInit {
  competences :Competence[]= [];
  showLoader:boolean=true;
  constructor(private api:BlogService) {
    this.getCompetences();

  }

  ngOnInit() {
  }


  getCompetences = () => {
    this.api.getAllCompetences().subscribe(
      data => {
        this.competences = data;
        this.showLoader=false;
      },
      error => {
        console.log(error);
      }
    )
  }
}
