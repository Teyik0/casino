'use client';
import { BetForm } from '@/components';
import { useGlobalContext } from '@/utils/store';

function App() {
  const { contract } = useGlobalContext();
  console.log(contract);
  return (
    <div className='max-w-3xl mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold mb-8 text-black'>Horse Racing Game</h1>
      <BetForm />
    </div>
  );
}

export default App;
