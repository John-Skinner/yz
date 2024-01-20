import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

export type scoreRow = {
  name: string,
  score: number[];
};

export enum ScoreType
{
  ones,
  twos,
  threes
}

export enum GameState
{
  start = 'start',
  scoreReady = 'scoreUpdate',
  end = 'end'
}

@Injectable({
  providedIn: 'root'
})


export class GameService
{
  isMobileProp = false;
  players: string[] = [];
  scoreArray = new Int32Array(0);
  tableSize = 20;
  isDerivedRow: boolean[] = [];
  scoreOptions = new Int32Array(0);
  threeOfaKind = 10;
  fourOfaKind = 11;
  fullHouse = 12;
  smallStraight = 13;
  largeStraight = 14;
  totalOfaKind = 6;
  bonus = 7;
  totalUpper = 8;
  totalLower = 18;
  grandTotal = 19;
  yahtzeeBonus = 17;

  yahtzeeRow = 15;
  chance = 16;

  newTurnSubject: Subject<number> = new Subject<number>();
  diceWasSelectedSubject = new Subject<void>();
  suggestTabMove: Subject<number> = new Subject<number>()
  gameStateChanged: Subject<GameState> = new Subject<GameState>();
  currentDice: number[] = [0, 0, 0, 0, 0];
  currentPlayer = 0;
  currentGameState = GameState.start;
  diceWasSelected = false;
  currentThrow = 0;

  constructor()
  {
    this.isDerivedRow.length = this.tableSize;
    this.isDerivedRow.forEach((v, i) =>
    {
      this.isDerivedRow[i] = false;
    });
    this.isDerivedRow[this.totalOfaKind] = true;
    this.isDerivedRow[this.bonus] = true;
    this.isDerivedRow[this.totalUpper] = true;
    this.isDerivedRow[this.yahtzeeBonus] = true;
    this.isDerivedRow[this.totalLower] = true;
    this.isDerivedRow[this.grandTotal] = true;

  }
  setMoble(isMobile:boolean) {
    this.isMobileProp = isMobile;
  }
  isMobile() {
    return this.isMobileProp;
  }

  onDiceWasSelected()
  {
    return this.diceWasSelectedSubject.asObservable();
  }

  onGameTabIndexSuggest()
  {
    return this.suggestTabMove.asObservable();
  }

  onGameStateChanged()
  {
    return this.gameStateChanged.asObservable();
  }

  onNewTurn()
  {
    return this.newTurnSubject.asObservable();
  }

  changeGameState(state: GameState)
  {
    this.currentGameState = state;

    if (state === GameState.start)
    {
      this.loadScoreArray();
    }
    if (state === GameState.scoreReady)
    {
      this.evaluatePossibleScores();
    }
    this.gameStateChanged.next(state);
  }

  loadScoreArray()
  {

    this.scoreOptions = new Int32Array(this.tableSize);
    this.scoreOptions.forEach((v) =>
    {
      v = 0;
    })
    this.scoreArray = new Int32Array(this.tableSize * this.players.length);
    this.players.forEach((pname, i) =>
    {
      for (let row = 0; row < this.tableSize; row++)
      {
        this.setScoreValue(row, i, 0);
      }
    })

  }

  changeTabIndex(index: number)
  {
    this.suggestTabMove.next(index);
  }

  setScoreValue(row: number, player: number, value: number)
  {

    let index = this.players.length * row + player;
    this.scoreArray[index] = value;
  }

  getScoreValue(row: number, player: number)
  {
    let index = this.players.length * row + player;
    let value = this.scoreArray[index];
    return value;
  }

  getOptionValue(row: number)
  {
    let v = this.scoreOptions[row];
    return v;
  }

  clearOptionValues()
  {
    this.scoreOptions.forEach((v,i) =>
    {
      this.scoreOptions[i] = -1;
    })
  }

  newTurn()
  {
    this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
    this.clearOptionValues();
    this.currentDice = [0, 0, 0, 0, 0];
    this.newTurnSubject.next(this.currentPlayer);
  }

  startTurn()
  {
    this.currentPlayer = 0;
    this.clearOptionValues();
    this.newTurnSubject.next(this.currentPlayer);
  }

  diceSelected()
  {
    if (!this.diceWasSelected)
    {
      this.diceWasSelected = true;
      this.diceWasSelectedSubject.next();
    }
  }

  resetDiceSelected()
  {
    this.diceWasSelected = false;
  }

  sumOfAKind(value: number, minimum: number)
  {
    let total = 0;
    let matchedCount = 0;
    this.currentDice.forEach((v) =>
    {
      if (v === value)
      {
        total += v;
        matchedCount++
      }
    })
    if (matchedCount >= minimum)
    {
      return total;
    }
    return 0;
  }

