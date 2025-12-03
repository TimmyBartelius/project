import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Här importerar vi ordlistan
import { words } from '../../app/words';

@Component({
  selector: 'app-guess-game',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h1 class="title">Gissa Ordet</h1>

    <!-- Startvy -->
    <div *ngIf="!gameStarted && !gameOver" class="start-view">
      <label>Speltid: </label>
      <select [(ngModel)]="duration">
        <option [value]="30">30 sekunder</option>
        <option [value]="60">60 sekunder</option>
        <option [value]="90">90 sekunder</option>
      </select>
      <button (click)="startGame()">Starta spelet</button>
    </div>

    <!-- Spelvy -->
    <div *ngIf="gameStarted" class="game-view">
      <h2 class="word-display">{{ currentWord }}</h2>
      <p class="time-left">Tid kvar: {{ timeLeft }} sek</p>
      <p class="current-score">Poäng: {{ score }}</p>
      <button (click)="handleCorrectGuess()">Nästa ord</button>
      <button (click)="handlePass()">Pass</button>
    </div>

    <!-- Game Over -->
    <div *ngIf="gameOver" class="game-over">
      <h2>Tiden är ute!</h2>
      <h3>Total poäng: {{ score }}</h3>
      <button (click)="startGame()">Spela igen</button>
      <button (click)="backToStart()">Tillbaka till start</button>
    </div>
  `,
  styles: [`
    .title { text-align: center; margin-bottom: 20px; }
    .start-view, .game-view, .game-over { text-align: center; margin-top: 20px; }
    .word-display { font-size: 2rem; margin: 20px 0; }
    button { margin: 5px; padding: 10px 15px; font-size: 1rem; cursor: pointer; }
  `]
})
export class GuessGameComponent implements OnDestroy {
  currentWord: string = '';
  score: number = 0;
  gameStarted: boolean = false;
  gameOver: boolean = false;
  duration: number = 60;
  timeLeft: number = this.duration;
  timer!: ReturnType<typeof setInterval>;

  constructor(private cdr: ChangeDetectorRef) {}

  // Starta spelet
  startGame(): void {
    this.gameStarted = true;
    this.gameOver = false;
    this.score = 0;
    this.timeLeft = this.duration;
    this.currentWord = this.getRandomWord();
    this.startTimer();
  }

  // Nedräkning
  startTimer(): void {
  clearInterval(this.timer);
  this.timer = setInterval(() => {
    this.timeLeft--;
    this.cdr.detectChanges(); // <-- tvingar Angular att uppdatera vyn
    if (this.timeLeft <= 0) {
      clearInterval(this.timer);
      this.gameStarted = false;
      this.gameOver = true;
      this.timeLeft = 0;
      this.cdr.detectChanges(); // se till att game-over syns direkt
    }
  }, 1000);
}


  // Hämta slumpord
  getRandomWord(): string {
    const index = Math.floor(Math.random() * words.length);
    return words[index];
  }

  handleCorrectGuess(): void {
    this.score++;
    this.currentWord = this.getRandomWord();
  }

  handlePass(): void {
    this.currentWord = this.getRandomWord();
  }

  backToStart(): void {
    clearInterval(this.timer);
    this.gameStarted = false;
    this.gameOver = false;
    this.score = 0;
    this.currentWord = '';
    this.timeLeft = this.duration;
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}
