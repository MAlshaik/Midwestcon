'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { logout } from "@/server/actions/auth";
import { getScenes } from "@/server/actions/scene";
import { AddSceneDialog } from "./addSceneDialog";
import ImageClassifier from "../ui/imageClassifier";

interface Scene {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
}

export function Landing({ userName }: { userName: string }) {
  const router = useRouter();
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

  return (
    <main className="flex flex-col justify-center items-center">
      <div className="w-screen max-w-[1024px] px-4 py-16">
        <div className="py-28 flex flex-col items-center justify-center">
          {!userName ? (
            <Button onClick={() => router.push('/auth/register')}>Login</Button>
          ) : (
            <>
              <h1 className="text-4xl font-bold">Welcome {userName}</h1>
              <div className="flex gap-2 mb-8">
                <Button onClick={() => router.push('/dashboard')}>Dashboard</Button>
                <Button onClick={() => logout()}>Logout</Button>
              </div>
              <ImageClassifier />
              <div className="w-full mb-8">
                <AddSceneDialog onSceneAdded={fetchScenes} />
              </div>

              <div className="w-full">
                <h2 className="text-2xl font-bold mb-4">Your Scenes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {scenes.map((scene) => (
                    <div key={scene.id} className="border rounded p-4">
                      <img src={scene.imageUrl} alt={scene.title} className="w-full h-48 object-cover mb-2" />
                      <h3 className="text-xl font-bold">{scene.title}</h3>
                      <p>{scene.description}</p>
                      <p className="text-sm text-gray-500 mt-2">Date: {new Date(scene.date).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
