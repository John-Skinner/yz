import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

export type scoreRow = {
  name:string,
  score:number[];
};
export enum ScoreType {
  ones,
  twos,
  threes
}
export enum GameState {
  start='start',
  scoreReady='scoreUpdate',
  end='end'
}
@Injectable({
  providedIn: 'root'
})


export class GameService {
  players:string[] = [];
  scoreArray = new Int32Array(0);
  scoreOptions=new Int32Array(0);
  numScoreRows: number = 19;
  threeOfaKind=10;
  fourOfaKind=11;
  fullHouse = 12;
  smallStraight=13;
  largeStraight=14;
  yahtzeeRow=15;
  chance=16;

  newTurnSubject:Subject<number> = new Subject<number>();
  diceWasSelectedSubject = new Subject<void>();
  suggestTabMove:Subject<number> = new Subject<number>()
  gameStateChanged:Subject<GameState> = new Subject<GameState>();
  currentDice:number[] = [0,0,0,0,0];
  currentPlayer=0;
  currentGameState=GameState.start;
  diceWasSelected = false;
  currentThrow=0;
  constructor() { }

  onDiceWasSelected() {
    return this.diceWasSelectedSubject.asObservable();
  }
  onGameTabIndexSuggest() {
    return this.suggestTabMove.asObservable();
  }
  onGameStateChanged() {
    return this.gameStateChanged.asObservable();
  }
  onNewTurn() {
    return this.newTurnSubject.asObservable();
  }
  changeGameState(state:GameState) {
    this.currentGameState = state;

    if (state === GameState.start) {
      this.loadScoreArray();
    }
    if (state===GameState.scoreReady) {
      this.evaluatePossibleScores();
    }
    this.gameStateChanged.next(state);
  }
  loadScoreArray() {

    this.scoreOptions = new Int32Array(this.numScoreRows);
    this.scoreOptions.forEach((v)=> {
      v = 0;
    })
    this.scoreArray = new Int32Array(this.numScoreRows*this.players.length);
    this.players.forEach((pname,i)=> {
      for (let row=0;row < this.numScoreRows;row++) {
        this.setScoreValue(row,i,0);
      }
    })

  }
  changeTabIndex(index:number) {
    this.suggestTabMove.next(index);
  }
  setScoreValue(row:number,player:number,value:number) {

    let index = this.players.length*row+player;
    this.scoreArray[index] = value;
  }
  getScoreValue(row:number,player:number) {
    let index = this.players.length*row+player;
    let value = this.scoreArray[index];
    return value;
  }
  getOptionValue(row:number) {
    let v = this.scoreOptions[row];
    return v;
  }
  clearOptionValues() {
    this.scoreOptions.forEach((v)=> {
      v = -1;
    })
  }
  newTurn() {
    this.currentPlayer = (this.currentPlayer+1) % this.players.length;
    this.clearOptionValues();
    this.currentDice = [0,0,0,0,0];
    this.newTurnSubject.next(this.currentPlayer);
  }
  startTurn() {
    this.currentPlayer = 0;
    this.clearOptionValues();
    this.newTurnSubject.next(this.currentPlayer);
  }
  diceSelected() {
    if (!this.diceWasSelected) {
      this.diceWasSelected = true;
      this.diceWasSelectedSubject.next();
    }
  }
  resetDiceSelected() {
    this.diceWasSelected = false;
  }
  sumOfAKind(value:number, minimum:number) {
    let total = 0;
    let matchedCount = 0;
    this.currentDice.forEach((v)=> {
      if (v === value) {
        total += v;
        matchedCount++
      }
    })
    if (matchedCount >= minimum) {
      return total;
    }
    return 0;
  }
  evaluatePossibleScores() {
    let value = 0;
    for (let ofakind = 1;ofakind <= 6;ofakind++) {
      value = this.sumOfAKind(ofakind,0);
      this.scoreOptions[ofakind-1] = value;
    }
    // chance
    value = 0;
    this.currentDice.forEach((dv)=> {
      value += dv;
    })
    this.scoreOptions[this.chance] = value;
  }
  commitRowChoice(row:number) {
    if (this.scoreOptions[row] === 0) {
      this.setScoreValue(row,this.currentPlayer,-1);
    }
    else {
      this.setScoreValue(row,this.currentPlayer,this.scoreOptions[row]);
    }

  }

}
