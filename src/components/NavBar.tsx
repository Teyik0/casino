'use client';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const NavBar = () => {
  return (
    <header className='bg-gray-900 text-white py-4'>
      <nav className='container mx-auto flex justify-between items-center'>
        <a href='/' className='text-2xl font-bold tracking-tight'>
          Virtual Horses
        </a>
        <ul className='flex space-x-4'>
          <li>
            <a href='/' className='hover:text-gray-300'>
              Home
            </a>
          </li>
          <li>
            <a href='/race' className='hover:text-gray-300'>
              Races
            </a>
          </li>
        </ul>
        <ConnectButton />
      </nav>
    </header>
  );
};

export default NavBar;
