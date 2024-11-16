import { Suspense } from "react";
import Chat from "@/components/Chat";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Chat />
    </Suspense>
  );
}
