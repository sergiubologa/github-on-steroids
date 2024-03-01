import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  PAT_LOCAL_STORAGE_KEY = "PAT_GITHUB_KEY";
  USERNAME_LOCAL_STORAGE_KEY = "USERNAME_GITHUB_KEY";

  get isLoggedIn() {
    return !!this.accessToken;
  }

  get accessToken() {
    return localStorage.getItem(this.PAT_LOCAL_STORAGE_KEY);
  }

  constructor(private _httpService: HttpClient) {
    this._sendCredentialsToServiceWorker();
  }

  login(pat: string): Observable<boolean> {
    return this._httpService
      .get(`https://api.github.com/user`, { headers:{'Authorization': `Bearer ${pat}` }})
      .pipe(
        map((result: any) => {
          localStorage.setItem(this.PAT_LOCAL_STORAGE_KEY, pat);
          localStorage.setItem(this.USERNAME_LOCAL_STORAGE_KEY, result.login);
          this._sendCredentialsToServiceWorker();
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

  private _sendCredentialsToServiceWorker() {
    const pat = localStorage.getItem(this.PAT_LOCAL_STORAGE_KEY);
    const username = localStorage.getItem(this.USERNAME_LOCAL_STORAGE_KEY);

    navigator.serviceWorker.ready.then(registration => {
      registration.active.postMessage({
        type: "onLogin",
        pat,
        username
      });
    });
  }
}
