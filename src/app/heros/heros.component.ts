import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { Hero } from './hero';

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HerosComponent implements OnInit, OnDestroy {

  heroes$!: Observable<Hero[]>;
  postHero$!: Observable<Hero>;

  heroesData: Hero[] = [];

  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getHeros();
  }

  selectedHero?: Hero;
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`hero ${hero.id} - ${hero.name} is selected`)
  }

  getHeros(): void {
    this.heroes$ = this.heroService.getHeroes();
    this.heroService.fetchHeroes().subscribe(
      data => this.heroesData = data
    );
    for(let item of this.heroesData){
      console.log(item.id, item.name)
    }
    this.messageService.add('Hero component received heroes data');
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({ name } as Hero).subscribe(
      hero => this.heroesData.push(hero)
    )
  }

  delete(id: number): void {
    id = Number(id);
    this.heroService.deleteHero(id).subscribe();
    this.heroesData = this.heroesData.filter(items => items.id !== id);
  }

  ngOnDestroy() {
    console.log('hero component destoryed')
  }
}
