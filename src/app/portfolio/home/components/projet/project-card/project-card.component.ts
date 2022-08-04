import { Component, Input, OnInit } from '@angular/core';
import { ProjectType, Projet } from 'src/app/portfolio/models/projet.models';
import { serverUrlImage } from 'src/configs/server.config';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit {

  @Input()
  projet : Projet

  imageUrl = serverUrlImage;


  constructor() { }

  ngOnInit(): void {
  }

}
