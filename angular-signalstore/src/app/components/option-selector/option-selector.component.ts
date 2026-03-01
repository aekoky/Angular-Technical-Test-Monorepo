import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
} from '@angular/core';
import { AppStore } from '../../store/app.store';

@Component({
    selector: 'app-option-selector',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './option-selector.component.html',
    styleUrl: './option-selector.component.css',
})
export class OptionSelectorComponent {
    protected readonly store = inject(AppStore);

    protected readonly selectedOptionId = computed(
        () => this.store.selectionMap()[this.store.activeBoxId()] ?? null,
    );

    protected onSelect(optionId: string): void {
        this.store.select(this.store.activeBoxId(), optionId);
    }
}
