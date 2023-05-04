'use client';

import { useAtom } from 'jotai';
import { selectedHorseAtom } from '@/utils/store';

function HorseList() {
  const [selectedHorse, setSelectedHorse] = useAtom(selectedHorseAtom);

  const horses = [
    { id: 0, name: 'Horse 0' },
    { id: 1, name: 'Horse 1' },
    { id: 2, name: 'Horse 2' },
    { id: 3, name: 'Horse 3' },
  ];

  const selectHorse = (e: any, id: number) => {
    e.preventDefault();
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
          onClick={(e: any) => selectHorse(e, horse.id)}
        >
          <div className='font-bold text-lg'>{horse.name}</div>
        </button>
      ))}
    </div>
  );
}

export { HorseList };
