import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpParams, HttpClient } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { Observable, throwError, observable } from "rxjs";
import { ApiService } from '../../core/services/index';


@Injectable({ providedIn: 'root' })
export class userService {

  constructor(private _api: ApiService,
    private router: Router,
    private http: HttpClient,
  ) { }



  //add new
  loginUser(data) {
    return this._api.login(`${"auth"}`, data)
      .pipe(
        map((res: any) => res),
        catchError((error: any) => Observable.throw(error))
      );
  }





}

