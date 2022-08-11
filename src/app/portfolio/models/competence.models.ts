
export enum SkillType {
  Language = 'language',
  Programming = 'programming',
  Tool = 'tool',
  Framework = 'framework',
  Devops = 'devops'
}

export interface Competence {
  id: number;
  name: string;
  description:String;
  logoId?:number;
  skillType:SkillType;
}

