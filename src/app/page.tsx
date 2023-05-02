import Image from 'next/image';
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 text-gray-900">Welcome to Virtual Horses!</h1>
      <p className="text-lg mb-4 text-gray-700">Experience the thrill of horse racing with our blockchain-powered virtual horse game.</p>
      <p className="text-lg mb-8 text-gray-700">Something about horses and getting coins if you win.</p>
      <Link href="/race">
        <button className="bg-purple-500 text-white font-bold py-2 px-4 rounded hover:bg-purple-700">Get Started</button>
      </Link>
    </div>
  );
}
