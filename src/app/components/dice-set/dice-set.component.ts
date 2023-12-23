import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {DiceComponent} from "../dice/dice.component";
import {GameService, GameState} from "../../services/game.service";
import {PlayturnComponent} from "../playturn/playturn.component";

@Component({
  selector: 'app-dice-set',
  standalone: true,
  imports: [
    DiceComponent,
    PlayturnComponent
  ],
  templateUrl: './dice-set.component.html',
  styleUrl: './dice-set.component.scss'
})
export class DiceSetComponent implements AfterViewInit {
  dice:DiceComponent[] = [];
  @ViewChild('dice1') dice1:DiceComponent | null = null;
  @ViewChild('dice2') dice2:DiceComponent | null = null;
  @ViewChild('dice3') dice3:DiceComponent | null = null;
  @ViewChild('dice4') dice4:DiceComponent | null = null;
  @ViewChild('dice5') dice5:DiceComponent | null = null;
  constructor(private gameService:GameService) {
    this.gameService.onGameStateChanged().subscribe((gameState)=> {
      if (gameState === GameState.start) {
        this.setSelectionAllowed(false);
      }
    })

  }
  diceDiameter=350;
  rollAll() {
    console.log(`rollAll(${this.dice.length}`);
    this.dice.forEach((d,i)=> {
      console.log(`select state:${d.selectedState}`)

        console.log(`rolling die:${i}`)
        d.selectedState = false;
        d.roll();


    })
    this.dice.forEach((d,i)=> {
      this.gameService.currentDice[i] = d.diceValue;
    })

  }
  rollSelected() {
    console.log(`rollSelected(${this.dice.length}`);
    this.dice.forEach((d,i)=> {
      console.log(`select state:${d.selectedState}`)
      if (d.selectedState) {
        console.log(`rolling die:${i}`)
        d.selectedState = false;
        d.roll();

      }
    })
    this.dice.forEach((d,i)=> {
      this.gameService.currentDice[i] = d.diceValue;
    })

  }
  setSelectionAllowed(allow:boolean) {
    this.dice.forEach((d)=> {
      d.AllowSelect = allow;
    })
  }

  throwDice(throwNumber:string) {
    console.log(`throw number:${throwNumber}`);
    switch (throwNumber) {
      case '0':
      {
        this.rollAll();
        this.setSelectionAllowed(true);
        break;
      }
      case '1': {
        this.rollSelected();
        this.gameService.resetDiceSelected();

          this.setSelectionAllowed(true);

        break;
      }
      case '2':{
        this.rollSelected();
        this.gameService.resetDiceSelected();
        this.setSelectionAllowed(false);

      }
    }

}
userThrew(on:boolean) {
    this.gameService.diceSelected();
}


  ngAfterViewInit(): void {
    if (!this.dice1 || !this.dice2 || !this.dice3 || !this.dice4 || !this.dice5) {
      return;
    }
    this.dice = [this.dice1,this.dice2,this.dice3,this.dice4,this.dice5];
  }

}
