import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { wordsWithHints, WordWithHint } from '../../app/wordsWithHints';

@Component({
  selector: 'app-guess-game',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="container">
<h1 class="title">Gissa Ordet</h1>

<!-- Startvy -->
<div *ngIf="!gameStarted && !gameOver" class="start-view">
<label>Speltid: </label>
<select class="duration-select" [(ngModel)]="duration">
<option [value]="30">30 sekunder</option>
<option [value]="60">60 sekunder</option>
<option [value]="90">90 sekunder</option>
</select>
 <button class="start-button"(click)="startGame()">Starta spelet</button>
</div>

<!-- Spelvy -->
<div *ngIf="gameStarted" class="game-view">
<h2 class="word-display">{{ currentWord }}</h2>
<p class="time-left">Tid kvar: {{ timeLeft }} sek</p>
<p class="current-score">Poäng: {{ score }}</p>
<p class="hint-label">Ledtråd:</p>
<p class="hint-text"> {{ currentHint || 'Inga ledtrådar använda'}}</p>
<button class="hintBtn"(click)="showHint()">Visa ledtråd</button>
<div class="gameBtns">
<button class="correctBtn"(click)="handleCorrectGuess()">Nästa ord</button>
<button class="passBtn"(click)="handlePass()">Pass</button>
 </div>
</div>

<!-- Game Over -->
<div *ngIf="gameOver" class="game-over">
<h2>Tiden är ute!</h2>
<h3>Total poäng: {{ score }}</h3>
 <div class="game-over-buttons">
<button class="againBtn"(click)="startGame()">Spela igen</button>
<button class="backBtn"(click)="backToStart()">Tillbaka till start</button>
</div>
 </div>
</div>`,
styleUrls: ['./guess-game.scss']

})
export class GuessGameComponent implements OnDestroy {
  currentWord: string = '';
  currentHint: string = '';
  score: number = 0;
  gameStarted: boolean = false;
  gameOver: boolean = false;
  duration: number = 60;
  timeLeft: number = this.duration;
  timer!: ReturnType<typeof setInterval>;

  constructor(private cdr: ChangeDetectorRef) {}

  startGame(): void {
    this.gameStarted = true;
    this.gameOver = false;
    this.score = 0;
    this.timeLeft = this.duration;
    this.getNextWord();
    this.startTimer();
  }

  startTimer(): void {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.timeLeft--;
      this.cdr.detectChanges();
      if (this.timeLeft <= 0) {
        clearInterval(this.timer);
        this.gameStarted = false;
        this.gameOver = true;
        this.timeLeft = 0;
        this.cdr.detectChanges();
      }
    }, 1000);
  }

  getNextWord(): void {
    const randomIndex = Math.floor(Math.random() * wordsWithHints.length);
    const wordObj = wordsWithHints[randomIndex];
    this.currentWord = wordObj.word;
    this.currentHint = ''; // göm hint tills spelaren ber om den
  }

  handleCorrectGuess(): void {
    this.score++;
    this.getNextWord();
  }

  handlePass(): void {
    this.getNextWord();
  }

  showHint(): void {
    const found: WordWithHint | undefined = wordsWithHints.find(
      w => w.word === this.currentWord
    );
    if (found) {
      this.currentHint = found.hint;
    }
  }

  backToStart(): void {
    clearInterval(this.timer);
    this.gameStarted = false;
    this.gameOver = false;
    this.score = 0;
    this.currentWord = '';
    this.currentHint = '';
    this.timeLeft = this.duration;
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}
