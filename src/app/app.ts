import { Component, signal } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('CoC-Book-Value-Calculator');
  public rawPlayerData: string = '';
  public playerData: any = {}
  processRawPlayerData() {
    this.playerData = JSON.parse(this.rawPlayerData);
  }
}
