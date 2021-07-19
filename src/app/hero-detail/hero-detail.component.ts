import { Location } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';
import { Hero } from '../heros/hero';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero?:Hero;
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  foundHero$!:Observable<Hero | undefined>
  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get("id"));
    this.foundHero$ = this.heroService.getHero(id);
  }

  goBack(): void{
    this.location.back();
  }
  
}
