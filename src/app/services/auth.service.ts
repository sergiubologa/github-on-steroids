import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay, tap, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  isLoggedIn = false;

  constructor() {}

  login(): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap(result => (this.isLoggedIn = result))
    );
  }

  logout() {
    this.isLoggedIn = false;
  }
}
