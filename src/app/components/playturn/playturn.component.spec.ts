import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayturnComponent } from './playturn.component';

describe('PlayturnComponent', () => {
  let component: PlayturnComponent;
  let fixture: ComponentFixture<PlayturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayturnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
