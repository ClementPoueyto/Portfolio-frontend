import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/profile.models';
import { BlogService } from 'src/app/service/blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  public myProfile:Profile;
  public age  : number;

  constructor(private api:BlogService) {
    this.getProfile();

   }

  ngOnInit() {
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

    },
    error => {
      console.log(error);
    }
  )
}



}
