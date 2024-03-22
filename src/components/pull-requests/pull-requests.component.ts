import { Component, OnInit, inject } from '@angular/core';
import { GithubService } from '../../services/github/github.service';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { PRComponent } from './pr/pr.component';

@Component({
  selector: 'app-pull-requests',
  standalone: true,
  imports: [CommonModule, LetDirective, PRComponent],
  templateUrl: './pull-requests.component.html',
  styleUrl: './pull-requests.component.scss',
})
export class PullRequestsComponent {
  private readonly _githubService = inject(GithubService);

  readonly pullRequests$ = this._githubService.getPullRequests$();
  readonly isLoadingPullRequests$ =
    this._githubService.getIsLoadingPullRequests$();
}
