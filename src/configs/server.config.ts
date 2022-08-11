import {HttpHeaders} from '@angular/common/http';

export const httpOptionsBase = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

//export const serverUrl = "http://localhost:3000/" //local
export const serverUrl = 'https://api.portfolio.clementpoueyto.fr/';
export const serverUrlImage = serverUrl + "database-files/";
