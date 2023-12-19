import { Component } from '@angular/core';
import {DiceComponent} from "../dice/dice.component";

@Component({
  selector: 'app-dice-set',
  standalone: true,
  imports: [
    DiceComponent
  ],
  templateUrl: './dice-set.component.html',
  styleUrl: './dice-set.component.scss'
})
export class DiceSetComponent {
  diceDiameter=350;

}
