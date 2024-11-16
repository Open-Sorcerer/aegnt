"use client";

import FlickeringGrid from "@/components/ui/flickering-grid";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { ChevronRight, MessagesSquare } from "lucide-react";

export default function Home() {
  const [value, setValue] = useState("");
  return (
    <>
      <FlickeringGrid />
      <div className="relative flex flex-col gap-6 p-10 items-center justify-center min-h-screen font-[family-name:var(--font-geist-sans)] z-10">
        <span className="flex items-center gap-4 text-2xl md:text-6xl font-medium text-neutral-700">
          <Image
            src="/aegnt.svg"
            alt="Aegnt"
            width={32}
            height={32}
            className="w-7 h-7 md:w-12 md:h-12"
          />
          GM Aegnt
        </span>
        <Textarea
          placeholder="Trade your strategies . . ."
          className="w-full max-w-2xl !h-24 !py-3 !bg-white !rounded-xl"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="flex flex-col gap-2 w-full max-w-2xl text-neutral-600 border border-indigo-200 bg-gradient-to-t from-transparent to-indigo-500/20 px-4 py-3 rounded-xl">
          <Badge className="!w-fit">New</Badge> Aegnt will generate a trading
          strategy based on your input.
        </div>
        <section className="flex flex-col gap-2 my-3 w-full max-w-2xl items-start">
          <span className="flex items-center gap-1 text-neutral-700 font-medium">
            Some recent chats <ChevronRight size={16} strokeWidth={2.5} />
          </span>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 w-full">
            {Array.from({ length: 6 }).map((_, index) => (
              <button
                key={index}
                className="flex flex-col gap-2 w-full h-24 p-3 bg-white/80 border border-neutral-100 rounded-xl"
              >
                <MessagesSquare size={16} className="text-neutral-400" />
                <p className="text-left line-clamp-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </button>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
