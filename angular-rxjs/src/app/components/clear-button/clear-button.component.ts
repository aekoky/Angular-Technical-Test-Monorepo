import {
    ChangeDetectionStrategy,
    Component,
    inject,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { BoxService } from '../../services/box.service';

@Component({
    selector: 'app-clear-button',
    standalone: true,
    imports: [AsyncPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <button type="button" class="clear-btn" (click)="onClear()">
      Clear All
    </button>
  `,
    styles: [`
    .clear-btn {
      padding: 10px 28px;
      background: transparent;
      border: 2px solid #f76a6a;
      border-radius: 8px;
      color: #f76a6a;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
      letter-spacing: 0.05em;
    }

    .clear-btn:hover {
      background: #f76a6a;
      color: #fff;
    }
  `],
})
export class ClearButtonComponent {
    private readonly boxService = inject(BoxService);

    protected onClear(): void {
        this.boxService.clear();
    }
}
