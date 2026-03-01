import {
    ChangeDetectionStrategy,
    Component,
    inject,
    input,
    OnInit,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { combineLatest, map, Observable } from 'rxjs';
import { BoxService } from '../../services/box.service';
import { Option } from '../../models/option.model';

interface BoxVm {
    isActive: boolean;
    isFilled: boolean;
    label: string | null;
}

@Component({
    selector: 'app-box',
    standalone: true,
    imports: [AsyncPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './box.component.html',
    styleUrl: './box.component.css',
})
export class BoxComponent implements OnInit {
    readonly boxId = input.required<number>();

    private readonly boxService = inject(BoxService);

    protected vm$!: Observable<BoxVm>;

    ngOnInit(): void {
        const id = this.boxId();

        this.vm$ = combineLatest({
            activeBoxId: this.boxService.activeBoxId$,
            optionId: this.boxService.activeOptionId$(id),
            options: this.boxService.options$,
        }).pipe(
            map(({ activeBoxId, optionId, options }) => ({
                isActive: activeBoxId === id,
                isFilled: optionId !== null,
                label: optionId
                    ? (options.find((o: Option) => o.id === optionId)?.label ?? null)
                    : null,
            })),
        );
    }

    protected onClick(): void {
        this.boxService.setActiveBox(this.boxId());
    }
}
