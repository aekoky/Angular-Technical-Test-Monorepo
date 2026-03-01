import { Injectable } from '@angular/core';
import { AppState, Selection } from '../models/option.model';

const STORAGE_KEY = 'ng-rxjs-state';

interface PersistedState {
    selections: Selection[];
    activeBoxId: number;
}

@Injectable({ providedIn: 'root' })
export class PersistenceService {
    load(): PersistedState | null {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return null;
            return JSON.parse(raw) as PersistedState;
        } catch {
            return null;
        }
    }

    save(state: AppState): void {
        const persisted: PersistedState = {
            selections: state.selections,
            activeBoxId: state.activeBoxId,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));
    }

    clear(): void {
        localStorage.removeItem(STORAGE_KEY);
    }
}
