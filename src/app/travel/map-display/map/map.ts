export interface IGeometry {
  type: string;
  coordinates: number[];
}

export enum Trip{
  US="Etats-Unis",
  CHINA="Chine",
  AUSTRALIE="Australie",
  OUZBEK_KIRGHIZ="Ouzbekistan et Khirghisiztan",
  EUROPE="Europe"
}


export interface IGeoJson {
  type: string;
  geometry: IGeometry;
  properties: any;
  $key?: string;
}

export class GeoJson implements IGeoJson {
type = 'Feature';
geometry: IGeometry;
properties;

constructor(coordinates, properties:any) {
  this.geometry = {
    type: 'Point',
    coordinates: coordinates
  }
  this.properties=properties
}
}

export class FeatureCollection {
type = 'FeatureCollection'
constructor(public features: Array<GeoJson>) {}
}

