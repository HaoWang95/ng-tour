import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { Hero } from './hero';

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.css']
})
export class HerosComponent implements OnInit {

  heroes$!: Observable<Hero[]>;

  constructor(private heroService:HeroService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getHeros()
  }

  selectedHero?: Hero;
  onSelect(hero: Hero):void{
    this.selectedHero = hero;
    this.messageService.add(`hero ${hero.id} - ${hero.name} is selected`)
  }

  getHeros(): void{
    this.heroes$ = this.heroService.getHeroes();
    this.messageService.add('Hero component received heroes data');
  }
}
