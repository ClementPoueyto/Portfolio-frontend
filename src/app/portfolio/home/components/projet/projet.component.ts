import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ProjectType, Projet } from 'src/app/portfolio/models/projet.models';
import { BlogService } from 'src/app/portfolio/service/blog.service';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css'],
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
export class ProjetComponent implements OnInit {
  projets:Projet[] = [];
  breakpoint = 3;

  ProjectTypeValues() : Array<string> {
    var values = Object.values(ProjectType);
    return values;
  }

  constructor(private api:BlogService) {
    this.getProjets();
   }

   getFrenchEnum(value : string){
    switch(value){
      case 'professional':
        return 'Professionnel';
        case 'educational':
          return 'Scolaire';
          case 'personal':
            return 'Personnel';
            default : return ''
    }
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

  ngOnInit() {
    if(window.innerWidth<800) this.breakpoint = 1;
    else if(window.innerWidth<1200) this.breakpoint = 2;
    else this.breakpoint = 3;
}

onResize(event) {
  if(event.target.innerWidth<800) this.breakpoint = 1;
  else if(event.target.innerWidth<1200) this.breakpoint = 2;
  else this.breakpoint = 3;}


}
