import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { Heroes } from './mock-heroes';

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.css']
})
export class HerosComponent implements OnInit {
  hero: Hero = {
    id: 1,
    name: 'Windstorm',
  }

  heroes = Heroes;

  constructor() { }

  ngOnInit(): void {
  }

  selectedHero?: Hero;
  onSelect(hero: Hero):void{
    console.log('onSelected');
    this.selectedHero = hero;
  }

}
