import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {serverUrl} from 'src/configs/server.config'

import * as mapboxgl from 'mapbox-gl';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Trip} from 'src/app/travel/map-display/map/map'

@Injectable({
  providedIn: 'root'
})

export class MapService {

  baseURL = serverUrl+"/travel";
  public markers=[];
  public markers$: BehaviorSubject<any[]> = new BehaviorSubject(this.markers);


  public US ={
    zoom:4,
    center:[-116.8773718667903,39.356895110107764],
  }

  public Chine ={
    zoom:3,
    center:[113.88296740544001,30.258850337323175],
  }

  public Australie ={
    zoom:3,
    center:[143.0283310617436,-27.98313247407145],
  }

  public Europe ={
    zoom:4,
    center:[2.3514616,48.8566969],
  }

  public OuzbKhirg={
    zoom:4,
    center:[69.52978196887332,40.21026123577812],
  }
  httpHeaders = new HttpHeaders({'Content-type':'application/json'});


  constructor(private http: HttpClient) {
    Object.getOwnPropertyDescriptor(mapboxgl, 'accessToken').set('pk.eyJ1IjoibWVuY2VsdCIsImEiOiJjazl5ZXVnOXUwb3NtM2lvOHl4b3VtMGNmIn0.kyXnFYWW15ocu0mg9ytqCg');
    this.getMarkers().subscribe(
      (data)=>{
        this.markers=data;
        this.markers$.next(this.markers);
      }
    )
  }

  getMarkers(): Observable<any>{
    return this.http.get(this.baseURL+'/marker',
    {headers : this.httpHeaders});
  }

  get tripEnum(){
    return Trip;
  }


}
