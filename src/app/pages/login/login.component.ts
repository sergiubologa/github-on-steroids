import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onLogin() {
    this.authService.login().subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(["/"]);
      } else {
        console.error("heyy, login dude!");
      }
    });
  }
}
