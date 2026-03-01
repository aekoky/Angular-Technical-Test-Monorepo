import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { AppStore } from '../../store/app.store';

@Component({
  selector: 'app-box',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="box"
      [class.box--active]="isActive()"
      [class.box--filled]="isFilled()"
      (click)="onClick()"
    >
      @if (label(); as label) {
        <span class="box__value">{{ label }}</span>
        <span class="box__score">{{ score()?.toFixed(1) }}</span>
      } @else {
        <span class="box__placeholder">Select element</span>
      }
    </button>
  `,
  styleUrl: './box.component.css',
})
export class BoxComponent {
  readonly boxId = input.required<number>();

  private readonly store = inject(AppStore);

  protected readonly isActive = computed(() => this.store.activeBoxId() === this.boxId());

  protected readonly selectedOptionId = computed(
    () => this.store.selectionMap()[this.boxId()] ?? null,
  );

  protected readonly isFilled = computed(() => this.selectedOptionId() !== null);

  protected readonly label = computed(() => {
    const optionId = this.selectedOptionId();
    if (!optionId) return null;
    return this.store.options().find(o => o.id === optionId)?.label ?? null;
  });

  protected readonly score = computed(() => {
    const optionId = this.selectedOptionId();
    if (!optionId) return null;
    return this.store.options().find(o => o.id === optionId)?.value ?? null;
  });

  protected onClick(): void {
    this.store.setActiveBox(this.boxId());
  }
}
