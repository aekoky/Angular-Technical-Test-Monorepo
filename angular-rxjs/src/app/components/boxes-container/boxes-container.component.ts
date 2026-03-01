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
      flex-wrap: wrap;
      gap: 12px;
      justify-content: center;
    }
  `],
})
export class BoxesContainerComponent {
    protected readonly boxIds = BOX_IDS;
}
