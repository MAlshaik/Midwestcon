"use client";

import { useState, FormEvent } from "react";

export default function ImageClassifier() {
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [response, setResponse] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [inputKey, setInputKey] = useState(new Date().toString());

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    const formData = new FormData();
    formData.append("file", file as File);

    fetch("/api/classify", {
      method: "POST",
      body: formData,
    }).then((res) => {
      const reader = res.body?.getReader();
      const decoder = new TextDecoder("utf-8");
      let content = "";

      function processText({ done, value }: ReadableStreamReadResult<Uint8Array>): Promise<void> | void {
        if (done) {
          setResponse(cleanResponse(content));
          return;
        }
        content += decoder.decode(value, { stream: true });
        return reader?.read().then(processText);
      }

      return reader?.read().then(processText);
    });
  };

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

  const onReset = () => {
    setFile(null);
    setImage(null);
    setResponse("");
    setSubmitted(false);
    setInputKey(new Date().toString());
  };

  return (
    <div className="max-w-4xl">
      {image && (
        <img
          src={image}
          alt="An image to classify"
          className="mb-8 max-w-xs max-h-60 object-contain"
        />
      )}
      <form onSubmit={onSubmit}>
        <input
          key={inputKey}
          type="file"
          accept="image/jpeg"
          onChange={(e) => {
            const files = e.target.files;
            if (files?.length) {
              setFile(files[0]);
              setImage(URL.createObjectURL(files[0]));
            } else {
              setFile(null);
              setImage(null);
            }
          }}
        />
        <p className="py-8 text-slate-800">
          {submitted && !response ? "AI examination of crime scene evidence loading..." : response}
        </p>
        <div className="flex flex-row">
          <button
            className={`${
              submitted || !file ? "opacity-50" : "hover:bg-gray-100"
            } bg-white mr-4 text-slate-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow`}
            type="submit"
            disabled={submitted || !file}
          >
            Describe
          </button>
          <button
            className="bg-white hover:bg-red-100 text-red-800 font-semibold py-2 px-4 border border-red-400 rounded shadow"
            type="button"
            onClick={onReset}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
