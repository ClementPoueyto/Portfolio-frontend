import { Link } from "./link.models";

export enum ExperienceType {
  Formation = 'formation',
  Professional = 'profesional',
}

export interface Formation {
  id: number;
  title:string;
  description:string;
  place:string;
  experienceType: ExperienceType;
  link:Link;
  startDate: Date;
  endDate: Date;
  imageId?:number;
}
