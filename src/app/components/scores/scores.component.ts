import { Component } from '@angular/core';
import {DiceComponent} from "../dice/dice.component";


@Component({
  selector: 'app-scores',
  standalone: true,
  imports: [
    DiceComponent
  ],
  templateUrl: './scores.component.html',
  styleUrl: './scores.component.scss'
})
export class ScoresComponent {
  diceDiameter=50;
  current(dieNumber:number) {
    return 3;
  }

}
