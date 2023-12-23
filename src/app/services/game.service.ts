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
  end='end'
}
@Injectable({
  providedIn: 'root'
})


export class GameService {
  players:string[] = [];
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
  changeGameState(state:GameState) {
    this.currentGameState = state;
    this.gameStateChanged.next(state);
  }
  changeTabIndex(index:number) {
    this.suggestTabMove.next(index);
  }
  diceSelected() {
    if (!this.diceWasSelected) {
      this.diceWasSelected = true;
      this.diceWasSelectedSubject.next();
    }
  }
  resetDiceSelected() {
    console.log(`diceWasSelected reset`)
    this.diceWasSelected = false;
  }



}
