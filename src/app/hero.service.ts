import { Injectable } from '@angular/core';
import { Hero } from './heros/hero';
import { Heroes } from './heros/mock-heroes';
import { Observable, of, throwError } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

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
      'Content-Type':'application/json'
    })
  }
  getHeroes(): Observable<Hero[]> {
    this.log('fetch heroes data')
    return this.http.get<Hero[]>(this.heroUrl).pipe(
      tap(_ => console.log('items fetched')),
      catchError(this.handleError<Hero[]>('getHeroes',[]))
    );
  }

  // getHero(id: Number): Observable<Hero | undefined> {
  //   let foundHero: Hero | undefined = Heroes.find(item => item.id === id);
  //   this.messageService.add(`HeroService: fetch hero id=${id}`);
  //   return of(foundHero)
  // }

  getHero(id: number): Observable<Hero>{
    const url = `${this.heroUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => console.log(`Fetch single hero item by id ${id}`)),
      catchError(this.handleError<Hero>(`getHero id = ${id}`))
    )
  }

  private log(msg: string){
    this.messageService.add(`HeroService: ${msg}`);
  }

  private handleError<X>(operation = 'operation', result?: X){
    return (error: any): Observable<X> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as X)
    } 
  }
}
