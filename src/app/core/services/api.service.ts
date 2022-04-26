import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
@Injectable()
export class ApiService {
    token

    constructor(private http: HttpClient,

        private route: Router) {

    }



    private setHeaders(): HttpHeaders {

        const headersConfig = {
            "Content-Type": "application/json",
            Accept: "application/json",

        };

        let token = this.token
        if (token !== "" && token != null)
            headersConfig["Authorization"] = token;
        headersConfig["key"] = 'data123';
        return new HttpHeaders(headersConfig);
    }

    private formatErrors(error: any) {
        return throwError(error.error);
    }

    login(path: string, body: any): Observable<any> {
        return this.http
            .post(`${environment.login_url}${path}`, body)
            .pipe(catchError(this.formatErrors));
    }



}
