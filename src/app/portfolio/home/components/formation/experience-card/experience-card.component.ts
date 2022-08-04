import { Component, Input, OnInit } from '@angular/core';
import { Formation } from 'src/app/portfolio/models/formation.models';
import { serverUrlImage } from 'src/configs/server.config';

@Component({
  selector: 'app-experience-card',
  templateUrl: './experience-card.component.html',
  styleUrls: ['./experience-card.component.css']
})
export class ExperienceCardComponent implements OnInit {

  @Input()
  experience : Formation
  
  imageUrl = serverUrlImage;

  constructor() { }

  ngOnInit(): void {
  }

}
