import React, { useState } from "react";
import Head from "next/head";

const NUM_HORSES = 5;
const RACE_LENGTH = 5;

type Horse = {
  id: number;
  name: string;
  position: number;
};

const generateHorses = (): Horse[] => {
  const horses: Horse[] = [];
  for (let i = 0; i < NUM_HORSES; i++) {
    horses.push({
      id: i,
      name: `Horse ${i + 1}`,
      position: 0,
    });
  }
  return horses;
};

const Race: React.FC = () => {
  const [horses, setHorses] = useState<Horse[]>(generateHorses());

  const moveHorses = () => {
    const updatedHorses = [...horses];
    updatedHorses.forEach((horse) => {
      const move = Math.floor(Math.random() * 3) + 1;
      horse.position += move;
    });
    setHorses(updatedHorses);
  };

  const resetRace = () => {
    setHorses(generateHorses());
  };

  return (
    <>
      <Head>
        <title>Horse Race</title>
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-8">Horse Race</h1>
        <div className="flex flex-col items-center">
          <div className="w-96 bg-white border border-gray-300 rounded-lg p-4 mb-8">
            {[...Array(RACE_LENGTH)].map((_, i) => (
              <div
                key={i}
                className="h-8 w-full flex items-center justify-center border-b border-gray-300"
              >
                {i + 1}
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center">
            {horses.map((horse) => (
              <div
                key={horse.id}
                className="flex items-center justify-between w-96 mb-2"
              >
                <div>{horse.name}</div>
                <div className="relative w-full h-8">
                  <div
                    className="absolute left-0 top-0 h-full bg-blue-500"
                    style={{ width: `${(horse.position / RACE_LENGTH) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <button
              onClick={moveHorses}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4"
            >
              Start Race
            </button>
            <button
              onClick={resetRace}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Reset Race
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Race;
