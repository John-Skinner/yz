import { Component } from '@angular/core';
import {DiceComponent} from "../dice/dice.component";
import {GameService} from "../../services/game.service";
import { ScoreType} from "../../services/game.service";


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
    const emptyName='-----';
    if (i >= this.gameService.players.length) {
      return emptyName;
    }
    if (this.gameService.players[i].length === 0) {
      return emptyName;
    }
    return this.gameService.players[i];

  }
  current(dieNumber:number) {

    let comp = this.gameService.players[ScoreType.ones];

    return this.gameService.currentDice[dieNumber];
  }
  choseRow(row:number) {
    console.log(`chose row:${row}`);
  }

}
