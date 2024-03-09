import { Component, OnInit } from '@angular/core';
import {
  GithubService,
  IGitHubUser,
} from '../../services/github/github.service';
import { EMPTY, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ApolloQueryResult } from '@apollo/client/core';

@Component({
  selector: 'app-repositories',
  standalone: true,
  imports: [CommonModule, LetDirective, MatCardModule, MatToolbarModule],
  providers: [GithubService],
  templateUrl: './repositories.component.html',
  styleUrl: './repositories.component.scss',
})
export class RepositoriesComponent implements OnInit {
  userData$: Observable<ApolloQueryResult<IGitHubUser>> = EMPTY;

  constructor(private githubService: GithubService) {}

  ngOnInit() {
    this.userData$ = this.githubService.getCurrentUser$();
  }
}
