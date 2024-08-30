export interface SimulatorData {
  players: Player[];
  events: GameEvent[];
  isGameOver: boolean;
}

export interface Player {
  nickname: string;
  avatar: string;
  status: PlayerStatus;
  hasEvent: boolean;
}

export interface GameEvent {
  playersInEvent: Player[];
  text: string;
}

export enum PlayerStatus {
  Dead,
  Alive,
}

export enum EventType {
  Kill,
  Suicide,
}