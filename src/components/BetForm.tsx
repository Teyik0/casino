'use client';

import React, { useState } from 'react';

import { HorseList } from '@/components';

function BetForm({ onSubmit, selectedHorse }: any) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);

  function handleBet(e: any) {
    e.preventDefault();
    onSubmit({ name, amount });
    setName('');
    setAmount(0);
  }

  return (
    <form onSubmit={handleBet}>
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
          disabled={!selectedHorse}
        >
          Participation price : 0.001 ETH
        </button>
      </div>
    </form>
  );
}

export { BetForm };
