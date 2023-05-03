'use client';

import { useState } from 'react';

function HorseList() {
  const [selectedHorse, setSelectedHorse] = useState(0);

  const horses = [
    { id: 1, name: 'Horse 1', odds: 5 },
    { id: 2, name: 'Horse 2', odds: 10 },
    { id: 3, name: 'Horse 3', odds: 15 },
    { id: 4, name: 'Horse 4', odds: 20 },
  ];

  const selectHorse = (id: number) => {
    setSelectedHorse(id);
  };

  return (
    <div className='grid grid-cols-3 gap-4'>
      {horses.map((horse: any) => (
        <button
          key={horse.id}
          className={`bg-gray-900 hover:bg-gray-200 rounded-lg p-4 ${
            selectedHorse === horse.id ? 'bg-green-500 text-black' : ''
          }`}
          onClick={() => selectHorse(horse.id)}
        >
          <div className='font-bold text-lg'>{horse.name}</div>
          <div className='text-gray-500'>{horse.odds} to 1</div>
        </button>
      ))}
    </div>
  );
}

export { HorseList };
