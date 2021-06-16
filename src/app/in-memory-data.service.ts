import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes: Hero[] = [
      { id: 11, heroName: 'Dr Nice' },
      { id: 12, heroName: 'Narco' },
      { id: 13, heroName: 'Bombasto' },
      { id: 14, heroName: 'Celeritas' },
      { id: 15, heroName: 'Magneta' },
      { id: 16, heroName: 'RubberMan' },
      { id: 17, heroName: 'Dynama' },
      { id: 18, heroName: 'Dr IQ' },
      { id: 19, heroName: 'Magma' },
      { id: 20, heroName: 'Tornado' },
      { id: 21, heroName: 'WonderWoman' },
      { id: 22, heroName: 'Lu Bu ' },
    ];
    return { heroes };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  // FIXME
  genId(heroes: Hero[]): number {
    return heroes.length > 0
      ? Math.max(...heroes.map((hero) => hero.id)) + 1
      : 11;
  }
}
