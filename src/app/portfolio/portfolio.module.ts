import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioRoutingModule } from './portfolio-routing.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './home/components/footer/footer.component';
import { FormationComponent } from './home/components/formation/formation.component';
import { ProfilComponent } from './home/components/profil/profil.component';
import { ProjetComponent } from './home/components/projet/projet.component';
import { CompetenceComponent } from './home/components/competence/competence.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { NgScrollbarModule } from 'ngx-scrollbar';
import {MatSidenavModule } from  '@angular/material/sidenav';
import {MatListModule } from  '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import { ExperienceCardComponent } from './home/components/formation/experience-card/experience-card.component';
import { ProjectCardComponent } from './home/components/projet/project-card/project-card.component';
import { ContactComponent } from './home/components/contact/contact.component';
import { CompetenceLogoComponent } from './home/components/competence/competence-logo/competence-logo.component';



@NgModule({
  declarations: [
    HomeComponent,
    FooterComponent,
    FormationComponent,
    ProfilComponent,
    ProjetComponent,
    CompetenceComponent,
    ExperienceCardComponent,
    ProjectCardComponent,
    ContactComponent,
    CompetenceLogoComponent,
  ],
  imports: [
    CommonModule,
    PortfolioRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    NgScrollbarModule,
    FlexLayoutModule,
    MatMenuModule,
    MatTabsModule

  ]
})
export class PortfolioModule { }
