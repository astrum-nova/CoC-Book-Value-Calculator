import { Routes } from '@angular/router';
import {Building} from './building/building';
import {Spells} from './spells/spells';
import {Heroes} from './heroes/heroes';
import {Fighting} from './fighting/fighting';

export const routes: Routes = [
  {path: "building", component: Building},
  {path: "fighting", component: Fighting},
  {path: "heroes", component: Heroes},
  {path: "spells", component: Spells},
  {path: '', redirectTo: '/building', pathMatch: 'full'}
];
