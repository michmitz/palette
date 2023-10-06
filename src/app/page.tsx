import React from 'react';
import { ColorSchemeContainer } from "./components/ColorSchemeContainer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4">
        <ColorSchemeContainer />
      </div>
    </main>
  );
}
