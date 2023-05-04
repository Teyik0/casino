'use client';

import { useAtom } from 'jotai';
import { HorseList } from '@/components';
import { selectedHorseAtom } from '@/utils/store';

const BetForm = () => {
  const [selectedHorse] = useAtom(selectedHorseAtom);

  const handleClick = (e: any) => {
    e.preventDefault();
    alert('Bet placed!');
  };

  return (
    <form onSubmit={(e: any) => handleClick(e)}>
      <h2 className='text-xl font-bold mb-4 text-black'>Place a Bet</h2>
      <div className='mb-4'>
        <label htmlFor='horse' className='block font-bold mb-2 text-black'>
          Select a Horse
        </label>
        <HorseList />
      </div>
      <div>
        <button
          type='submit'
          className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50 cursor-pointer'
          disabled={selectedHorse === undefined}
        >
          Participation price : 0.001 ETH
        </button>
      </div>
    </form>
  );
};

export { BetForm };
