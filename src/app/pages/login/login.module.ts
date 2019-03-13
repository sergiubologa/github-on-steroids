import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login.component";
import { AppMaterialModule } from "src/app/app-material.module";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, AppMaterialModule, FormsModule, HttpClientModule]
})
export class LoginModule {}
