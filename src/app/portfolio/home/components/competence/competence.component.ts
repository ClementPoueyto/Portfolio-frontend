import { Component, OnInit } from '@angular/core';
import { Competence } from 'src/app/portfolio/models/competence.models';
import { BlogService } from 'src/app/portfolio/service/blog.service';
import { serverUrl, serverUrlImage } from 'src/configs/server.config';


@Component({
  selector: 'app-competence',
  templateUrl: './competence.component.html',
  styleUrls: ['./competence.component.css'],
  providers : [BlogService]

})
export class CompetenceComponent implements OnInit {
  public imageUrl = serverUrlImage;
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
        this.competences = data.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        this.showLoader=false;
      },
      error => {
        console.log(error);
      }
    )
  }
}
