import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createScene } from "@/server/actions/scene";

export function AddSceneDialog({ onSceneAdded }: { onSceneAdded: () => void }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [classifying, setClassifying] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const cleanResponse = (rawResponse: string) => {
    return rawResponse
      .replace(/^\d+:\s*/gm, "")
      .replace(/\\n/g, "\n")
      .replace(/"/g, "")
      .replace(/(\w)-\s+(\w)/g, "$1$2")
      .replace(/([a-zA-Z])([A-Z])/g, "$1 $2")
      .replace(/(\w)([A-Z][a-z])/g, "$1 $2")
      .replace(/\s+([.,!?;:])/g, "$1")
      .replace(/\s\s+/g, " ")
      .trim();
  };

  const classifyImage = async () => {
    if (!file) return;
    setClassifying(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("/api/classify", {
        method: "POST",
        body: formData,
      });
      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");
      let content = "";
      
      function processText({ done, value }: ReadableStreamReadResult<Uint8Array>): Promise<void> | void {
        if (done) {
          setDescription(cleanResponse(content));
          setClassifying(false);
          return;
        }
        content += decoder.decode(value, { stream: true });
        return reader?.read().then(processText);
      }
      
      await reader?.read().then(processText);
    } catch (error) {
      console.error("Error classifying image:", error);
      setClassifying(false);
    }
  };

  const handleSceneSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !file || !date || !description) return;
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('date', date);
    formData.append('file', file);
    
    try {
      const newScene = await createScene(formData);
      setTitle("");
      setDate("");
      setFile(null);
      setImage(null);
      setDescription("");
      setOpen(false);
      onSceneAdded();
      
      // Navigate to the new scene page
      router.push(`/scene/${newScene.id}`);
    } catch (error) {
      console.error("Error creating scene:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='text-2xl p-8 rounded-lg'>Add New Scene</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Scene</DialogTitle>
          <DialogDescription>
            Upload an image and fill out the details to create a new scene.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSceneSubmit} className="grid gap-4 py-4">
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const files = e.target.files;
              if (files?.length) {
                setFile(files[0]);
                setImage(URL.createObjectURL(files[0]));
                setDescription(""); // Reset description when new image is uploaded
              } else {
                setFile(null);
                setImage(null);
                setDescription("");
              }
            }}
            required
          />
          {image && (
            <img
              src={image}
              alt="Uploaded scene"
              className="mb-4 max-w-full h-auto"
            />
          )}
          {file && !description && (
            <Button type="button" onClick={classifyImage} disabled={classifying}>
              {classifying ? "Classifying..." : "Classify Image"}
            </Button>
          )}
          {description && (
            <div>
              <h3 className="font-semibold mb-2">Image Description:</h3>
              <p>{description}</p>
            </div>
          )}
          <Button type="submit" disabled={!title || !file || !date || !description}>
            Create Scene
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
