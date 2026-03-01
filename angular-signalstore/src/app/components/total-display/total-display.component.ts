import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { AppStore } from '../../store/app.store';

@Component({
  selector: 'app-total-display',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="total-display">
      <span class="total-display__text">Total value: {{ store.total().toFixed(1) }}</span>
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
  protected readonly store = inject(AppStore);
}
