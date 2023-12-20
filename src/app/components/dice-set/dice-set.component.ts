import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {DiceComponent} from "../dice/dice.component";

@Component({
  selector: 'app-dice-set',
  standalone: true,
  imports: [
    DiceComponent
  ],
  templateUrl: './dice-set.component.html',
  styleUrl: './dice-set.component.scss'
})
export class DiceSetComponent implements AfterViewInit {
  dice:DiceComponent[] = [];
  @ViewChild('dice1') dice1:DiceComponent | null = null;
  @ViewChild('dice2') dice2:DiceComponent | null = null;
  @ViewChild('dice3') dice3:DiceComponent | null = null;
  @ViewChild('dice4') dice4:DiceComponent | null = null;
  @ViewChild('dice5') dice5:DiceComponent | null = null;
  diceDiameter=350;
  rollSelected() {
    console.log(`rollSelected(${this.dice.length}`);
    this.dice.forEach((d,i)=> {
      console.log(`select state:${d.selectedState}`)
      if (d.selectedState) {
        console.log(`rolling die:${i}`)
        d.selectedState = false;
        d.roll();

      }
    })

  }


  ngAfterViewInit(): void {
    if (!this.dice1 || !this.dice2 || !this.dice3 || !this.dice4 || !this.dice5) {
      return;
    }
    this.dice = [this.dice1,this.dice2,this.dice3,this.dice4,this.dice5];
  }

}
