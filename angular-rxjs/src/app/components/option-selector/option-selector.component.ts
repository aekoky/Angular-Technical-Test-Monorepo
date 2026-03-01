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
    activeBoxId: number;
    frontOptions: Option[];
    backOptions: Option[];
    otherOptions: Option[];
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
            activeBoxId,
            frontOptions: options.filter(o => o.category === 'front'),
            backOptions: options.filter(o => o.category === 'back'),
            otherOptions: options.filter(o => o.category === 'other'),
            selectedOptionId:
                selections.find(s => s.boxId === activeBoxId)?.optionId ?? null,
        })),
    );

    protected onSelect(optionId: string, activeBoxId: number): void {
        this.boxService.select(activeBoxId, optionId);
    }
}
