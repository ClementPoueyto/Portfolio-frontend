import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { serverUrl } from 'src/configs/server.config';
@Injectable({
  providedIn: 'root'
})
export class BlogService {

  baseURL = serverUrl;
  httpHeaders = new HttpHeaders({'Content-type':'application/json', 'accept':'application/json'});

  constructor(private http: HttpClient) { }

  getAllFormations(): Observable<any>{
    return this.http.get(this.baseURL + 'experiences/',
    {headers : this.httpHeaders});
  }
  getAllProjets(): Observable<any>{
    return this.http.get(this.baseURL + 'projects/',
    {headers : this.httpHeaders});
  }

  getAllCompetences(): Observable<any>{
    return this.http.get(this.baseURL + 'skills/',
    {headers : this.httpHeaders});
  }

  getProfile(): Observable<any>{
    return this.http.get(this.baseURL+'profiles/12',
    {headers : this.httpHeaders});
  }
}
