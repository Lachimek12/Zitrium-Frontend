/* Libraries */
/* App modules imports */
import Tile from "@components/Tile";
import TileAdder from "@components/TileAdder";
import styles from "./test.module.css";
import { useSimulator } from "@contexts/SimulatorContext";

/* Types imports */
import { SimulatorContextType } from "@customTypes/simulator";

function Test() {
  const simulatorContext: SimulatorContextType = useSimulator();

  const handleNameChange = (index: number) => (event: React.FocusEvent<HTMLInputElement>) => {
    simulatorContext.updatePlayerNickname(index, event.target.value);
  };

  return (
    <div className="min-h-full flex-col">
      <div className={`${styles.backgroundImage} flex min-h-full bg-cover`}>
        <div className="flex flex-1 items-start justify-center bg-background2-900 bg-opacity-90">
          <div className="mt-6 grid grid-cols-6 gap-x-6 gap-y-16">
            {Array.from({ length: simulatorContext.simulatorData.players.length }).map((_, index) => (
              <div key={index}>
                <div className="flex h-[240px] w-[200px] rounded-lg bg-primary2-800">
                  <Tile playerIndex={index} />
                </div>
                <div className="flex h-[40px] w-[200px] p-2">
                  <input
                    type="text"
                    value={simulatorContext.simulatorData.players[index].nickname}
                    maxLength={30}
                    className="w-full text-sm"
                    placeholder="Enter name"
                    onChange={handleNameChange(index)}
                  />
                </div>
              </div>
            ))}
            <div className="flex h-[240px] w-[200px] rounded-lg bg-primary2-800">
              <TileAdder />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Test;
