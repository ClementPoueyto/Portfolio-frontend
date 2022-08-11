import { Competence } from "./competence.models";
import { Link } from "./link.models";

export enum ProjectType {
  Professional = 'professional',
  Personal = 'personal',
  Educational = 'educational',

}

export interface Projet {
  id: number;
  title:String;
  description:String;
  startDate: Date;
  endDate: Date;
  projectType: ProjectType;
  imageId?:number;
  github?: Link;
  link? : Link;
  tools : Competence[]
}
