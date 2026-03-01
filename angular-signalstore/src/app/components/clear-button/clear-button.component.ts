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
  template: `
    <button type="button" class="clear-btn" (click)="onClear()" title="Clear all selections">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="3 6 5 6 21 6"/>
        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
        <path d="M10 11v6M14 11v6"/>
        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
      </svg>
    </button>
  `,
  styles: [`
    .clear-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: #1976d2;
      border: none;
      border-radius: 6px;
      color: #fff;
      cursor: pointer;
      transition: background 0.2s;
      box-shadow: 0 1px 4px rgba(0,0,0,0.15);
    }
    .clear-btn:hover {
      background: #1565c0;
    }
  `],
})
export class ClearButtonComponent {
  private readonly store = inject(AppStore);

  protected onClear(): void {
    this.store.clear();
  }
}
