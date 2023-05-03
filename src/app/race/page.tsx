'use client';
import React, { useState } from 'react';
import Head from 'next/head';

import { BetForm } from '../../components/BetForm';

function App() {
  const [selectedHorse, setSelectedHorse] = useState(null);

  function selectHorse(horse: any) {
    setSelectedHorse(horse);
  }

  return (
    <div className='max-w-3xl mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold mb-8 text-black'>Horse Racing Game</h1>
      <BetForm selectedHorse={selectedHorse} />
    </div>
  );
}

export default App;
