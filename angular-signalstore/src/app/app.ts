import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BoxesContainerComponent } from './components/boxes-container/boxes-container.component';
import { OptionSelectorComponent } from './components/option-selector/option-selector.component';
import { TotalDisplayComponent } from './components/total-display/total-display.component';
import { ClearButtonComponent } from './components/clear-button/clear-button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    BoxesContainerComponent,
    OptionSelectorComponent,
    TotalDisplayComponent,
    ClearButtonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="app">
      <header class="app__header">
        <h1 class="app__title">Box Selector</h1>
        <span class="app__badge">NgRx SignalStore</span>
      </header>

      <main class="app__main">
        <app-boxes-container />
        <app-option-selector />
      </main>

      <footer class="app__footer">
        <app-total-display />
        <app-clear-button />
      </footer>
    </div>
  `,
})
export class App { }
