import { Injectable } from '@angular/core';
import { Hero } from './heros/hero';
import { Heroes } from './heros/mock-heroes';
import { Observable, of, throwError } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, toArray } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroUrl = 'api/heroes';

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  getHeroes(): Observable<Hero[]> {
    this.log('fetch heroes data')
    return this.http.get<Hero[]>(this.heroUrl).pipe(
      tap(_ => console.log('items fetched')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  fetchHeroes(): Observable<Hero[]>{
    this.log('fetch heroes data, do not forget to subscribe');
    return this.http.get<Hero[]>(this.heroUrl).pipe(
      tap(_ => console.log('all data has been fetched succesfully')),
      catchError(this.handleError<Hero[]>('Errors at fetchHeroes()', []))
    )
  }

  // getHero(id: Number): Observable<Hero | undefined> {
  //   let foundHero: Hero | undefined = Heroes.find(item => item.id === id);
  //   this.messageService.add(`HeroService: fetch hero id=${id}`);
  //   return of(foundHero)
  // }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => console.log(`Fetch single hero item by id ${id}`)),
      catchError(this.handleError<Hero>(`getHero id = ${id}`))
    )
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero}`)),
      catchError(this.handleError<Hero>('addHero'))
    )
  }

  deleteHero(id: number): Observable<Hero> {
    const deleteUrl = `${this.heroUrl}/${id}`;
    return this.http.delete<Hero>(deleteUrl, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    )
  }

  updateHero(hero: Hero): Observable<any>{
    const updateUrl = `${this.heroUrl}/${hero.id}`;
    return this.http.put(updateUrl, hero, this.httpOptions).pipe(
      tap(_ => console.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    ); 
  }

  private log(msg: string) {
    this.messageService.add(`HeroService: ${msg}`);
  }

  private handleError<X>(operation = 'operation', result?: X) {
    return (error: any): Observable<X> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as X)
    }
  }
}
