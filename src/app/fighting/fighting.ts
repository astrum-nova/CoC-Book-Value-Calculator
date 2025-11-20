import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {secondsToDuration} from '../utils';
import {PlayerData} from '../player-interfaces';
import {StaticData, Troop} from '../static-interfaces';
import {GlobalData} from '../data.service';

@Component({
  selector: 'app-fighting',
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './fighting.html',
  styleUrl: './fighting.css',
  standalone: true
})
export class Fighting {
  protected playerData: PlayerData | undefined;
  protected staticData: StaticData | undefined;
  //@ts-ignore
  protected troops: TroopType[] = [];
  protected maxTime: number = 0;
  protected researchers: number = 0;
  protected discount: number = 0;
  constructor(private globalData: GlobalData) {}
  ngOnInit(): void {
    this.globalData.currentPlayerData.subscribe(data => this.playerData = data);
    this.globalData.currentStaticData.subscribe(data => this.staticData = data);
    this.filterTroops();
    this.filterSieges();
    this.troops.sort((a, b) => b.time - a.time);
  }
  recalculate(): void {
    this.troops = [];
    this.maxTime = 0;
    this.filterTroops()
    this.filterSieges()
    this.troops.sort((a, b) => b.time - a.time);
  }
  filterTroops(): void {
    //@ts-ignore
    this.playerData?.units?.forEach(unit => {
      let currentTroop: any = this.getCurrentTroop(unit.data);
      let levelIndex = unit.lvl! == 0 ? 0 : unit.lvl! - 1;
      let max = currentTroop.levels.length < levelIndex + 2
      if (!max && this.playerData!.buildings[15].lvl! >= currentTroop.levels[levelIndex].required_lab_level + 1) {
        if (!max && currentTroop.levels[levelIndex + 1].upgrade_time * ((100 - this.discount) / 100) > this.maxTime) this.maxTime = currentTroop.levels[levelIndex + 1].upgrade_time * ((100 - this.discount) / 100);
        this.troops.push({
          name: currentTroop.name,
          level: currentTroop.levels[levelIndex].level,
          next: max ? -1 : currentTroop.levels[levelIndex].level + 1,
          time: max ? -1 : currentTroop.levels[levelIndex].upgrade_time * ((100 - this.discount) / 100),
        })
      }
    })
  }
  filterSieges(): void {
    //@ts-ignore
    this.playerData?.siege_machines?.forEach(siege => {
      let currentSiege: any = this.getCurrentTroop(siege.data);
      let levelIndex = siege.lvl! == 0 ? 0 : siege.lvl! - 1;
      let max = currentSiege.levels.length < levelIndex + 2
      if (!max && this.playerData!.buildings[0].lvl! >= currentSiege.levels[levelIndex].required_lab_level) {
        if (!max && currentSiege.levels[levelIndex + 1].upgrade_time * ((100 - this.discount) / 100) > this.maxTime) this.maxTime = currentSiege.levels[levelIndex + 1].upgrade_time * ((100 - this.discount) / 100);
        this.troops.push({
          name: currentSiege.name,
          level: currentSiege.levels[levelIndex].level,
          next: max ? -1 : currentSiege.levels[levelIndex].level + 1,
          time: max ? -1 : currentSiege.levels[levelIndex].upgrade_time * ((100 - this.discount) / 100),
        })
      }
    })
  }
  getCurrentTroop(search: any): Troop {
    let res: Troop;
    this.staticData!.troops.forEach((troop: any) => {
      if (troop._id == search) {
        res = troop;
      }
    })
    return res!;
  }
  protected readonly secondsToDuration = secondsToDuration;
}
interface TroopType {
  name: string,
  level: number,
  next: number,
  time: number,
}
