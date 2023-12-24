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

  constructor(private gameService:GameService) {
    this.gameService.onDiceWasSelected().subscribe(()=> {
      this.allowNextThrow();
    });
    this.gameService.onNewTurn().subscribe((player)=> {
      this.currentPlayer = this.gameService.players[player];
      this.throwState = 0;
    })
  }
  allowNextThrow() {
    this.throwState = this.throwNextStateIfSelectionMade;
  }
  currentPlayer = this.gameService.players[this.gameService.currentPlayer];
  throwState = 0;
  throwNextStateIfSelectionMade = 0;
  @Output() throwDice  = new EventEmitter<string>();
  throw() {
    this.throwDice.emit('0');
    this.throwState = -1;
    this.throwNextStateIfSelectionMade = 1;

  }
  throw2() {
    this.throwDice.emit('1');
    this.throwState = -1;
    this.throwNextStateIfSelectionMade = 2;

  }
  throw3() {
    this.throwDice.emit('2');
    this.throwState = -1;
    this.throwNextStateIfSelectionMade = 3;
    this.gameService.changeGameState(GameState.scoreReady);

  }

}
