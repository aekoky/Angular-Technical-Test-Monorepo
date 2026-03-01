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
      <div class="top-section">
        <app-boxes-container />
        <div class="side-card">
          <app-clear-button />
          <app-total-display />
        </div>
      </div>
      <app-option-selector />
    </div>
  `,
  styleUrl: './app.css',
})
export class App { }
