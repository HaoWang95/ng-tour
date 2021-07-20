import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HeroService } from '../hero.service';
import { Hero } from '../heros/hero';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  heroes$!: Observable<Hero[]>;
  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.heroes$ = this.heroService.getHeroes();
    this.heroes$.pipe(
      take(3),
      tap(items => console.log(items))
    );
  }
}
