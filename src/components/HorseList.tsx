import { useState } from 'react';


function HorseList({ horses }: any) {
    const [selectedHorse, setSelectedHorse] = useState(null);

    const selectHorse = (horse: any) => {
        setSelectedHorse(horse);
    };

    return (
        <div className="grid grid-cols-3 gap-4">
            {horses.map((horse: any) => (
                <button
                    key={horse.id}
                    className={`bg-gray-900 hover:bg-gray-200 rounded-lg p-4 ${selectedHorse?.id === horse.id ? 'bg-green-500 text-black' : ''
                        }`}
                    onClick={() => selectHorse(horse)}
                >
                    <div className="font-bold text-lg">{horse.name}</div>
                    <div className="text-gray-500">{horse.odds} to 1</div>
                </button>
            ))}
        </div>
    );
}

export { HorseList };
