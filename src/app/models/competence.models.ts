
export enum SkillType {
  SpokenLanguage = 'SpokenLanguage',
  ProgLanguage = 'ProgLanguage',
  Tool = 'Tool'
}

export interface Competence {
  id: number;
  name: string;
  description:String;
  pourcentage?:number;
  image?:String;
  skillType:SkillType;
}

