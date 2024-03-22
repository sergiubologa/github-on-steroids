import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { IGitHubPullRequest } from '../../../services/github/github.service';
import { LetDirective } from '@ngrx/component';
import { MatCardModule } from '@angular/material/card';
import { TimeAgoPipe } from '../../../pipes/time-ago.pipe';
import { MatExpansionModule } from '@angular/material/expansion';
import { HtmlEmbedComponent } from '../../html-embed/html-embed.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pr',
  standalone: true,
  imports: [
    CommonModule,
    LetDirective,

    MatCardModule,
    MatExpansionModule,
    MatIconModule,

    TimeAgoPipe,
    HtmlEmbedComponent,
  ],

  providers: [],
  templateUrl: './pr.component.html',
  styleUrl: './pr.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PRComponent {
  pr = input.required<IGitHubPullRequest>();
}
