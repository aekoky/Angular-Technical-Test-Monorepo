import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { BoxService } from '../../services/box.service';

@Component({
  selector: 'app-total-display',
  standalone: true,
  imports: [AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="total-display">
      <span class="total-display__text">Total value: {{ (boxService.total$ | async)?.toFixed(1) ?? '0.0' }}</span>
    </div>
  `,
  styles: [`
    .total-display {
      margin-top: 6px;
    }
    .total-display__text {
      font-size: 11px;
      color: #9aa0a6;
      white-space: nowrap;
    }
  `],
})
export class TotalDisplayComponent {
  protected readonly boxService = inject(BoxService);
}
