import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {StaticData} from './static-interfaces';
import {PlayerData} from './player-interfaces';

@Injectable({ providedIn: 'root' })
export class GlobalData {
  // @ts-ignore
  private staticData = new BehaviorSubject<StaticData>(null);
  // @ts-ignore
  private playerData = new BehaviorSubject<PlayerData>(null);
  currentStaticData = this.staticData.asObservable();
  currentPlayerData = this.playerData.asObservable();
  updateStaticData(data: StaticData) {
    this.staticData.next(data);
  }
  updatePlayerData(data: PlayerData) {
    this.playerData.next(data);
  }
}
