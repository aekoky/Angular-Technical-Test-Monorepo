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
      <span class="total-display__label">Total</span>
      <span class="total-display__value">
        {{ (boxService.total$ | async)?.toFixed(2) ?? '0.00' }}
      </span>
    </div>
  `,
    styles: [`
    .total-display {
      display: flex;
      align-items: baseline;
      gap: 12px;
    }

    .total-display__label {
      font-size: 0.9rem;
      font-weight: 500;
      color: #a0a0c0;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    .total-display__value {
      font-size: 2rem;
      font-weight: 700;
      color: #5be0b0;
      font-variant-numeric: tabular-nums;
      min-width: 8ch;
      text-align: right;
    }
  `],
})
export class TotalDisplayComponent {
    protected readonly boxService = inject(BoxService);
}
