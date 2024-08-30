'use client';

import { useState, useEffect } from "react";
import { getScenes } from "@/server/actions/scene";
import { AddSceneDialog } from "./addSceneDialog";
import Link from 'next/link';

interface Scene {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  date: string | null;
  userId: string;
  createdAt: Date | null;
}

export function Landing({ userName }: { userName: string | undefined }) {
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [selectedScene, setSelectedScene] = useState<Scene | null>(null);

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
      <main className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-4xl font-bold mb-4">Welcome to Scene Creator</h1>
        <p className="text-xl">Please log in to start creating scenes.</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center min-h-screen">
      <div className="w-full max-w-6xl px-4 py-8 flex flex-col items-center justify-center">
        <div className="mb-8">
          <img src="/templogo.jpg" alt="Temporary Logo" className="w-32 h-32 object-contain mb-4" />
        </div>
        <div className="mb-8">
          <AddSceneDialog onSceneAdded={fetchScenes} />
        </div>
        <h2 className="text-3xl font-bold mb-6">Your Scenes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenes.map((scene) => (
            <Link href={`/scene/${scene.id}`} key={scene.id}>
              <div className="border rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform duration-200 ease-in-out hover:scale-105">
                {scene.imageUrl && (
                  <img src={scene.imageUrl} alt={scene.title} className="w-full h-48 object-cover" />
                )}
                <div className="p-4 bg-[#2C3755]">
                  <h3 className="text-xl font-semibold mb-2">{scene.title}</h3>
                  {scene.description && (
                    <p className=" mb-2 line-clamp-2">{scene.description}</p>
                  )}
                  {scene.date && (
                    <p className="text-sm ">Date: {new Date(scene.date).toLocaleDateString()}</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
