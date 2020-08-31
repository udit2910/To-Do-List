import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import {  HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
// import 'rxjs/Rx';
@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

  constructor(
    public _http: HttpClient,

  ) { }

  linkGeneration(param1, param2) {
    const host = window.location.hostname;
    return `${param1.protocol}://${host}:${param1.port}${param1.apiPrefix}${param2}`;
  }

  setHeaders() {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const options = { headers: headers };
    return options;
  }

  checkLogin(body) {
    const getUrlLink = this.linkGeneration(environment.usersV1, environment.usersV1.userLogin);
    const params = {};
    return this.postAPICall(getUrlLink, body, this.setHeaders());

  }


  getAPICall(url, headers) {
    return this._http.get(url, headers)
    .pipe(map(res =>{
      return Object(res);
    }
  ));
}

  
  postAPICall(url, body, headers) {
    return this._http.post(url, body, headers)
    .pipe(map(res =>{
      return Object(res);
    }
  ));
  }



}
