/* Libraries */
/* App modules imports */
import PlusIcon from "./icons/PlusIcon";
import { useSimulator } from "@contexts/SimulatorContext";

/* Types imports */
import { Player, PlayerStatus, SimulatorContextType } from "@customTypes/simulator";

function Tile() {
  const simulatorContext: SimulatorContextType = useSimulator();

  const addPlayer = () => {
    const player: Player = {
      nickname: "bob",
      avatar: "https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg",
      status: PlayerStatus.Alive,
      hasEvent: false,
    };
    simulatorContext.addNewPlayer(player);
  };

  return (
    <div className="group relative flex flex-1 flex-col rounded-lg hover:cursor-pointer hover:ring-2 hover:ring-border-600">
      <div className="flex-1" onClick={addPlayer} />
      <div className="pointer-events-none absolute flex h-[100%] w-[100%] flex-col items-center justify-center p-6 opacity-50 group-hover:opacity-80">
        <div className="flex h-[30%] w-[30%] scale-150 items-center justify-center">
          <PlusIcon />
        </div>
        <p className="text-sm">Add new player</p>
      </div>
    </div>
  );
}

export default Tile;