  longestNonZero(array: number[])
  {
    let started = -1;
    let ended = -1;
    let longest = 0;
    array.forEach((v, i) =>
    {
      if (v > 0)
      {
        if (started === -1)
        {
          started = i;
        }
        ended = i;
        let run = ended - started + 1;
        console.log(`consider run ${ended} ${started}`);
        if (longest < run)
        {
          longest = run;
        }
      } else
      {
        started = -1;
      }
    })
    // did we end on a non-zero matched[5]? then consider the matched[6] as a 0, and
    // calculate final run length.

    if (started !== -1)
    {
      let finalRun = ended - started + 1;
      console.log(`consider run ${ended} ${started}`);
      if (longest < finalRun)
      {
        longest = finalRun;
      }
    }
    return longest;
  }

  evaluateTotals()
  {
    this.players.forEach((player, i) =>
    {
      let upperSum = 0;
      for (let upperIndex = 0; upperIndex < 6; upperIndex++)
      {
        let rowValue = this.getScoreValue(upperIndex, i);
        upperSum += rowValue;
      }
      this.setScoreValue(this.totalOfaKind, i, upperSum);
      let bonus = 0;
      if (upperSum >= 63)
      {
        bonus = 35;
      }
      this.setScoreValue(this.bonus, i, bonus);
      let totalUpper = this.getScoreValue(this.totalOfaKind, i) +
        this.getScoreValue(this.bonus, i);
      this.setScoreValue(this.totalUpper, i, totalUpper);
      let lowerTotal =
        this.getScoreValue(this.threeOfaKind, i) +
        this.getScoreValue(this.fourOfaKind, i) +
        this.getScoreValue(this.fullHouse, i) +
        this.getScoreValue(this.smallStraight, i) +
        this.getScoreValue(this.largeStraight, i) +
        this.getScoreValue(this.chance,i) +
        this.getScoreValue(this.yahtzeeRow, i);
      this.setScoreValue(this.totalLower, i, lowerTotal);
      let grandTotal = this.getScoreValue(this.totalUpper, i) +
        this.getScoreValue(this.totalLower, i);
      console.error(`setting grand total to ${grandTotal} for player:${player}`);
      this.setScoreValue(this.grandTotal, i, grandTotal);
    });


  }

  evaluatePossibleScores()
  {
    this.scoreOptions.forEach((v,i) =>
    {
      this.scoreOptions[i] = 0;
    })
    let matched = [0, 0, 0, 0, 0, 0];
    let value = 0;
    for (let ofakind = 1; ofakind <= 6; ofakind++)
    {
      value = this.sumOfAKind(ofakind, 0);
      this.scoreOptions[ofakind - 1] = value;
    }
    this.currentDice.forEach((dv) =>
    {
      matched[dv-1]++;
    });

    // 3 of a kind
    value = 0;
    let numberOfSame = 0;
    matched.forEach((v) =>
    {
      if (v >= 3)
      {
        numberOfSame = v;
      }
    })
    if (numberOfSame >= 3)
    {
      this.currentDice.forEach((dv) =>
      {
        value += dv;
      })
      this.scoreOptions[this.threeOfaKind] = value;
    }

  value = 0;
    // 4 of a kind
    if (numberOfSame >= 4)
    {
      this.currentDice.forEach((dv) =>
      {
        value += dv;
      })
      this.scoreOptions[this.fourOfaKind] = value;
    }

    // full house
    let numberUnique = 0;
    matched.forEach((v) =>
    {
      if (v > 0)
      {
        numberUnique++;
      }
    });
    console.log(`numberUnique:${numberUnique}`);
    if ((numberUnique === 2) && (numberOfSame === 3))
    {
      this.scoreOptions[this.fullHouse] = 25;
    }
    if (numberUnique === 1)
    {
      this.scoreOptions[this.yahtzeeRow] = 50;
    }

    // small straight

    let longestRun = this.longestNonZero(matched);
    if (longestRun >= 4)
    {
      this.scoreOptions[this.smallStraight] = 30;
    }
    // large straight
    if (longestRun >= 5)
    {
      this.scoreOptions[this.largeStraight] = 40;
    }

    // chance
    value = 0;
    this.currentDice.forEach((dv) =>
    {
      value += dv;
    })
    this.scoreOptions[this.chance] = value;

  }

  commitRowChoice(row: number)
  {
    if (this.scoreOptions[row] === 0)
    {
      this.setScoreValue(row, this.currentPlayer, -1);
    } else
    {
      this.setScoreValue(row, this.currentPlayer, this.scoreOptions[row]);
    }

  }

}
