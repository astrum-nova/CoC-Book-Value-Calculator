export interface StaticData {
  buildings: Building[]
  hall_unlocks: HallUnlocks
  supercharges: Supercharge[]
  seasonal_defenses: SeasonalDefense[]
  traps: Trap[]
  troops: Troop[]
  spells: Spell[]
  heroes: Her[]
  pets: Pet[]
  equipment: Equipment[]
  decorations: Decoration[]
  obstacles: Obstacle[]
  sceneries: Scenery[]
  skins: Skin[]
  capital_house_parts: CapitalHousePart[]
  helpers: Helper[]
  war_leagues: WarLeague[]
  league_tiers: LeagueTier[]
}

export interface Building {
  _id: number
  name: string
  info: string
  TID: Tid
  type: string
  upgrade_resource?: string
  village_type: string
  width?: number
  superchargeable: boolean
  levels: Level[]
}

export interface Tid {
  name: string
  info: string
}

export interface Level {
  level: number
  upgrade_cost: number
  upgrade_time: number
  required_townhall?: number
  hitpoints: number
  dps?: number
}

export interface HallUnlocks {
  townhall: Townhall[]
  builderhall: Builderhall[]
}

export interface Townhall {
  level: number
  buildings_unlocked: BuildingsUnlocked[]
}

export interface BuildingsUnlocked {
  name: string
  _id: number
  quantity: number
}

export interface Builderhall {
  level: number
  buildings_unlocked: BuildingsUnlocked2[]
}

export interface BuildingsUnlocked2 {
  name: string
  _id: number
  quantity: number
}

export interface Supercharge {
  _id: string
  name: string
  target_building: string
  required_townhall_level: number
  upgrade_resource: string
  levels: Level2[]
}

export interface Level2 {
  level: number
  upgrade_cost: number
  upgrade_time: number
  hitpoints_buff?: number
  dps_buff?: number
}

export interface SeasonalDefense {
  _id: number
  name: string
  info: string
  TID: Tid2
  modules: Module[]
}

export interface Tid2 {
  name: string
  info: string
}

export interface Module {
  _id: number
  name: string
  TID: Tid3
  upgrade_resource: string
  levels: Level3[]
}

export interface Tid3 {
  name: string
}

export interface Level3 {
  level: number
  upgrade_cost: number
  upgrade_time: number
  ability_data: AbilityData
}

export interface AbilityData {
  HealthOverride?: number
  AttackSpeed?: number
  Damage?: number
  DPS?: number
  StunOnHitTime?: number
  Projectile?: string
  BurstCount?: number
  BurstDelay?: number
  DamageRadius?: number
  AttackRange?: number
}

export interface Trap {
  _id: number
  name: string
  info: string
  TID: Tid4
  width: number
  air_trigger: boolean
  ground_trigger: boolean
  damage_radius?: number
  trigger_radius: number
  village_type: string
  upgrade_resource: string
  levels: Level4[]
}

export interface Tid4 {
  name: string
  info: string
}

export interface Level4 {
  level: number
  upgrade_cost: number
  upgrade_time: number
  required_townhall: number
  damage?: number
}

export interface Troop {
  _id: number
  name: string
  info: string
  TID: Tid5
  production_building: string
  production_building_level: number
  upgrade_resource: string
  is_flying: boolean
  is_air_targeting: boolean
  is_ground_targeting: boolean
  movement_speed: number
  attack_speed: number
  attack_range: number
  housing_space: number
  village_type: string
  levels: Level5[]
  is_super_troop?: boolean
  is_seasonal?: boolean
}

export interface Tid5 {
  name: string
  info: string
}

export interface Level5 {
  level: number
  hitpoints: number
  dps?: number
  upgrade_time: number
  upgrade_cost: number
  required_lab_level?: number
  required_townhall?: number
}

export interface Spell {
  _id: number
  name: string
  info: string
  TID: Tid6
  production_building: string
  production_building_level: number
  upgrade_resource: string
  radius?: number
  housing_space: number
  levels: Level6[]
  is_seasonal?: boolean
}

export interface Tid6 {
  name: string
  info: string
}

export interface Level6 {
  level: number
  damage?: number
  upgrade_time: number
  upgrade_cost: number
  required_lab_level?: number
  required_townhall: number
}

export interface Her {
  _id: number
  name: string
  info: string
  TID: Tid7
  production_building?: string
  production_building_level?: number
  upgrade_resource: string
  is_flying: boolean
  is_air_targeting: boolean
  is_ground_targeting: boolean
  movement_speed: number
  attack_speed: number
  attack_range: number
  village_type: string
  levels: Level7[]
}

export interface Tid7 {
  name: string
  info: string
}

export interface Level7 {
  level: number
  hitpoints: number
  dps: number
  upgrade_time: number
  upgrade_cost: number
  required_townhall: number
  required_hero_tavern_level?: number
}

