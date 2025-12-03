import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessGameComponent } from './guess-game';

describe('GuessGameComponent', () => {
  let component: GuessGameComponent;
  let fixture: ComponentFixture<GuessGameComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuessGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuessGameComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
