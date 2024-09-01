import { SimulatorData, EventType, Player, PlayerStatus, GameEvent } from "@customTypes/simulator";

const simulatorInitialState: SimulatorData = {
  players: [],
  events: [],
  isGameOver: false,
};

function nextTurn(data: SimulatorData, setSimulatorData: React.Dispatch<React.SetStateAction<SimulatorData>>) {
  if (data.isGameOver) {
    return;
  }
  data.events = [];
  data.players.forEach((player) => (player.hasEvent = false));

  data.players.forEach((player) => {
    if (player.hasEvent || player.status == PlayerStatus.Dead) {
      return;
    }
    generateEvent(player, data);
  });

  checkGameOver(data);
  setSimulatorData(data);
}

function generateEvent(player: Player, data: SimulatorData) {
  const avaibleEvents: (string | EventType)[] = Object.values(EventType);
  const randomIndex: number = Math.floor(Math.random() * avaibleEvents.length);
  const chosenEvent: EventType = avaibleEvents[randomIndex] as EventType;
  const newEvent: GameEvent = generateEventHelper(player, data.players, chosenEvent);
  data.events.push(newEvent);
}

function checkGameOver(data: SimulatorData) {
  if (data.players.filter((player) => player.status != PlayerStatus.Dead).length <= 1) {
    data.isGameOver = true;
  }
}

function generateEventHelper(player: Player, players: Player[], event: EventType): GameEvent {
  const filteredPlayers: Player[] = players.filter((player) => player.status != PlayerStatus.Dead && !player.hasEvent);
  let newEvent: GameEvent;
  player.hasEvent = true;

  switch (event) {
    case EventType.Kill:
      const randomPlayer: Player = filteredPlayers[Math.floor(Math.random() * filteredPlayers.length)];
      randomPlayer.hasEvent = true;

      newEvent = {
        playersInEvent: [player, randomPlayer],
        text: player.nickname + " kills " + randomPlayer.nickname,
      };
      return newEvent;

    case EventType.Suicide:
      newEvent = {
        playersInEvent: [player],
        text: player.nickname + " commits a suicide",
      };
      return newEvent;

    default:
      newEvent = {
        playersInEvent: [player],
        text: player.nickname + " does nothing.",
      };
      return newEvent;
  }
}

export { simulatorInitialState, nextTurn };
