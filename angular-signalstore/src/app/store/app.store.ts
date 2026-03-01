import { computed, inject } from '@angular/core';
import {
    patchState,
    signalStore,
    withComputed,
    withHooks,
    withMethods,
    withState,
} from '@ngrx/signals';
import { AppState, Option, Selection } from '../models/option.model';
import { MOCK_OPTIONS } from '../data/options.data';
import { PersistenceService } from '../services/persistence.service';

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
// Initial state (options live in store as per spec)
// ---------------------------------------------------------------------------

const initialState: AppState = {
    options: MOCK_OPTIONS,
    selections: [],
    activeBoxId: 1,
};

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const AppStore = signalStore(
    { providedIn: 'root' },
    withState<AppState>(initialState),

    withComputed(({ selections, options }) => ({
        /**
         * Derived total — never stored as independent mutable state.
         * Recomputes automatically whenever selections or options change.
         */
        total: computed(() => computeTotal(selections(), options())),

        /**
         * Normalised lookup map boxId → optionId for O(1) per-box access in templates.
         */
        selectionMap: computed(() =>
            selections().reduce<Record<number, string>>(
                (acc, s) => ({ ...acc, [s.boxId]: s.optionId }),
                {},
            ),
        ),
    })),

    withMethods((store, persistence = inject(PersistenceService)) => ({
        /**
         * Select an option for a given box, then advance to the next empty box.
         */
        select(boxId: number, optionId: string): void {
            const currentSelections = store.selections();
            const exists = currentSelections.some(s => s.boxId === boxId);

            const updatedSelections: Selection[] = exists
                ? currentSelections.map(s => (s.boxId === boxId ? { ...s, optionId } : s))
                : [...currentSelections, { boxId, optionId }];

            const nextId = nextActiveBoxId(boxId, updatedSelections);

            patchState(store, {
                selections: updatedSelections,
                activeBoxId: nextId,
            });

            persistence.save(updatedSelections, nextId);
        },

        /**
         * Set the active box directly (e.g. when the user clicks an existing box).
         */
        setActiveBox(boxId: number): void {
            patchState(store, { activeBoxId: boxId });
            persistence.save(store.selections(), boxId);
        },

        /**
         * Clear all selections, reset total to 0, activate box 1.
         */
        clear(): void {
            patchState(store, { selections: [], activeBoxId: 1 });
            persistence.save([], 1);
        },

        /**
         * Rehydrate state from localStorage on application init.
         */
        loadFromStorage(): void {
            const saved = persistence.load();
            if (!saved) return;

            const restoredActiveBoxId = resolveActiveBoxIdOnLoad(saved.selections);

            patchState(store, {
                selections: saved.selections,
                activeBoxId: restoredActiveBoxId,
            });
        },
    })),

    withHooks({
        onInit(store) {
            store.loadFromStorage();
        },
    }),
);
