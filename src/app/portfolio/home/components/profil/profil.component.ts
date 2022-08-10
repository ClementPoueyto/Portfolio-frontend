import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { Profile } from 'src/app/portfolio/models/profile.models';
import { BlogService } from 'src/app/portfolio/service/blog.service';
import { serverUrl, serverUrlImage } from 'src/configs/server.config';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
  animations : [
    trigger('slideInOut1', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('700ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
    ]),
    trigger('slideInOut2', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('500ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
    ])
  ]
})
export class ProfilComponent implements OnInit {

  @Output()
  public outputScroll = new EventEmitter<MouseEvent>();

  public imageUrl = serverUrl + "profiles/12/avatar" 
  public myProfile:Profile;
  public age  : number;
  public loaded : boolean = false;
  constructor(private api:BlogService) {
    this.getProfile();

   }
  ngOnInit() {
  }

  public handleClick(event: MouseEvent) {
    this.outputScroll.emit(event);
}

  public CalculateAge(): void{
      if(this.myProfile.birthDate){

        let _myBirthDate=new Date(this.myProfile.birthDate)
         var timeDiff = Math.abs(Date.now() - (_myBirthDate).getTime());
         //Used Math.floor instead of Math.ceil
         //so 26 years and 140 days would be considered as 26, not 27.
         this.age = Math.floor((timeDiff / 31556908800));
     }
 }

getProfile = async () => {
  this.api.getProfile().subscribe(
    async data => {

      this.myProfile = data;
      this.CalculateAge();
      this.loaded = true;

    },
    error => {
      console.log(error);
    }
  )
}



}
