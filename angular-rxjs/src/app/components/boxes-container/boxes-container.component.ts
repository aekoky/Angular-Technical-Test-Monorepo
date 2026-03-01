import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { BoxComponent } from '../box/box.component';

const BOX_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

@Component({
  selector: 'app-boxes-container',
  standalone: true,
  imports: [BoxComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="boxes-container">
      @for (id of boxIds; track id) {
        <app-box [boxId]="id" />
      }
    </div>
  `,
  styles: [`
    .boxes-container {
      display: flex;
      flex: 1;
      gap: 0;
      min-width: 0;
    }
    .boxes-container > :first-child {
      border-radius: 6px 0 0 6px;
    }
    .boxes-container > :last-child {
      border-radius: 0 6px 6px 0;
    }
    .boxes-container > :not(:first-child):not(:last-child) {
      border-radius: 0;
    }
    .boxes-container > * {
      border-right-width: 0;
    }
    .boxes-container > :last-child {
      border-right-width: 1px;
    }
  `],
})
export class BoxesContainerComponent {
  protected readonly boxIds = BOX_IDS;
}
