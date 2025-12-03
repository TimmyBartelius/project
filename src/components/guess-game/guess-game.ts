import { Component, OnDestroy } from '@angular/core';
import { words } from '../../app/words';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-guess-game',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <h1 class="title">Gissa Ordet</h1>

    <!-- START VIEW -->
    @if (!gameStarted && !gameOver) {
      <div class="start-view">
        <label>Speltid:</label>
        <select [ngModel]="duration" (ngModelChange)="handleDurationChange($event)">
          <option [value]="30">30 sekunder</option>
          <option [value]="60">60 sekunder</option>
          <option [value]="90">90 sekunder</option>
        </select>
        <button class="startBtn" (click)="startGame()">Starta spelet</button>
      </div>
    }

    <!-- GAME VIEW -->
    @if (gameStarted) {
      <div class="during-game">
        <h2 class="word-display">{{ currentWord }}</h2>
        <p class="time-left">Tid kvar: {{ timeLeft }} sek</p>
        <p class="current-score">Poäng: {{ score }}</p>
        <button class="correct-guess" (click)="handleCorrectGuess()">Nästa ord</button>
        <button class="pass" (click)="handlePass()">Pass</button>
      </div>
    }

    <!-- GAME OVER VIEW -->
    @if (gameOver) {
      <div class="game-over">
        <h2 class="time-end">Tiden är ute!</h2>
        <h3 class="total-score">Total poäng: {{ score }}</h3>
        <button class="next-game" (click)="startGame()">Spela igen</button>
        <button class="back-toBtn" (click)="backToStart()">Tillbaka till start</button>
      </div>
    }
  `,
  styleUrls: ['./guess-game.scss'],
})
export class GuessGameComponent implements OnDestroy {
  currentWord: string = '';
  score: number = 0;
  gameStarted: boolean = false;
  gameOver: boolean = false;
  duration: number = 60;
  timeLeft: number = this.duration;

  timer!: ReturnType<typeof setInterval>;

  getRandomWord(): string {
    return words[Math.floor(Math.random() * words.length)];
  }

  startGame(): void {
    this.gameStarted = true;
    this.gameOver = false;
    this.score = 0;
    this.timeLeft = this.duration;
    this.currentWord = this.getRandomWord();
    this.startTimer();
  }

  startTimer(): void {
    if (this.timer) clearInterval(this.timer);

    this.timer = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        clearInterval(this.timer);
        this.gameStarted = false;
        this.gameOver = true;
        this.timeLeft = 0;
      }
    }, 1000);
  }

  handleCorrectGuess(): void {
    this.score++;
    this.currentWord = this.getRandomWord();
  }

  handlePass(): void {
    this.currentWord = this.getRandomWord();
  }

  backToStart(): void {
    this.gameStarted = false;
    this.gameOver = false;
    this.score = 0;
    this.currentWord = '';
    this.timeLeft = 0;
    this.duration = 60;

    if (this.timer) clearInterval(this.timer);
  }

  handleDurationChange(value: number): void {
    this.duration = Number(value);
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }
}
