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
  templateUrl: './total-display.component.html',
  styleUrl: './total-display.component.css',
})
export class TotalDisplayComponent {
  protected readonly store = inject(AppStore);
}
