import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from '../components/navigation/navigation.component';
import { graphqlProvider } from './graphql.provider';
import { PullRequestsComponent } from '../components/pull-requests/pull-requests.component';
import { MatDividerModule } from '@angular/material/divider';
import { GithubService } from '../services/github/github.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,

    MatDividerModule,

    NavigationComponent,
    PullRequestsComponent,
  ],
  providers: [graphqlProvider, GithubService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'github-on-steroids';
}
