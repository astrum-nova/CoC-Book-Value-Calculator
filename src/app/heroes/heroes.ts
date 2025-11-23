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
    this.filterHeroes();
    if (this.showPets) this.filterPets()
    this.heroes.sort((a, b) => b.time - a.time);
  }
  recalculate(): void {
    this.heroes = [];
    this.maxTime = 0;
    this.filterHeroes()
    if (this.showPets) this.filterPets()
    this.heroes.sort((a, b) => b.time - a.time);
  }
  filterHeroes(): void {
    //@ts-ignore
    this.playerData?.heroes?.forEach(hero => {
      let currentHero: any = this.getCurrentHero(hero.data);
      let levelIndex = hero.lvl! == 0 ? 0 : hero.lvl! - 1;
      let max = currentHero.levels.length < levelIndex + 2
      if (!max && getObjectByID(1000071, this.playerData?.buildings!).lvl! >= currentHero.levels[levelIndex + 1].required_hero_tavern_level) {
        if (!max && currentHero.levels[levelIndex + 1].upgrade_time * ((100 - this.discount) / 100) > this.maxTime) this.maxTime = currentHero.levels[levelIndex + 1].upgrade_time * ((100 - this.discount) / 100);
        if (hero.timer == undefined) this.heroes.push({
          name: currentHero.name,
          level: currentHero.levels[levelIndex].level,
          next: currentHero.levels[levelIndex].level + 1,
          time: currentHero.levels[levelIndex].upgrade_time * ((100 - this.discount) / 100),
          pet: false,
          max: currentHero.levels.length
        })
      } else {
        this.heroes.push({
          name: currentHero.name,
          level: currentHero.levels[levelIndex].level,
          next: -1,
          time: -1,
          pet: false,
          max: currentHero.levels.length
        })
      }
    })
  }
  filterPets(): void {
    //@ts-ignore
    this.playerData?.pets?.forEach(pet => {
      let currentPet: any = this.getCurrentPet(pet.data);
      let levelIndex = pet.lvl! == 0 ? 0 : pet.lvl! - 1;
      let max = currentPet.levels.length < levelIndex + 2
      if (!max && getObjectByID(1000068, this.playerData?.buildings!).lvl! >= currentPet.levels[levelIndex + 1].lab_level) {
        if (pet.timer == undefined) this.heroes.push({
          name: currentPet.name,
          level: currentPet.levels[levelIndex].level,
          next: currentPet.levels[levelIndex].level + 1,
          time: currentPet.levels[levelIndex].upgrade_time * ((100 - this.discount) / 100),
          pet: true,
          max: currentPet.levels.length
        })
      } else {
        this.heroes.push({
          name: currentPet.name,
          level: currentPet.levels[levelIndex].level,
          next: -1,
          time: -1,
          pet: true,
          max: currentPet.levels.length
        })
      }
    })
  }
  getCurrentHero(search: any): any {
    let res;
    this.staticData!.heroes.forEach((hero: any) => {
      if (hero._id == search) {
        res = hero;
      }
    })
    return res!;
  }
  getCurrentPet(search: any): any {
    let res;
    this.staticData!.pets.forEach((pet: any) => {
      if (pet._id == search) {
        res = pet;
      }
    })
    return res!;
  }
  protected readonly secondsToDuration = secondsToDuration;
  protected poh: boolean | undefined;
  protected showPets: boolean = true;
  protected showPetsReason: boolean = false;
}
interface HeroType {
  name: string,
  level: number,
  next: number,
  time: number,
  pet: boolean,
  max: number
}
