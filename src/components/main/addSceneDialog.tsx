import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createScene } from "@/server/actions/scene";
import ImageClassifier from "@/components/ui/imageClassifier"

export function AddSceneDialog({ onSceneAdded }: { onSceneAdded: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);

  const handleSceneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !file || !date) return;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('date', date);
    formData.append('file', file);

    try {
      await createScene(formData);
      setTitle("");
      setDescription("");
      setDate("");
      setFile(null);
      setOpen(false);
      onSceneAdded();
    } catch (error) {
      console.error("Error creating scene:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add New Scene</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Scene</DialogTitle>
          <DialogDescription>
            Create a new scene by filling out the details below.
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
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          /> 
          <ImageClassifier /> 
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            required
          />
          <Button type="submit">Create Scene</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
