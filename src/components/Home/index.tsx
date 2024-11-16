"use client";

import FlickeringGrid from "@/components/ui/flickering-grid";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { bitcoinPODABI } from "@/lib/constant";

export default function Home() {
  const [value, setValue] = useState("");

  return (
    <>
      <FlickeringGrid />

      <div className="relative flex flex-col gap-6 items-center justify-center min-h-screen font-[family-name:var(--font-geist-sans)] z-10">
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
