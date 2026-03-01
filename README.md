# Angular Technical Test — Monorepo

This repository contains two independent Angular 17+ applications implementing the **same feature set** using two different state-management approaches. The goal is to showcase enterprise-grade architecture patterns and compare the two paradigms.

## Projects

| Project | State strategy | Default port |
|---|---|---|
| [`angular-rxjs`](./angular-rxjs) | RxJS Observables (reducer + `scan`) | `4200` |
| [`angular-signalstore`](./angular-signalstore) | NgRx SignalStore (`@ngrx/signals`) | `4200` |

## Shared Feature Requirements

Both apps implement identical behaviour:

- **10 selection boxes** displayed in a full-width horizontal bar
- Clicking a box marks it as **active** (highlighted in green)
- An **options panel** below lists available jump codes grouped by category:
  - *front salto's* — codes 101–108
  - *back salto's* — codes 201–208
  - *Other* — codes 301, 302, 303, 401, 403, 5132
- Selecting an option assigns it to the active box and **auto-advances** to the next empty box
- A **running total** (sum of option values) is displayed in the side card
- A **trash button** clears all selections
- **State is persisted** in `localStorage` and restored on page refresh

## UI Design

- Light neutral background `#f5f6f8`
- Boxes: light gray `#f0f0f0`, active box soft green `#cfe8d5`
- Option buttons styled as **3-D keyboard keys** with press animation
- Selected option highlighted in pink/magenta `#e91e63`
- White card options panel with blue section titles
- Font: Inter (Google Fonts)

## Architecture Principles (both projects)

- ✅ Standalone components, `ChangeDetectionStrategy.OnPush`
- ✅ No component-level business state (all state lives in service/store)
- ✅ Strong typing throughout — discriminated unions, interfaces
- ✅ Derived state computed, never stored redundantly
- ✅ Composable, testable services/stores
- ✅ Predictable, reducer-style state transitions

## Getting Started

```bash
# Run the RxJS version
cd angular-rxjs
npm install
npx ng serve

# Run the SignalStore version (separate terminal)
cd angular-signalstore
npm install
npx ng serve --port 4201
```
