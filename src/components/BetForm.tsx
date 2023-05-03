import React, { useState } from "react";

import { HorseList } from "./HorseList";

function BetForm({ horses, onSubmit, selectedHorse }: any) {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState(0);

    function handleBet(e: any) {
        e.preventDefault();
        onSubmit({ name, amount });
        setName("");
        setAmount(0);
    }

    return (
        <form onSubmit={handleBet}>
            <h2 className="text-xl font-bold mb-4 text-black">Place a Bet</h2>
            <div className="mb-4">
                <label htmlFor="horse" className="block font-bold mb-2 text-black">
                    Select a Horse
                </label>
                <HorseList horses={horses} />
            </div>
            <div className="mb-4">
                <label htmlFor="name" className="block font-bold mb-2 text-black">
                    Name
                </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="amount" className="block font-bold mb-2 text-black">
                    Bet Amount
                </label>
                <input
                    id="amount"
                    name="amount"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Enter your bet amount"
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                    required
                />
            </div>
            <div>
                <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50"
                    disabled={!selectedHorse}
                >
                    Place Bet
                </button>
            </div>
        </form>
    );
}


export { BetForm };