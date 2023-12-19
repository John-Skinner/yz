import {Component, ElementRef, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {DiceSetComponent} from "./components/dice-set/dice-set.component";
import {ScoresComponent} from "./components/scores/scores.component";
import { MatTabsModule } from "@angular/material/tabs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DiceSetComponent, ScoresComponent, MatTabsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'yahtzee';


}
