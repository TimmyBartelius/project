import { bootstrapApplication } from '@angular/platform-browser';
import { GuessGameComponent } from './components/guess-game/guess-game';

bootstrapApplication(GuessGameComponent)
  .catch(err => console.error(err));
