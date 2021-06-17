import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  add(heroName: string): void {
    heroName = heroName.trim();
    if (!heroName) return;

    this.heroService.addHero({ heroName } as Hero).subscribe((hero) => {
      this.heroes.push(hero);
    });
  }

  delete(heroToDelete: Hero): void {
    this.heroes = this.heroes.filter((h) => h !== heroToDelete);
    this.heroService.deleteHero(heroToDelete.id).subscribe();
  }
}
