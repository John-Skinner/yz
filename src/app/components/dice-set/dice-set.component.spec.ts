import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiceSetComponent } from './dice-set.component';

describe('DiceSetComponent', () => {
  let component: DiceSetComponent;
  let fixture: ComponentFixture<DiceSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiceSetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiceSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
