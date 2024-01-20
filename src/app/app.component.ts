import {AfterViewInit, Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {DiceSetComponent} from "./components/dice-set/dice-set.component";
import {ScoresComponent} from "./components/scores/scores.component";
import { MatTabsModule } from "@angular/material/tabs";
import {SetupComponent} from "./components/setup/setup.component";
import {GameService} from "./services/game.service";
import {LayoutService} from "./services/layout.service";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DiceSetComponent, ScoresComponent, MatTabsModule, SetupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit{


  controlTabIndex  =2;

  title = 'yahtzee';
  constructor(private gameService:GameService, private layoutService:LayoutService) {
    this.gameService.onGameTabIndexSuggest().subscribe((i) => {
      console.log(`changing control from ${this.controlTabIndex} to ${i}`);
      this.controlTabIndex=i;
    })
    let isMobileWidth = window.matchMedia("only screen and (max-width:1000px)");
    let isMobileHeight = window.matchMedia('only screen and (max-height:1000px)');
    let isMobile = isMobileWidth.matches && isMobileHeight.matches;
    console.log(`isMobile:${isMobile}`);
    this.gameService.setMoble(isMobile);
    this.layoutService.setScreenDims(window.innerWidth,window.innerHeight);
  }

  ngAfterViewInit(): void {


  }


}
