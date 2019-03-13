import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { HttpResponse } from "@angular/common/http";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
  public pat: string = "";

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onLogin(event: Event) {
    event.preventDefault();

    console.warn(this.pat);

    this.authService.login(this.pat).subscribe(
      (result: boolean) => {
        console.log(result);
        if (result) {
          this.router.navigate(["/"]);
        } else {
          alert("heyy, login dude!");
        }
      },
      error => {
        console.error(error);
      }
    );
  }
}