export interface Pet {
  _id: number
  name: string
  info: string
  TID: Tid8
  production_building: string
  production_building_level: number
  upgrade_resource: string
  is_flying: boolean
  is_air_targeting: boolean
  is_ground_targeting: boolean
  movement_speed: number
  attack_speed: number
  attack_range: number
  levels: Level8[]
}

export interface Tid8 {
  name: string
  info: string
}

export interface Level8 {
  level: number
  hitpoints: number
  dps: number
  upgrade_time: number
  upgrade_cost: number
  lab_level: number
  required_townhall: number
}

export interface Equipment {
  _id: number
  name: string
  info: string
  TID: Tid9
  production_building: string
  production_building_level: number
  rarity: string
  hero: string
  levels: Level9[]
}

export interface Tid9 {
  name: string
  info: string
  production_building: string
}

export interface Level9 {
  level: number
  hitpoints: any
  dps?: number
  heal_on_activation?: number
  required_blacksmith_level: number
  required_townhall: number
  upgrade_cost: UpgradeCost
  main_abilities: MainAbility[]
  extra_abilities?: ExtraAbility[]
}

export interface UpgradeCost {
  shiny_ore: number
  glowy_ore: number
  starry_ore: number
}

export interface MainAbility {
  Level: number
  GivenAbilityLevel?: number
  TroopCount?: number
  name: string
  info: string
  SpeedBoost?: number
  BoostDamagePercentage?: number
  ExtraDamageFlat?: number
  DeactivateAfterTime?: number
  AuraSpellLevel?: number
  Damage?: number
  HealOnActivation?: number
  SelfSpellLevel?: number
  TroopLevel?: number
  DamageRadius?: number
  ShieldProtectionPercent?: number
  GrowthScale?: number
  SelfDamagePerHit?: number
  AttackSpeed?: number
  DeactivateAfterNumberOfHits?: number
  ProjectileBounces?: number
  FrostOnHitTime?: number
  FrostOnHitPercent?: number
  InfoScreenAttribute1?: number
  HitEffect?: string
  ProjectileOnActivation?: string
  MaxActivations?: number
  PercentHealthIncrease?: number
  SpawnnedTroopsPerHit?: number
  AttackRange?: number
  CastSpellLevel?: number
  ActivationCooldown?: number
}

export interface ExtraAbility {
  Level: number
  Regeneration?: number
  name: string
  PercentHealthIncrease?: number
  BoostDamagePercentage?: number
}

export interface Decoration {
  _id: number
  name: string
  TID: Tid10
  width: number
  not_in_shop?: boolean
  pass_reward?: boolean
  max_count: number
  build_resource: string
  build_cost: number
  village_type: string
}

export interface Tid10 {
  name: string
}

export interface Obstacle {
  _id: number
  name: string
  TID: Tid11
  width: number
  clear_resource: string
  clear_cost: number
  loot_resource?: string
  loot_count?: number
  village_type: string
}

export interface Tid11 {
  name: string
}

export interface Scenery {
  _id: number
  name: string
  TID: Tid12
  type: string
  music?: string
}

export interface Tid12 {
  name: string
}

export interface Skin {
  _id: number
  name: string
  TID: Tid13
  tier?: string
  character: string
}

export interface Tid13 {
  name: string
}

export interface CapitalHousePart {
  _id: number
  name: string
  slot_type: string
  pass_reward: boolean
}

export interface Helper {
  _id: number
  name: string
  info: string
  TID: Tid14
  gender: string
  upgrade_resource: string
  levels: Level10[]
}

export interface Tid14 {
  name: string
  info: string
}

export interface Level10 {
  required_townhall: number
  upgrade_cost: number
  boost_time_seconds: number
  boost_multiplier: number
}

export interface WarLeague {
  _id: number
  name: string
  TID: Tid15
  cwl_medals: CwlMedals
  promotions: number
  demotions: number
  "15v15_only": boolean
}

export interface Tid15 {
  name: string
}

export interface CwlMedals {
  first_place: number
  position_medal_diff: number
  bonus_reward: number
  minimum_bonus_amount: number
}

export interface LeagueTier {
  name: string
  league_tier: number
  TID: Tid16
  group_size: number
  demote_percentage?: number
  promote_percentage?: number
  battle_count: number
  trophy_start: number
  clan_score: number
  townhall_cap: number
  rewards: Reward[]
}

export interface Tid16 {
  name: string
}

export interface Reward {
  townhall_level: number
  resources: Resources
  star_bonus: StarBonus
}

export interface Resources {
  gold: number
  elixir: number
  dark_elixir: number
}

export interface StarBonus {
  gold: number
  elixir: number
  dark_elixir: number
  shiny_ore: number
  glowy_ore: number
  starry_ore: number
}
