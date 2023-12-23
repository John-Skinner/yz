import {Component, EventEmitter, Output} from '@angular/core';
import {GameService} from "../../services/game.service";

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
      console.log('saw onDiceWasSelected');
      this.allowNextThrow();
    })
  }
  allowNextThrow() {
    this.throwState = this.throwNextStateIfSelectionMade;
    console.log(`new throw state:${this.throwState}`);
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

  }

}
