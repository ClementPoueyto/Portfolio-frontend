import { Component, Input, OnInit } from '@angular/core';
import { Competence } from 'src/app/portfolio/models/competence.models';
import { serverUrlImage } from 'src/configs/server.config';

@Component({
  selector: 'app-competence-logo',
  templateUrl: './competence-logo.component.html',
  styleUrls: ['./competence-logo.component.css']
})
export class CompetenceLogoComponent implements OnInit {

  @Input()
  competence : Competence

  public imageUrl = serverUrlImage;

  constructor() { }

  ngOnInit(): void {
  }

}
