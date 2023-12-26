import {Component, EventEmitter, Output} from '@angular/core';
import {GameService, GameState} from "../../services/game.service";

@Component({
  selector: 'app-playturn',
  standalone: true,
  imports: [],
  templateUrl: './playturn.component.html',
  styleUrl: './playturn.component.scss'

})
export class PlayturnComponent {
  numThrows = 0;
  constructor(private gameService:GameService) {
    console.log(`numThrows:${this.numThrows}`);
    this.gameService.onDiceWasSelected().subscribe(()=> {
      this.allowNextThrow();
    });
    this.gameService.onNewTurn().subscribe((player)=> {
      this.currentPlayer = this.gameService.players[player];
      this.numThrows = 0;

    })
  }
  allowNextThrow() {
    this.numThrows = this.numThrows*-1;

    console.log(`numThrows:${this.numThrows}`);
  }
  currentPlayer = this.gameService.players[this.gameService.currentPlayer];
  @Output() throwDice  = new EventEmitter<number>();
  throw() {
    this.throwDice.emit(this.numThrows);
    this.numThrows++;
    this.numThrows = this.numThrows*-1;

  }
  score() {
    this.gameService.changeGameState(GameState.scoreReady)
    this.gameService.changeTabIndex(1);
  }


}
