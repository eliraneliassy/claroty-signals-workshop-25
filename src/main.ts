import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {createSignal, effect} from './app/signal';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));


const [counter, setCounter] = createSignal<number>(0);
const [firstName, setFirstName] = createSignal<string>('Eliran');
const [lastName, setLastName] = createSignal<string>('Eliassy');

effect(() => {
  console.log('COUNTER IS', counter())
});
setCounter(counter() + 1);
setCounter(counter() + 1);

effect(() => {
  console.log('FULL NAME IS', firstName(), lastName());
});

setFirstName('Ben');
setLastName('Marder');

