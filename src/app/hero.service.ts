import { Injectable } from '@angular/core';
import { Hero } from './heros/hero';
import { Heroes } from './heros/mock-heroes';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor() { }
  getHeroes(): Observable<Hero[]>{
    return of(Heroes);
  }
}
