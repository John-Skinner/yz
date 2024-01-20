import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DiceComponent} from "../dice/dice.component";
import {GameService, GameState} from "../../services/game.service";
import {PlayturnComponent} from "../playturn/playturn.component";
import {LayoutService} from "../../services/layout.service";


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
export class DiceSetComponent implements AfterViewInit,OnInit {
  dice:DiceComponent[] = [];
  @ViewChild('dice1') dice1:DiceComponent | null = null;
  @ViewChild('dice2') dice2:DiceComponent | null = null;
  @ViewChild('dice3') dice3:DiceComponent | null = null;
  @ViewChild('dice4') dice4:DiceComponent | null = null;
  @ViewChild('dice5') dice5:DiceComponent | null = null;
  constructor(private gameService:GameService,private layoutService:LayoutService) {
    this.gameService.onGameStateChanged().subscribe((gameState)=> {
      if (gameState === GameState.start) {
        this.setSelectionAllowed(false);
      }
    });
    this.gameService.onNewTurn().subscribe((player)=> {
      this.clearDice();
      this.setSelectionAllowed(false);

    })

  }
  diceDiameter=350;
  clearDice() {
    this.dice.forEach((d)=> {
      d.setValueAndDraw(0);
    })
  }
  rollAll() {
    this.dice.forEach((d,i)=> {

        d.selectedState = false;
        d.roll();


    })
    this.dice.forEach((d,i)=> {
      this.gameService.currentDice[i] = d.diceValue;
    })

  }
  rollSelected() {
    this.dice.forEach((d,i)=> {
      if (d.selectedState) {
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

  throwDice(throwNumber:number) {
    switch (throwNumber) {
      case 0:
      {
        this.rollAll();
        this.setSelectionAllowed(true);
        break;
      }
      case 1: {
        this.rollSelected();
        this.gameService.resetDiceSelected();

          this.setSelectionAllowed(true);

        break;
      }
      case 2:{
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

  ngOnInit(): void {
    let dims = this.layoutService.getScreenDims();
    let minDim = Math.min(dims[0],dims[1]);
    console.log(`service screen dims:${dims}`);
    this.diceDiameter = Math.floor(minDim/4.0);
  }

}
