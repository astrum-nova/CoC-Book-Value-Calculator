import { Component } from '@angular/core';
import {PlayerData} from '../player-interfaces';
import {StaticData, Troop} from '../static-interfaces';
import {GlobalData} from '../data.service';
import { secondsToDuration, getObjectByID } from '../utils';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-heroes',
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './heroes.html',
  styleUrl: './heroes.css',
  standalone: true
})
export class Heroes {
  protected playerData: PlayerData | undefined;
  protected staticData: StaticData | undefined;
  //@ts-ignore
  protected heroes: HeroType[] = [];
  //protected exclusions: string[] = ["B.O.B's Hut", "Crafting Station", "Helper Hut", "Wall"]
  protected maxTime: number = 0;
  protected builders: number = 0;
  protected discount: number = 0;
  constructor(private globalData: GlobalData) {}
  ngOnInit(): void {
    this.globalData.currentPlayerData.subscribe(data => this.playerData = data);
    this.globalData.currentStaticData.subscribe(data => this.staticData = data);
    this.filterTroops();
    this.heroes.sort((a, b) => b.time - a.time);
  }
  recalculate(): void {
    this.heroes = [];
    this.maxTime = 0;
    this.filterTroops()
    this.heroes.sort((a, b) => b.time - a.time);
  }
  filterTroops(): void {
    //@ts-ignore
    this.playerData?.heroes?.forEach(hero => {
      let currentHero: any = this.getCurrentTroop(hero.data);
      let levelIndex = hero.lvl! == 0 ? 0 : hero.lvl! - 1;
      let max = currentHero.levels.length < levelIndex + 2
      if (!max && getObjectByID(1000071, this.playerData?.buildings!).lvl! >= currentHero.levels[levelIndex + 1].required_hero_tavern_level) {
        if (!max && currentHero.levels[levelIndex + 1].upgrade_time * ((100 - this.discount) / 100) > this.maxTime) this.maxTime = currentHero.levels[levelIndex + 1].upgrade_time * ((100 - this.discount) / 100);
        this.heroes.push({
          name: currentHero.name,
          level: currentHero.levels[levelIndex].level,
          next: currentHero.levels[levelIndex].level + 1,
          time: currentHero.levels[levelIndex].upgrade_time * ((100 - this.discount) / 100),
        })
      } else {
        this.heroes.push({
          name: currentHero.name,
          level: currentHero.levels[levelIndex].level,
          next: -1,
          time: -1,
        })
      }
    })
  }
  getCurrentTroop(search: any): any {
    let res;
    this.staticData!.heroes.forEach((hero: any) => {
      if (hero._id == search) {
        res = hero;
      }
    })
    return res!;
  }
  protected readonly secondsToDuration = secondsToDuration;
}
interface HeroType {
  name: string,
  level: number,
  next: number,
  time: number,
}
