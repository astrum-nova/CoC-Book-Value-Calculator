import { Component } from '@angular/core';
import {GlobalData} from '../data.service';
import {NgForOf} from '@angular/common';
import {PlayerData} from '../player-interfaces';
import {StaticData} from '../static-interfaces';
import {secondsToDuration} from '../utils';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-building',
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './building.html',
  styleUrl: './building.css',
})
export class Building {
  protected playerData: PlayerData | undefined;
  protected staticData: StaticData | undefined;
  //@ts-ignore
  protected buildings: BuildingType[] = [];
  protected exclusions: string[] = ["B.O.B's Hut", "Crafting Station", "Helper Hut", "Wall"]
  protected maxTime: number = 0;
  protected builders: number = 0;
  constructor(private globalData: GlobalData) {}
  ngOnInit(): void {
    this.globalData.currentPlayerData.subscribe(data => this.playerData = data);
    this.globalData.currentStaticData.subscribe(data => this.staticData = data);
    this.filterBuildings()
    this.filterTraps()
    this.buildings.sort((a, b) => b.time - a.time);
  }
  filterBuildings(): void {
    //@ts-ignore
    this.playerData.buildings.forEach(building => {
      let currentBuilding: any = this.getCurrentBuilding(building.data);
      let levelIndex = building.lvl! == 0 ? 0 : building.lvl! - 1;
      let max = currentBuilding.levels.length < levelIndex + 2
      if (!this.exclusions.includes(currentBuilding.name) && this.playerData!.buildings[0].lvl! >= currentBuilding.levels[levelIndex].required_townhall) {
        if (!max && currentBuilding.levels[levelIndex + 1].upgrade_time > this.maxTime) this.maxTime = currentBuilding.levels[levelIndex + 1].upgrade_time;
        for (let i = 0; i < building.cnt!; i++) {
          this.buildings.push({
            name: currentBuilding.name,
            level: currentBuilding.levels[levelIndex].level,
            next: max ? -1 : currentBuilding.levels[levelIndex].level + 1,
            time: max ? -1 : currentBuilding.levels[levelIndex + 1].upgrade_time,
          })
        }
      }
    })
  }
  private filterTraps() {
    //@ts-ignore
    this.playerData?.traps.forEach(building => {
      let currentTrap: any = this.getCurrentTrap(building.data);
      let levelIndex = building.lvl! == 0 ? 0 : building.lvl! - 1;
      let max = currentTrap.levels.length < levelIndex + 2;
      if (!this.exclusions.includes(currentTrap.name) && this.playerData!.buildings[0].lvl! >= currentTrap.levels[levelIndex].required_townhall) {
        if (!max && currentTrap.levels[levelIndex + 1].upgrade_time > this.maxTime) this.maxTime = currentTrap.levels[levelIndex + 1].upgrade_time;
        for (let i = 0; i < building.cnt!; i++) {
          this.buildings.push({
            name: currentTrap.name,
            level: currentTrap.levels[levelIndex].level,
            next: max ? -1 : currentTrap.levels[levelIndex].level + 1,
            time: max ? -1 : currentTrap.levels[levelIndex + 1].upgrade_time,
          })
        }
      }
    })
  }
  getCurrentBuilding(search: any): any {
    let res = null;
    this.staticData!.buildings.forEach((building: any) => {
      if (building._id == search) {
        res = building;
      }
    })
    return res;
  }
  getCurrentTrap(search: any): any {
    let res = null;
    this.staticData!.traps.forEach((trap: any) => {
      if (trap._id == search) {
        res = trap;
      }
    })
    return res;
  }

  protected readonly secondsToDuration = secondsToDuration;
}
interface BuildingType {
  name: string,
  level: number,
  next: number,
  time: number,
}
