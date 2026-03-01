import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { AppStore } from '../../store/app.store';

@Component({
  selector: 'app-clear-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './clear-button.component.html',
  styleUrl: './clear-button.component.css',
})
export class ClearButtonComponent {
  private readonly store = inject(AppStore);

  protected onClear(): void {
    this.store.clear();
  }
}
