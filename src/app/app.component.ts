import {Component, ElementRef, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {DiceSetComponent} from "./components/dice-set/dice-set.component";
import {ScoresComponent} from "./components/scores/scores.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DiceSetComponent, ScoresComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild('dicePanel') dicePanel:ElementRef | null = null;
  @ViewChild('scorePanel') scorePanel:ElementRef | null = null;
  title = 'yahtzee';
  showDice() {
    console.log('show dice');
    let diceDiv = this.dicePanel?.nativeElement as HTMLDivElement;
    let scoreDiv = this.scorePanel?.nativeElement as HTMLDivElement;
    scoreDiv.style.visibility='hidden';
    diceDiv.style.visibility = 'visible';

  };
  showScores() {
    console.log('show scores');
    let diceDiv = this.dicePanel?.nativeElement as HTMLDivElement;
    let scoreDiv = this.scorePanel?.nativeElement as HTMLDivElement;
    scoreDiv.style.visibility='visible';
    diceDiv.style.visibility = 'hidden';

  }
}
