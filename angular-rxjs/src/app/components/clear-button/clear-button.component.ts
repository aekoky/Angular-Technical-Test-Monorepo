import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { BoxService } from '../../services/box.service';

@Component({
  selector: 'app-clear-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './clear-button.component.html',
  styleUrl: './clear-button.component.css',
})
export class ClearButtonComponent {
  private readonly boxService = inject(BoxService);

  protected onClear(): void {
    this.boxService.clear();
  }
}
