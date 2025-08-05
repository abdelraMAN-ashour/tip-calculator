import { Component } from '@angular/core';
import { TipCalcComponent } from "./tip-calc/tip-calc.component";
import { TipDataComponent } from "./tip-data/tip-data.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TipCalcComponent, TipDataComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
