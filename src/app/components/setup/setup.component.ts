import {Component} from '@angular/core';
import {GameService, GameState} from "../../services/game.service";

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [],
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.css'
})
export class SetupComponent {
  currentEnterPlayer = 0;
  disablePlayerEntry:boolean[] = [false,true,true,true];

  constructor(private gameService:GameService)
  {

  }
  enterPlayer(event:any, playerNumber:number) {
    const name=event.target.value;
    if (name.length === 0) {
      return;
    }
    if (this.currentEnterPlayer === 0) {
      this.gameService.players = [];
    }
    if (playerNumber < this.currentEnterPlayer) {
      this.gameService.players[playerNumber] = name;
      return;
    }
    this.gameService.players.push(name);
    this.currentEnterPlayer++;
    this.disablePlayerEntry[this.currentEnterPlayer]=false;
    console.log('enter player name:'+name)



  }
  done() {
    this.disablePlayerEntry[this.currentEnterPlayer]=true;
    this.gameService.changeTabIndex(0);
    this.gameService.startTurn();
    this.gameService.changeGameState(GameState.start);

  }

}
