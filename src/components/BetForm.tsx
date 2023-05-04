'use client';

import { useAtom } from 'jotai';
import { HorseList } from '@/components';
import { abi, contractAddress, selectedHorseAtom } from '@/utils/store';
import {
  useAccount,
  useContractEvent,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';
import { useEffect } from 'react';
import { ethers } from 'ethers';

const BetForm = () => {
  const [selectedHorse] = useAtom(selectedHorseAtom);
  const { address, isConnecting, isDisconnected } = useAccount();
  const prixParticipation = 0.001; // 0.001 ETH

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: 'enter',
    args: [selectedHorse],
    overrides: {
      from: address,
      value: ethers.utils.parseEther(prixParticipation.toString()),
    },
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  // useEffect(() => {
  //   console.log(data, isLoading, isSuccess);
  // }, [data, isLoading, isSuccess]);

  useContractEvent({
    address: contractAddress,
    abi: abi,
    eventName: 'RequestSent',
    listener(node, label, owner) {
      console.log(node, label, owner);
    },
  });
  useContractEvent({
    address: contractAddress,
    abi: abi,
    eventName: 'RequestFulfilled',
    listener(node, label, owner) {
      console.log(node, label, owner);
    },
  });

  const handleClick = () => {
    write?.();
    alert('Bet placed!');
  };

  return (
    <div>
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
          onClick={handleClick}
        >
          Participation price : 0.001 ETH
        </button>
      </div>
    </div>
  );
};

export { BetForm };
