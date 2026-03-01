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
  templateUrl: './total-display.component.html',
  styleUrl: './total-display.component.css',
})
export class TotalDisplayComponent {
  protected readonly boxService = inject(BoxService);
}
