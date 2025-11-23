import { Component, signal } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {GlobalData} from './data.service';
import {NgIf} from '@angular/common';
import {PlayerData} from './player-interfaces';
import {StaticData} from './static-interfaces';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, RouterLink, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('CoC-Book-Value-Calculator');
  public rawPlayerData: string = '';
  public playerData: PlayerData | undefined;
  public staticData: StaticData | undefined;
  constructor(private http: HttpClient, private globalData: GlobalData, private router: Router) {
    this.http.get<StaticData>("https://raw.githubusercontent.com/ClashKingInc/ClashKingAssets/refs/heads/main/assets/static_data.json").subscribe({
      next: (data: any) => this.staticData = data,
      error: () => console.error("COULD NOT FETCH STATIC GAME DATA FROM https://raw.githubusercontent.com/ClashKingInc/ClashKingAssets/refs/heads/main/assets/static_data.json")
    });
  }
  ngOnInit() {
    this.router.navigate(['']);
  }
  processRawPlayerData() {
    try {this.playerData = JSON.parse(this.rawPlayerData);}
    catch (e) {this.playerData!.tag = "ERROR";}
    this.globalData.updatePlayerData(this.playerData!)
    this.globalData.updateStaticData(this.staticData!)
  }
}
