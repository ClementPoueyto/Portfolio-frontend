import {HttpHeaders} from '@angular/common/http';

export const httpOptionsBase = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

export const serverUrl = 'https://portfolio--backend.herokuapp.com/api';
export const serverUrlImage = 'https://portfolio--backend.herokuapp.com/uploads'
