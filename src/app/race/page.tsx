'use client';
import React, { useState } from "react";
import Head from "next/head";

import { BetForm } from "../../components/BetForm";

const horses = [
  { id: 1, name: 'Horse 1', odds: 5 },
  { id: 2, name: 'Horse 2', odds: 10 },
  { id: 3, name: 'Horse 3', odds: 15 },
  { id: 4, name: 'Horse 4', odds: 20 },
];

function App() {
  const [selectedHorse, setSelectedHorse] = useState(null);


  function handleBet(e:any) {
    e.preventDefault();
  
    if (selectedHorse) {
      const formData = new FormData(e.target);
      const betAmount = Number(formData.get('betAmount'));
      const userName = formData.get('userName');
  
      const payout = selectedHorse.odds * betAmount;
      const newBets = selectedHorse.bets + betAmount;
      const newFunds = funds - betAmount;
  
      const updatedHorses = horses.map((horse) => {
        if (horse.id === selectedHorse.id) {
          return {
            ...horse,
            bets: newBets,
            odds: calculateOdds(horse, horses),
          };
        }
        return horse;
      });
  
      setHorses(updatedHorses);
      setFunds(newFunds);
  
      alert(`Congratulations ${userName}, you won ${payout}!`);
      setSelectedHorse(null);
    }
  }
  

  function selectHorse(horse: any) {
    setSelectedHorse(horse);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8 text-black">Horse Racing Game</h1>
      <BetForm horses={horses} selectedHorse={selectedHorse} />
    </div>
  );
}

export default App;