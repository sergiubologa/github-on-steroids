import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home.component";
import { AppMaterialModule } from "src/app/app-material.module";

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, AppMaterialModule]
})
export class HomeModule {}
