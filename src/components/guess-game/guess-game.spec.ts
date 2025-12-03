import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessGame } from './guess-game';

describe('GuessGame', () => {
  let component: GuessGame;
  let fixture: ComponentFixture<GuessGame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuessGame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuessGame);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
