# angular-rxjs

Angular 17+ application implementing the **Box Selector** feature using **RxJS Observables** with a reducer-style `scan` pipeline.

## Running the App

```bash
npm install
npx ng serve          # http://localhost:4200
npx ng test           # unit tests (Karma/Jasmine)
npx ng build          # production build
```

## State Architecture

State is managed entirely inside `BoxService` — no state is held in components.

```
User action
    │
    ▼
BoxService.actions$ (Subject<Action>)
    │
    ▼  startWith(INIT) → scan(reducer, initialState)
state$ (Observable<AppState>)  ──tap──▶  PersistenceService (localStorage)
    │
    ├── options$         (distinctUntilChanged)
    ├── selections$      (distinctUntilChanged)
    ├── activeBoxId$     (distinctUntilChanged)
    ├── total$           (derived — never stored)
    └── activeOptionId$(boxId)  (per-box derived stream)
```

### Actions (discriminated union)

| Action | Payload | Effect |
|---|---|---|
| `INIT` | — | Initialises state from persisted value |
| `SELECT` | `boxId`, `optionId` | Assigns option to box, advances active box |
| `SET_ACTIVE_BOX` | `boxId` | Changes the highlighted box |
| `CLEAR` | — | Wipes all selections, resets to box 1 |

### Persistence

`PersistenceService` reads/writes `localStorage` key `ng-rxjs-state`. Only `selections` and `activeBoxId` are persisted (options are static).

## Project Structure

```
src/app/
├── data/
│   └── options.data.ts          # Static jump-code definitions
├── models/
│   └── option.model.ts          # Option, Selection, AppState interfaces
├── services/
│   ├── box.service.ts           # Central state + reducer
│   └── persistence.service.ts  # localStorage adapter
└── components/
    ├── box/                     # Single selection box
    ├── boxes-container/         # 10-box horizontal row
    ├── option-selector/         # Grouped options panel (3 categories)
    ├── total-display/           # Running total label
    └── clear-button/            # Trash icon reset button
```

## Key Patterns

- **`scan` + `shareReplay(1)`** — single shared state stream; all derived streams tap from it
- **`combineLatest`** in components — builds a ViewModel observable, consumed via `async` pipe → zero manual subscription management
- **`ChangeDetectionStrategy.OnPush`** on every component — rendering driven purely by the async pipe
- **`distinctUntilChanged`** on all derived streams — prevents unnecessary re-renders
