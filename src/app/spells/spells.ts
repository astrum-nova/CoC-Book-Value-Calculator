import { Component } from '@angular/core';
import {PlayerData} from '../player-interfaces';
import {Spell, StaticData, Troop} from '../static-interfaces';
import {GlobalData} from '../data.service';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import { secondsToDuration } from '../utils';

@Component({
  selector: 'app-spells',
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './spells.html',
  styleUrl: './spells.css',
  standalone: true
})
export class Spells {
  protected playerData: PlayerData | undefined;
  protected staticData: StaticData | undefined;
  //@ts-ignore
  protected spells: SpellType[] = [];
  //protected exclusions: string[] = ["B.O.B's Hut", "Crafting Station", "Helper Hut", "Wall"]
  protected maxTime: number = 0;
  protected researchers: number = 0;
  protected discount: number = 0;
  constructor(private globalData: GlobalData) {}
  ngOnInit(): void {
    this.globalData.currentPlayerData.subscribe(data => this.playerData = data);
    this.globalData.currentStaticData.subscribe(data => this.staticData = data);
    this.filterTroops();
    this.spells.sort((a, b) => b.time - a.time);
  }
  recalculate(): void {
    this.spells = [];
    this.maxTime = 0;
    this.filterTroops()
    this.spells.sort((a, b) => b.time - a.time);
  }
  filterTroops(): void {
    //@ts-ignore
    this.playerData?.spells?.forEach(spell => {
      let currentSpell: any = this.getCurrentTroop(spell.data);
      let levelIndex = spell.lvl! == 0 ? 0 : spell.lvl! - 1;
      let max = currentSpell.levels.length < levelIndex + 2
      if (this.playerData!.buildings[15].lvl! >= currentSpell.levels[levelIndex].required_lab_level + 1) {
        if (!max && currentSpell.levels[levelIndex + 1].upgrade_time * ((100 - this.discount) / 100) > this.maxTime) this.maxTime = currentSpell.levels[levelIndex + 1].upgrade_time * ((100 - this.discount) / 100);
        this.spells.push({
          name: currentSpell.name,
          level: currentSpell.levels[levelIndex].level,
          next: max ? -1 : currentSpell.levels[levelIndex].level + 1,
          time: max ? -1 : currentSpell.levels[levelIndex].upgrade_time * ((100 - this.discount) / 100),
        })
      }
    })
  }
  getCurrentTroop(search: any): Spell {
    let res: Spell;
    this.staticData!.spells.forEach((spell: any) => {
      if (spell._id == search) {
        res = spell;
      }
    })
    return res!;
  }
  protected readonly secondsToDuration = secondsToDuration;
}
interface SpellType {
  name: string,
  level: number,
  next: number,
  time: number,
}
