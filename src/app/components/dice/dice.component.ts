import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
  Output,
  OnChanges,
  SimpleChanges, EventEmitter
} from '@angular/core';




@Component({
  selector: 'app-dice',
  standalone: true,
  imports: [],
  templateUrl: './dice.component.html',
  styleUrl: './dice.component.scss'
})
export class DiceComponent implements OnInit, AfterViewInit, OnChanges {
  value = -1;
  hasCanvas=false;
  allowSelect = true;
  @Input() diceDiameter = 300;
  @Input() fixedValue = 0;
  @Output() selectedState = false;
  @Output() diceValue=0;
  @Output() selectionChanged = new EventEmitter<boolean>();
  @ViewChild('diceID') myDrawCanvas: ElementRef | null = null;

  constructor() {
  }

  ngAfterViewInit(): void {
    this.hasCanvas = true;
    if (this.fixedValue > 0) {
      const value = Number(this.fixedValue);

      this.drawFace(value);
    }
  };
  setValueAndDraw(value:number) {
    this.diceValue = value;
    this.drawFace(this.diceValue);
  }
  set AllowSelect(allow:boolean) {
    this.allowSelect = allow;
  }
  get AllowSelect() {
    return this.allowSelect;
  }

  numberOfRolls = 0;

  drawFace(faceValue: number) {
    switch (faceValue) {
      case 0: {
        this.drawZero();
        break;
      }
      case 1: {
        this.drawOne();
        break;
      }
      case 2: {
        this.drawTwo();
        break;
      }
      case 3: {
        this.drawThree();
        break;
      }
      case 4: {
        this.drawFour();
        break;
      }
      case 5: {
        this.drawFive();
        break;
      }
      case 6: {
        this.drawSix();
        break;
      }
    }
  };

  select() {
    if (!this.allowSelect) {
      return;
    }
    this.selectedState = !this.selectedState;
    if (this.fixedValue > 0) {
      return;
    }

    this.drawFace(this.diceValue);
    this.selectionChanged.emit(this.selectedState)
  }

  diceRadius() {
    return this.diceDiameter / 2.0 * 0.17;
  }

  centerPoint(): number[] {
    let cx = this.diceDiameter / 2.0;
    let cy = this.diceDiameter / 2.0;
    return [cx, cy];
  }
  public roll() {
    this.diceValue = Math.floor(Math.random()*6)+1;
    this.drawFace(this.diceValue);
  }

  drawDots(xyxyxy: number[]) {
    let canvas = this.myDrawCanvas?.nativeElement as HTMLCanvasElement;
    let ctxt = canvas.getContext('2d');
    if (ctxt == null) {
      return;
    }
    if (this.selectedState) {
      ctxt.fillStyle='orange';
    }
    else {
      ctxt.fillStyle='black';
    }
    if (ctxt) {
      ctxt.fillRect(0, 0, this.diceDiameter - 1, this.diceDiameter - 1);

      ctxt.fillStyle = "white";
      for (let xyi = 0; xyi < xyxyxy.length; xyi += 2) {
        ctxt.beginPath();
        ctxt.arc(xyxyxy[xyi], xyxyxy[xyi + 1], this.diceRadius(), 0.0, 359.99, false);
        ctxt.fill();
      }

    }
  }

  drawZero() {
    let points: number[] = [];
    this.drawDots(points);
  }

  drawOne() {
    let center = this.centerPoint();
    let points = [center[0], center[1]];
    this.drawDots(points);
  }

  drawTwo() {
    let center = this.centerPoint();
    let yThirds = this.diceDiameter / 3.0;
    let points = [center[0], yThirds, center[0], yThirds * 2];
    this.drawDots(points);

  }

  drawThree() {
    let center = this.centerPoint();
    let yFourths = this.diceDiameter / 4.0;
    let points =
      [center[0], yFourths,
        center[0], yFourths * 2,
        center[0], yFourths * 3];
    this.drawDots(points);
  }

  drawFour() {
    let xyFifths = this.diceDiameter / 5.0;
    let points =
      [xyFifths, xyFifths,
        xyFifths, xyFifths * 4,
        xyFifths * 4, xyFifths,
        xyFifths * 4, xyFifths * 4];
    this.drawDots(points);

  }

  drawFive() {
    let xyFifths = this.diceDiameter / 5.0;
    let center = this.centerPoint();
    let points =
      [xyFifths, xyFifths,
        xyFifths, xyFifths * 4,
        xyFifths * 4, xyFifths,
        xyFifths * 4, xyFifths * 4,
        center[0], center[1]];
    this.drawDots(points);

  }

  drawSix() {
    let yFourths = this.diceDiameter / 4.0;
    let yThirds = this.diceDiameter / 3.0;

    let points =
      [yThirds, yFourths,
        yThirds * 2, yFourths,
        yThirds, yFourths * 2,
        yThirds * 2, yFourths * 2,
        yThirds, yFourths * 3,
        yThirds * 2, yFourths * 3];
    this.drawDots(points);

  }

  draw() {

  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {

    if (this.hasCanvas) {
      this.drawFace(this.fixedValue);
    }
  }

}
