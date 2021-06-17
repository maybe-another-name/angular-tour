import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';

import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesUrl = 'api/heroes';

  httpWriteOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  getHeroes(): Observable<Hero[]> {
    this.logToService('fetching heroes');
    return this.http
      .get<Hero[]>(this.heroesUrl)
      .pipe(catchError(this.handleError<Hero[]>('getHeroes', [])));
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    this.logToService(`fetching hero id=${id}`);
    return this.http
      .get<Hero>(url)
      .pipe(catchError(this.handleError<Hero>(`getHero id=${id}`)));
  }

  updateHero(hero: Hero): Observable<Hero | any> {
    this.logToService(`updating hero id=${hero.id}`);
    return this.http
      .put(this.heroesUrl, hero, this.httpWriteOptions)
      .pipe(catchError(this.handleError<Hero>('updateHero')));
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http
      .post<Hero>(this.heroesUrl, hero, this.httpWriteOptions)
      .pipe(
        tap((newHero: Hero) =>
          this.logToService(`added hero id=${newHero.id}`)
        ),
        catchError(this.handleError<Hero>('addHero'))
      );
  }

  deleteHero(heroId: number): Observable<Hero | any> {
    const url = `${this.heroesUrl}/${heroId}`;

    return this.http.delete<Hero>(url, this.httpWriteOptions).pipe(
      tap((_) => this.logToService(`deleted hero id=${heroId}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  searchHeroes(nameTerm: string): Observable<Hero[]> {
    if (!nameTerm.trim()) {
      return of([]);
    }

    this.logToService(`searching for heroes matching: ${nameTerm}`);
    return this.http
      .get<Hero[]>(`${this.heroesUrl}/?heroName=${nameTerm}`)
      .pipe(
        tap((result) =>
          result.length > 0
            ? this.logToService(`found heroes matching "${nameTerm}"`)
            : this.logToService(`no heroes matching "${nameTerm}"`)
        ),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
  }

  private logToService(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation: string = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.logToService(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
