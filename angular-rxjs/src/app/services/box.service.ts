import { Injectable, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { map, scan, shareReplay, startWith, tap, distinctUntilChanged } from 'rxjs/operators';
import { AppState, Option, Selection } from '../models/option.model';
import { MOCK_OPTIONS } from '../data/options.data';
import { PersistenceService } from './persistence.service';

// ---------------------------------------------------------------------------
// Discriminated-union action types (reducer-style)
// ---------------------------------------------------------------------------

type SelectAction = { type: 'SELECT'; boxId: number; optionId: string };
type SetActiveBoxAction = { type: 'SET_ACTIVE_BOX'; boxId: number };
type ClearAction = { type: 'CLEAR' };
type InitAction = { type: 'INIT' };

type Action = SelectAction | SetActiveBoxAction | ClearAction | InitAction;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const BOX_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

function computeTotal(selections: Selection[], options: Option[]): number {
    return selections.reduce((sum, sel) => {
        const option = options.find(o => o.id === sel.optionId);
        return sum + (option?.value ?? 0);
    }, 0);
}

function nextActiveBoxId(currentBoxId: number, selections: Selection[]): number {
    const firstEmptyAfterCurrent = BOX_IDS.find(
        id => id > currentBoxId && !selections.some(s => s.boxId === id),
    );
    return firstEmptyAfterCurrent ?? 10;
}

function resolveActiveBoxIdOnLoad(selections: Selection[]): number {
    const firstEmpty = BOX_IDS.find(id => !selections.some(s => s.boxId === id));
    return firstEmpty ?? 10;
}

// ---------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------

function reducer(state: AppState, action: Action): AppState {
    switch (action.type) {
        case 'INIT':
            return state;

        case 'SELECT': {
            const { boxId, optionId } = action;
            const existingIndex = state.selections.findIndex(s => s.boxId === boxId);

            const updatedSelections: Selection[] =
                existingIndex >= 0
                    ? state.selections.map(s => (s.boxId === boxId ? { ...s, optionId } : s))
                    : [...state.selections, { boxId, optionId }];

            const nextActiveBoxId_ = nextActiveBoxId(boxId, updatedSelections);

            return {
                ...state,
                selections: updatedSelections,
                activeBoxId: nextActiveBoxId_,
            };
        }

        case 'SET_ACTIVE_BOX':
            return { ...state, activeBoxId: action.boxId };

        case 'CLEAR':
            return {
                ...state,
                selections: [],
                activeBoxId: 1,
            };

        default:
            return state;
    }
}

// ---------------------------------------------------------------------------
// Service
// ---------------------------------------------------------------------------

@Injectable({ providedIn: 'root' })
export class BoxService {
    private readonly persistence = inject(PersistenceService);

    private readonly actions$ = new Subject<Action>();

    private readonly initialState: AppState = (() => {
        const saved = this.persistence.load();
        const selections = saved?.selections ?? [];
        const activeBoxId = saved
            ? resolveActiveBoxIdOnLoad(selections)
            : 1;

        return {
            options: MOCK_OPTIONS,
            selections,
            activeBoxId,
        };
    })();

    readonly state$ = this.actions$.pipe(
        startWith<Action>({ type: 'INIT' }),
        scan(reducer, this.initialState),
        tap(state => this.persistence.save(state)),
        shareReplay(1),
    );

    // ---------------------------------------------------------------------------
    // Derived observable streams
    // ---------------------------------------------------------------------------

    readonly options$ = this.state$.pipe(
        map(s => s.options),
        distinctUntilChanged(),
    );

    readonly selections$ = this.state$.pipe(
        map(s => s.selections),
        distinctUntilChanged(),
    );

    readonly activeBoxId$ = this.state$.pipe(
        map(s => s.activeBoxId),
        distinctUntilChanged(),
    );

    readonly total$ = this.state$.pipe(
        map(s => computeTotal(s.selections, s.options)),
        distinctUntilChanged(),
    );

    // ---------------------------------------------------------------------------
    // Per-box derived stream
    // ---------------------------------------------------------------------------

    activeOptionId$(boxId: number) {
        return this.state$.pipe(
            map(s => s.selections.find(sel => sel.boxId === boxId)?.optionId ?? null),
            distinctUntilChanged(),
        );
    }

    // ---------------------------------------------------------------------------
    // Public action dispatchers
    // ---------------------------------------------------------------------------

    select(boxId: number, optionId: string): void {
        this.actions$.next({ type: 'SELECT', boxId, optionId });
    }

    setActiveBox(boxId: number): void {
        this.actions$.next({ type: 'SET_ACTIVE_BOX', boxId });
    }

    clear(): void {
        this.actions$.next({ type: 'CLEAR' });
    }
}
