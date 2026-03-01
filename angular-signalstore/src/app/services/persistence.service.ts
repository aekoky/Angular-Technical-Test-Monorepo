import { Injectable } from '@angular/core';
import { Selection } from '../models/option.model';

const STORAGE_KEY = 'ng-signalstore-state';

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

    save(selections: Selection[], activeBoxId: number): void {
        const persisted: PersistedState = { selections, activeBoxId };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));
    }
}
