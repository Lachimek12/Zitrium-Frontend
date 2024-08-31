/* Libraries */
/* App modules imports */
import Tile from "@components/Tile";
import styles from "./test.module.css";
/* Types imports */

function Test() {
  return (
    <div className="min-h-full flex-col">
      <div className={`${styles.backgroundImage} flex min-h-full bg-cover`}>
        <div className="flex flex-1 items-start justify-center bg-background2-900 bg-opacity-90">
          <div className="mt-6 grid grid-cols-6 gap-x-6 gap-y-16">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="flex h-[240px] w-[200px] rounded-lg bg-primary2-800">
                <Tile />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Test;
