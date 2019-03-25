import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { tap, map, catchError } from "rxjs/operators";
import {
  HttpClient,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  PAT_LOCAL_STORAGE_KEY = "PAT_GITHUB_KEY";

  get isLoggedIn() {
    return !!this.accessToken;
  }

  get accessToken() {
    return localStorage.getItem(this.PAT_LOCAL_STORAGE_KEY);
  }

  constructor(private _httpService: HttpClient) {}

  login(pat: string): Observable<boolean> {
    return this._httpService
      .get(`https://api.github.com/repos/uipath/activities?access_token=${pat}`)
      .pipe(
        map((result: HttpResponse<any>) => {
          console.log(result);
          localStorage.setItem(this.PAT_LOCAL_STORAGE_KEY, pat);
          return this.isLoggedIn;
        }),
        catchError((error: HttpErrorResponse) => {
          return of(false);
        })
      );
  }

  logout() {
    localStorage.removeItem(this.PAT_LOCAL_STORAGE_KEY);
  }
}
