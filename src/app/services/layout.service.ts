import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  screenDims=[0,0];

  constructor() { }
  setScreenDims(w:number,h:number) {
    this.screenDims[0] = w;
    this.screenDims[1] = h;
    console.log(`screen dims:${this.screenDims[0]} x ${this.screenDims[1]}`);
  }
  getScreenDims() {
    return this.screenDims;
  }

}
