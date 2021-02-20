import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/service/blog.service';
import { Projet } from 'src/app/models/projet.models';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css'],
  providers : [BlogService]
})
export class ProjetComponent implements OnInit {
  projets:Projet[] = [];

  constructor(private api:BlogService) {
    this.getProjets();
   }
  ngOnInit() {
  }

  getProjets = () => {
    this.api.getAllProjets().subscribe(
      data => {
        this.projets = data;
      },
      error => {
        console.log(error);
      }
    )
  }


}
