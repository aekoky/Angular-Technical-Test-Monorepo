import {
    ChangeDetectionStrategy,
    Component,
    inject,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { combineLatest, map, Observable } from 'rxjs';
import { BoxService } from '../../services/box.service';
import { Option } from '../../models/option.model';

interface OptionSelectorVm {
    isVisible: boolean;
    activeBoxId: number;
    options: Option[];
    selectedOptionId: string | null;
}

@Component({
    selector: 'app-option-selector',
    standalone: true,
    imports: [AsyncPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './option-selector.component.html',
    styleUrl: './option-selector.component.css',
})
export class OptionSelectorComponent {
    private readonly boxService = inject(BoxService);

    protected readonly vm$: Observable<OptionSelectorVm> = combineLatest({
        activeBoxId: this.boxService.activeBoxId$,
        options: this.boxService.options$,
        selections: this.boxService.selections$,
    }).pipe(
        map(({ activeBoxId, options, selections }) => ({
            isVisible: true,
            activeBoxId,
            options,
            selectedOptionId:
                selections.find(s => s.boxId === activeBoxId)?.optionId ?? null,
        })),
    );

    protected onSelect(optionId: string, activeBoxId: number): void {
        this.boxService.select(activeBoxId, optionId);
    }
}
