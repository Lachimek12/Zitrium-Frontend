export interface SimulatorContextType {
  simulatorData: SimulatorData;
  nextTurn: () => void;
  addNewPlayer: (player: Player) => void;
  deletePlayer: (indexToRemove: number) => void;
  updatePlayerNickname: (playerIndex: number, playerNickname: string) => void;
  updatePlayerAvatar: (playerIndex: number, playerAvatar: string) => void;
}

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
