import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HeroService } from '../hero.service';
import { Hero } from './hero';
import { Heroes } from './mock-heroes';

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.css']
})
export class HerosComponent implements OnInit {

  heroes$!: Observable<Hero[]>;

  constructor(private heroService:HeroService) { }

  ngOnInit(): void {
    this.getHeros()
  }

  selectedHero?: Hero;
  onSelect(hero: Hero):void{
    this.selectedHero = hero;
  }

  getHeros(): void{
    this.heroes$ = this.heroService.getHeroes();
  }

}
