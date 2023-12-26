import { TestBed } from '@angular/core/testing';

import {GameService, GameState} from './game.service';
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {AppComponent} from "../app.component";

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        NoopAnimationsModule,
      ],


    }).compileComponents();
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('rules',()=> {
    service.changeGameState(GameState.start);
    service.currentDice = [1,2,3,4,5];
    service.evaluatePossibleScores();
    let largeStraight=service.getOptionValue(service.largeStraight);
    expect(largeStraight).toEqual(40);
    service.currentDice = [2,3,4,5,6];
    service.evaluatePossibleScores();
    largeStraight = service.getOptionValue(service.largeStraight);
    expect(largeStraight).toEqual(40);
    let smallStraight = service.getOptionValue(service.smallStraight);
    expect(smallStraight).toEqual(30);
    let threeOfAKind = service.getOptionValue(service.threeOfaKind);
    expect(threeOfAKind).toEqual(0);
    service.currentDice = [1,1,1,4,5];
    service.evaluatePossibleScores();
    threeOfAKind = service.getOptionValue(service.threeOfaKind);
    expect(threeOfAKind).toEqual(3);
    let fourOfAKind=service.getOptionValue(service.fourOfaKind);
    expect(fourOfAKind).toEqual(0);
    service.currentDice = [1,1,1,1,5];
    service.evaluatePossibleScores();
    fourOfAKind = service.getOptionValue(service.fourOfaKind);
    expect(fourOfAKind).toEqual(4);
    service.currentDice = [4,5,6,4,6];
    service.evaluatePossibleScores();
    smallStraight = service.getOptionValue(service.smallStraight);
    expect(smallStraight).toEqual(0);

  })
});
