export interface PlayerData {
  tag: string
  timestamp: number
  helpers: Helper[]
  buildings: Building[]
  guardians: Guardian[]
  traps: Trap[]
  decos: Deco[]
  obstacles: Obstacle[]
  units: Unit[]
  siege_machines: SiegeMachine[]
  heroes: Her[]
  spells: Spell[]
  pets: Pet[]
  equipment: Equipment[]
  house_parts: number[]
  skins: number[]
  sceneries: number[]
  buildings2: Buildings2[]
  traps2: Traps2[]
  decos2: Decos2[]
  obstacles2: Obstacles2[]
  units2: Units2[]
  heroes2: Heroes2[]
  skins2: any[]
  sceneries2: any[]
  boosts: Boosts
}

export interface Helper {
  data: number
  lvl: number
}

export interface Building {
  data: number
  lvl?: number
  weapon?: number
  gear_up?: number
  supercharge?: number
  types?: Type[]
  cnt?: number
}

export interface Type {
  data: number
  modules: Module[]
}

export interface Module {
  data: number
  lvl: number
}

export interface Guardian {
  data: number
  lvl: number
  timer?: number
  helper_timer?: number
}

export interface Trap {
  data: number
  lvl: number
  timer?: number
  cnt?: number
}

export interface Deco {
  data: number
  cnt: number
}

export interface Obstacle {
  data: number
  cnt: number
}

export interface Unit {
  timer?: number
  data: number
  lvl: number
}

export interface SiegeMachine {
  timer?: number
  data: number
  lvl: number
}

export interface Her {
  timer: number | undefined;
  data: number
  lvl: number
}

export interface Spell {
  data: number
  lvl: number
}

export interface Pet {
  timer: number | undefined;
  data: number
  lvl: number
}

export interface Equipment {
  data: number
  lvl: number
}

export interface Buildings2 {
  data: number
  lvl: number
  cnt: number
}

export interface Traps2 {
  data: number
  lvl: number
  cnt: number
}

export interface Decos2 {
  data: number
  cnt: number
}

export interface Obstacles2 {
  data: number
  cnt: number
}

export interface Units2 {
  data: number
  lvl: number
}

export interface Heroes2 {
  data: number
  lvl: number
}

export interface Boosts {}
