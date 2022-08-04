import {HttpHeaders} from '@angular/common/http';

export const httpOptionsBase = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

export const serverUrl = "http://localhost:3000/api/" //local
//export const serverUrl = 'https://portfolio--backend.herokuapp.com/api';
export const serverUrlImage = "http://localhost:3000/database-files/";
