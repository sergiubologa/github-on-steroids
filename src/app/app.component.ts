import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RepositoriesComponent } from '../components/repositories/repositories.component';
import { NavigationComponent } from '../components/navigation/navigation.component';
import { graphqlProvider } from './graphql.provider';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationComponent, RepositoriesComponent],
  providers: [graphqlProvider],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'github-on-steroids';
}
