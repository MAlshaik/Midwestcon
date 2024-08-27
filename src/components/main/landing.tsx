// src/components/main/landing.tsx

'use client';

import { useState, useEffect } from "react";
import { getScenes } from "@/server/actions/scene";
import { AddSceneDialog } from "./addSceneDialog";
import Link from 'next/link';

interface Scene {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
}

export function Landing({ userName }: { userName: string | undefined }) {
  const [scenes, setScenes] = useState<Scene[]>([]);

  const fetchScenes = async () => {
    try {
      const fetchedScenes = await getScenes();
      setScenes(fetchedScenes);
    } catch (error) {
      console.error("Error fetching scenes:", error);
    }
  };

  useEffect(() => {
    fetchScenes();
  }, []);

  if (!userName) {
    return (
      <main className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Welcome to Scene Creator</h1>
        <p className="text-xl">Please log in to start creating scenes.</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center bg-gray-100 min-h-screen">
      <div className="w-full max-w-6xl px-4 py-8">
        <div className="mb-8">
          <AddSceneDialog onSceneAdded={fetchScenes} />
        </div>
        <h2 className="text-3xl font-bold mb-6">Your Scenes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenes.map((scene) => (
            <Link href={`/scene/${scene.id}`} key={scene.id}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform duration-200 ease-in-out hover:scale-105">
                <img src={scene.imageUrl} alt={scene.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{scene.title}</h3>
                  <p className="text-gray-600 mb-2 line-clamp-2">{scene.description}</p>
                  <p className="text-sm text-gray-500">Date: {new Date(scene.date).toLocaleDateString()}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
