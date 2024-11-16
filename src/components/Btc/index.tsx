"use client";

import FlickeringGrid from "@/components/ui/flickering-grid";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { bitcoinPODABI } from "@/lib/constant";

export default function Home() {
  const [value, setValue] = useState("");
  const [balance, setBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const podAddress = "0xC9e2e77cc73C5De29fFB4d952121695C86d24362";

  useEffect(() => {
    const fetchBalance = async () => {
      setLoading(true);
      setError(null);

      try {
        // Set up Ethereum provider (Metamask or other provider)
        const provider = new ethers.JsonRpcProvider(
          "https://ethereum-holesky.publicnode.com"
        );

        // Initialize the contract with the ABI and address
        const contract = new ethers.Contract(
          podAddress,
          bitcoinPODABI,
          provider
        );

        // Call the contract function to get the Bitcoin balance
        const result = await contract.getBitcoinBalance();
        console.log(result);

        // Format and set the balance (assuming result is in satoshis)
        const formattedBalance = ethers.formatUnits(result, 0);
        setBalance(formattedBalance);

        // Redirect to the Blockscout explorer with the pod address
        //  `https://eth-holesky.blockscout.com/address/${podAddress}`;
      } catch (err) {
        setError("Error fetching Bitcoin balance");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, []);

  return (
    <>
      <FlickeringGrid />

      <div className="relative flex flex-col gap-6 items-center justify-center min-h-screen font-[family-name:var(--font-geist-sans)] z-10">
        <button onClick={() => setValue(value)}>Fetch Bitcoin Balance</button>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {balance && <p>Bitcoin Balance: {balance}</p>}

        <h1 className="text-6xl font-medium text-neutral-700">Aegnt</h1>
        <Input
          placeholder="Trade your strategies . . ."
          className="w-full max-w-lg h-12 !bg-white"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          isPill
        />
      </div>
    </>
  );
}
