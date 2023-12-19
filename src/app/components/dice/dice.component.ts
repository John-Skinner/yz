import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {tsCreateTypeQueryForCoercedInput} from "@angular/compiler-cli/src/ngtsc/typecheck/src/ts_util";



@Component({
  selector: 'app-dice',
  standalone: true,
  imports: [],
  templateUrl: './dice.component.html',
  styleUrl: './dice.component.scss'
})
export class DiceComponent implements OnInit{
  value=-1;
  @Input() diceDiameter = 300;

  @ViewChild('diceID') myDrawCanvas:ElementRef | null = null;
  currentRoll = 1;
  constructor()
  {
  }
  numberOfRolls = 0;
  roll() {
    let newValue=Math.floor(Math.random()*6)+1;
    console.log(`roll:${this.currentRoll}`);
    switch(this.currentRoll) {
      case 1:{
        this.drawOne();
        break;
      }
      case 2:{
        this.drawTwo();
        break;
      }
      case 3:{
        this.drawThree();
        break;
      }
      case 4:{
        this.drawFour();
        break;
      }
      case 5:{
        this.drawFive();
        break;
      }
      case 6:{
        this.drawSix();
        break;
      }
    }
    this.currentRoll = (this.currentRoll++) % 6 + 1;


  }
  diceRadius() {
    return this.diceDiameter/2.0 * 0.17;
  }
  centerPoint():number[] {
    let cx = this.diceDiameter/2.0;
    let cy = this.diceDiameter/2.0;
    return [cx,cy];
  }
  drawDots(xyxyxy:number[]) {
    let canvas=this.myDrawCanvas?.nativeElement as HTMLCanvasElement;
    let ctxt = canvas.getContext('2d');
    if (ctxt) {
      let diceRadius = this.diceRadius();
      ctxt.fillStyle = 'black';
      ctxt.fillRect(0,0,this.diceDiameter-1,this.diceDiameter-1);

      ctxt.fillStyle = "white";
      for (let xyi=0;xyi < xyxyxy.length;xyi+= 2) {
        ctxt.beginPath();
        ctxt.arc(xyxyxy[xyi],xyxyxy[xyi+1],this.diceRadius(),0.0,359.99,false);
        ctxt.fill();
      }

    }
  }
  drawOne() {
      let center = this.centerPoint();
      let points = [center[0],center[1]];
      this.drawDots(points);
  }
  drawTwo() {
    let center=this.centerPoint();
    let yThirds=this.diceDiameter/3.0;
    let points = [center[0],yThirds,center[0],yThirds*2];
    this.drawDots(points);

  }
  drawThree() {
    let center=this.centerPoint();
    let yFourths=this.diceDiameter/4.0;
    let points =
      [center[0],yFourths,
      center[0],yFourths*2,
      center[0],yFourths*3];
    this.drawDots(points);
  }
  drawFour() {
    let xyFifths=this.diceDiameter/5.0;
    let points =
      [xyFifths,xyFifths,
      xyFifths,xyFifths*4,
      xyFifths*4,xyFifths,
      xyFifths*4,xyFifths*4];
    this.drawDots(points);

  }
  drawFive() {
    let xyFifths=this.diceDiameter/5.0;
    let center = this.centerPoint();
    let points =
      [xyFifths,xyFifths,
        xyFifths,xyFifths*4,
        xyFifths*4,xyFifths,
        xyFifths*4,xyFifths*4,
      center[0],center[1]];
    this.drawDots(points);

  }
  drawSix() {
    let center=this.centerPoint();
    let yFourths=this.diceDiameter/4.0;
    let yThirds=this.diceDiameter/3.0;

    let points =
      [yThirds,yFourths,
      yThirds*2,yFourths,
      yThirds,yFourths*2,
      yThirds*2,yFourths*2,
      yThirds,yFourths*3,
      yThirds*2,yFourths*3];
    this.drawDots(points);

  }
  draw() {

  }

  ngOnInit(): void
  {
  }

}
