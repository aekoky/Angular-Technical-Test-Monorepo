# angular-signalstore

Angular 17+ application implementing the **Box Selector** feature using **NgRx SignalStore** (`@ngrx/signals`).

## Running the App

```bash
npm install
npx ng serve          # http://localhost:4200
npx ng test           # unit tests (Karma/Jasmine)
npx ng build          # production build
```

## State Architecture

All state lives in the singleton `AppStore` — components are purely presentational.

```
AppStore (signalStore, providedIn: 'root')
│
├── withState<AppState>
│     ├── options[]       — static jump-code catalogue
│     ├── selections[]    — { boxId, optionId } pairs
│     └── activeBoxId     — currently focused box
│
├── withComputed
│     ├── total           — Σ option values (derived, never stored)
│     └── selectionMap    — Record<boxId, optionId> for O(1) lookup
│
├── withMethods
│     ├── select(boxId, optionId)  — assign + advance active box
│     ├── setActiveBox(boxId)      — change focused box
│     ├── clear()                  — reset all
│     └── loadFromStorage()        — rehydrate from localStorage
│
└── withHooks
      └── onInit → loadFromStorage()
```

### Persistence

`PersistenceService` reads/writes `localStorage` key `ng-signalstore-state`. State is rehydrated synchronously inside `onInit` — no flicker on load.

## Project Structure

```
src/app/
├── data/
│   └── options.data.ts          # Static jump-code definitions
├── models/
│   └── option.model.ts          # Option, Selection, AppState interfaces
├── services/
│   └── persistence.service.ts  # localStorage adapter
├── store/
│   └── app.store.ts            # NgRx SignalStore definition
└── components/
    ├── box/                     # Single selection box (computed signals)
    ├── boxes-container/         # 10-box horizontal row
    ├── option-selector/         # Grouped options panel (3 categories)
    ├── total-display/           # Running total label
    └── clear-button/            # Trash icon reset button
```

## Key Patterns

- **`signalStore`** — declarative, composable store built with `withState`, `withComputed`, `withMethods`, `withHooks`
- **`computed` signals** in components — `isActive`, `isFilled`, `label`, `score`, category filters; all re-evaluate automatically when store state changes
- **`selectionMap`** — `Record<boxId, optionId>` computed signal gives O(1) box lookup vs O(n) `.find()` on every render
- **`ChangeDetectionStrategy.OnPush`** on every component — change detection triggered only when signal values change
- **No `async` pipe** — signals are synchronous, templates read them directly with `()`

## RxJS vs SignalStore Comparison

| Aspect | angular-rxjs | angular-signalstore |
|---|---|---|
| State primitive | `Observable` | `Signal` |
| Derived state | RxJS `map` + `distinctUntilChanged` | `computed()` |
| Template binding | `async` pipe | Direct signal call `()` |
| State updates | `Subject.next(action)` | `patchState(store, {...})` |
| Component subscription | `combineLatest` ViewModel | `computed` per property |
| Boilerplate | Medium (reducer + action types) | Low (withMethods) |
