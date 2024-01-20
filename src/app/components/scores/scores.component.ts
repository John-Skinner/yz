import {Component} from '@angular/core';
import {DiceComponent} from "../dice/dice.component";
import {GameService, GameState} from "../../services/game.service";
import {NgForOf} from "@angular/common";


@Component({
  selector: 'app-scores',
  standalone: true,
  imports: [
    DiceComponent,
    NgForOf
  ],
  templateUrl: './scores.component.html',
  styleUrl: './scores.component.scss'
})
export class ScoresComponent {
  diceDiameter = 15;
  selectionApplied = false;
  chosenRow = -1;
  ApplyMsg = 'Apply';


  constructor(private gameService: GameService) {
    this.gameService.onNewTurn().subscribe((player) => {
      this.chosenRow = -1;

    })
    this.gameService.onGameStateChanged().subscribe((state) => {
      if (state === GameState.scoreReady) {
        this.selectionApplied = false;
        this.ApplyMsg = 'Apply';
      }
    })

  }

  getPlayerName(i: number) {
    const emptyName = '-----';
    if (i >= this.gameService.players.length) {
      return emptyName;
    }
    if (this.gameService.players[i].length === 0) {
      return emptyName;
    }
    return this.gameService.players[i];

  }

  current(dieNumber: number) {

    return this.gameService.currentDice[dieNumber];
  }

  choseRow(row: number) {
    console.log(`chose row:${row}`);
    this.chosenRow = row;
  }

  getFinalScoreString(row: number, otherPlayer: number) {
    let value = this.gameService.getScoreValue(row, otherPlayer);
    if (this.gameService.isDerivedRow[row]) {
      return value.toString();
    }
    if (value === -1) {
      return "0";
    }
    if (value > 0) {
      return value.toString();
    }
    return '';
  }

  isChoiceAlreadyTaken(row: number) {
    let value = this.gameService.getScoreValue(row, this.gameService.currentPlayer);
    return (value === -1) || (value > 0);
  }

  getOptionScoreString(row: number, player: number) {
    let value = this.gameService.getScoreValue(row, player);
    if (value === -1) {
      return "0"
    }
    if (value === 0) {
      value = this.gameService.getOptionValue(row);
      return value.toString();
    }

    return value.toString();
  }

  editable(row: number, player: number) {
    let value = -1;
    let originalValue = -1;
    let valueString = '';
    let testValue = this.gameService.getOptionValue(row);
    if (testValue === undefined) {
      return '';
    }
    if (player >= this.gameService.players.length) {
      return '';
    }

    if ((player !== this.gameService.currentPlayer) || (this.selectionApplied)) {

      return 'fixed';
    }
    let currentFinalValue = this.gameService.getScoreValue(row, player);
    if ((player === this.gameService.currentPlayer) && (this.chosenRow === row)) {
      return 'chosenRow';
    }

    if ((currentFinalValue === -1) || (currentFinalValue > 0)) {

      return 'fixed';
    }

    console.log(`returning editable`);
    return 'editable';


  }

  entry(row: number, player: number) {
    let value = -1;
    let originalValue = -1;
    let valueString = '';
    let testValue = this.gameService.getOptionValue(row);
    if (testValue === undefined) {
      return '';
    }
    if (player >= this.gameService.players.length) {
      return '';
    }


    if ((player !== this.gameService.currentPlayer) || (this.selectionApplied)) {

      valueString = this.getFinalScoreString(row, player);
    } else {

      valueString = this.getOptionScoreString(row, player);
    }
    return valueString;


  }

  applyOption() {
    console.log(`selectionApplied?${this.selectionApplied}`);
    if (!this.selectionApplied) {
      console.log(`chosenRow?${this.chosenRow}`);
      if (this.chosenRow >= 0) {
        if (this.isChoiceAlreadyTaken(this.chosenRow)) {
          return;
        }
        let value = this.gameService.getOptionValue(this.chosenRow);
        console.log(`using value:${value} on row:${this.chosenRow}`);
        this.gameService.commitRowChoice(this.chosenRow);
        this.selectionApplied = true;
        console.log(`change apply msg to done`);
        this.ApplyMsg = 'Next Turn';
        this.gameService.evaluateTotals();
        this.gameService.newTurn();
      }
    }
    else {
      this.gameService.changeTabIndex(0);
    }
  }
}
