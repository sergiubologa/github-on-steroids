import {
    HttpClient,
    HttpErrorResponse,
    HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
    Observable,
    of,
} from 'rxjs';
import {
    catchError,
    map,
    tap,
} from 'rxjs/operators';

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
      .get(`https://api.github.com/user?&access_token=${pat}`)
      .pipe(
        map((result: any) => {
          localStorage.setItem(this.PAT_LOCAL_STORAGE_KEY, pat);
          navigator.serviceWorker.ready.then(registration => {
            registration.active.postMessage({
              type: "onLogin",
              pat,
              username: result.login
            });
          });

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
