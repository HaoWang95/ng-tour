import { Injectable } from '@angular/core';
import { Hero } from './heros/hero';
import { Heroes } from './heros/mock-heroes';
import { Observable, of, throwError } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }
  getHeroes(): Observable<Hero[]>{
    this.messageService.add('HeroService: fetch heroes data');
    return of(Heroes);
  }

  getHero(id: Number): Observable<Hero | undefined>{
    let foundHero: Hero | undefined = Heroes.find(item => item.id === id);
    this.messageService.add(`HeroService: fetch hero id=${id}`);
    return of(foundHero)
  }
}
