import React from 'react';
import { ColorSchemeContainer } from "./components/ColorSchemeContainer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-red-200 p-20">
      <div className="bg-orange-50 rounded-2xl p-12 shadow-2xl">
        <ColorSchemeContainer />
      </div>
    </main>
  );
}
