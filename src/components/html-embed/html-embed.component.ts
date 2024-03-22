import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-html-embed',
  standalone: true,
  templateUrl: './html-embed.component.html',
  styleUrl: './html-embed.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HtmlEmbedComponent {
  html = input.required<string>();
}
