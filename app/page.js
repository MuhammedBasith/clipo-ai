'use client'

import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div>
        Hello World!
      </div>
      <div>
        <Button variant="destructive" onClick={() => {alert("Hey there!")}}>Click Me!</Button>
      </div>
      <UserButton />

    </>
  );
}
