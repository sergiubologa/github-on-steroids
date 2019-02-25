import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login.component";
import { AppMaterialModule } from "src/app/app-material.module";

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, AppMaterialModule]
})
export class LoginModule {}
