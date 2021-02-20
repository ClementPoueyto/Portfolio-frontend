import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import {serverUrl} from 'src/configs/server.config'
@Injectable({
  providedIn: 'root'
})
export class BlogService {

  baseURL = serverUrl+"/resume";
  httpHeaders = new HttpHeaders({'Content-type':'application/json'});

  constructor(private http: HttpClient) { }

  getAllFormations(): Observable<any>{
    return this.http.get(this.baseURL + '/formation/',
    {headers : this.httpHeaders});
  }
  getAllProjets(): Observable<any>{
    return this.http.get(this.baseURL + '/project/',
    {headers : this.httpHeaders});
  }

  getAllCompetences(): Observable<any>{
    return this.http.get(this.baseURL + '/skill/',
    {headers : this.httpHeaders});
  }

  getProfile(): Observable<any>{
    return this.http.get(this.baseURL+'/profile/',
    {headers : this.httpHeaders});
  }
}
