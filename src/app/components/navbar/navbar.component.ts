import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent {
  constructor(private _router: Router, public authService: AuthService) {}

  logout(event: Event) {
    this.authService.logout();
    this._router.navigate(["/login"]);
  }
}
