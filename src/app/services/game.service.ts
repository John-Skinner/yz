import { Injectable } from '@angular/core';
export type scoreRow = {
  name:string,
  score:number[];
};
@Injectable({
  providedIn: 'root'
})

export class GameService {
  players:string[] = [];
  currentDice:number[] = [0,0,0,0,0];
  currentPlayer=0;
  currentThrow=0;
  constructor() { }
  applyDiceToRow(name:string) {

  }

}
