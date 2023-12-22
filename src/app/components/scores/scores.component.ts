import { Component } from '@angular/core';
import {DiceComponent} from "../dice/dice.component";
import {GameService} from "../../services/game.service";


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

  constructor(private gameService:GameService) {

  }

  getPlayerName(i:number) {
    if (i >= this.gameService.players.length) {
      return '';
    }
    return this.gameService.players[i];

  }
  current(dieNumber:number) {
    console.log(`new die number for ${dieNumber}  ${this.gameService.currentDice[dieNumber]}`)
    return this.gameService.currentDice[dieNumber];
  }

}
