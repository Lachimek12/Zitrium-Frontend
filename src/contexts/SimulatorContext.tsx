/* Libraries */
import { createContext, FC, memo, PropsWithChildren, useCallback, useContext } from "react";
import { useSessionStorage } from "usehooks-ts";
import cloneDeep from "lodash/cloneDeep";

/* App modules imports */
import { checkGameOver, generateEvent, simulatorInitialState } from "@utils/simulator";

/* Types imports */
import { Player, PlayerStatus, SimulatorContextType, SimulatorData } from "@customTypes/simulator";
import { SIMULATION_DATA } from "@/services/SessionStorage";

const SimulatorContext = createContext<SimulatorContextType | undefined>(undefined);

const SimulatorProvider: FC<PropsWithChildren> = memo(({ children }) => {
  const [simulatorData, setSimulatorData] = useSessionStorage<SimulatorData>(SIMULATION_DATA, simulatorInitialState);

  const nextTurn = useCallback(() => {
    if (simulatorData.isGameOver) {
      return;
    }
    const nextSimulatorData = cloneDeep(simulatorData);

    nextSimulatorData.events = [];
    nextSimulatorData.players.forEach((player) => (player.hasEvent = false));

    nextSimulatorData.players.forEach((player) => {
      if (player.hasEvent || player.status == PlayerStatus.Dead) {
        return;
      }
      generateEvent(player, nextSimulatorData);
    });

    checkGameOver(nextSimulatorData);
    setSimulatorData(nextSimulatorData);
  }, [simulatorData]);

  const addNewPlayer = useCallback((player: Player) => {
    setSimulatorData((prevSimulatorData) => ({
      ...prevSimulatorData,
      players: [...prevSimulatorData.players, player],
    }));
  }, []);

  const deletePlayer = useCallback((indexToRemove: number) => {
    setSimulatorData((prevSimulatorData) => ({
      ...prevSimulatorData,
      players: prevSimulatorData.players.filter((_, index) => index !== indexToRemove),
    }));
  }, []);

  return (
    <SimulatorContext.Provider value={{ simulatorData, nextTurn, addNewPlayer, deletePlayer }}>
      {children}
    </SimulatorContext.Provider>
  );
});

function useSimulator() {
  const context = useContext(SimulatorContext);

  if (context === undefined) {
    throw new Error("useSimulator must be used within a SimulatorStateProvider");
  }

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { SimulatorProvider, useSimulator };
