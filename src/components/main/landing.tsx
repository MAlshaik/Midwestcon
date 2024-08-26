"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { logout } from "@/server/actions/auth";

export function Landing({ userName }: { userName: string }) {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [type, setType] = useState<"text" | "image">("text");

  const handlePromptSubmit = async () => {
    if (!prompt && !file) return;

    try {
      let body;
      if (type === "text") {
        body = JSON.stringify({ prompt, type });
      } else if (type === "image" && file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("prompt", prompt);
        formData.append("type", type);
        body = formData;
      }

      const response = await fetch('/openai', {
        method: 'POST',
        headers: type === "text" ? { 'Content-Type': 'application/json' } : undefined,
        body,
      });

      const data = await response.json();
      setResult(data.result || data.imageUrl || "No result returned");
    } catch (error) {
      console.error("Error fetching data from OpenAI API:", error);
      setResult("An error occurred. Please try again.");
    }
  };

  return (
    <main className="flex flex-col justify-center items-center">
      <div className="w-screen max-w-[1024px] px-4 py-16">
        <div className="py-28 flex flex-col items-center justify-center">
          {!userName ? (
            <Button onClick={() => router.push('/auth/register')}>Login</Button>
          ) : (
            <>
              <h1 className="text-4xl font-bold">Welcome {userName}</h1>
              <div className="flex gap-2">
                <Button onClick={() => router.push('/dashboard')}>Dashboard</Button>
                <Button onClick={() => logout()}>Logout</Button>
              </div>

              <div className="mt-8 w-full max-w-md">
                <div className="flex gap-4 mb-4">
                  <Button onClick={() => setType("text")} className={type === "text" ? "bg-blue-500 text-white" : ""}>Text</Button>
                  <Button onClick={() => setType("image")} className={type === "image" ? "bg-blue-500 text-white" : ""}>Image</Button>
                </div>

                {type === "text" ? (
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Submit your crime evidence here..."
                  />
                ) : (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                    className="w-full p-2 border rounded"
                  />
                )}
                
                <Button onClick={handlePromptSubmit} className="mt-2 w-full">
                  Submit Evidence
                </Button>

                {result && (
                  <div className="mt-4 p-4 border rounded bg-gray-100">
                    {type === "text" ? (
                      <p className="whitespace-pre-wrap">{result}</p>
                    ) : (
                      <img src={result} alt="Generated Evidence" className="w-full h-auto" />
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}


// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "../ui/button";
// import { logout } from "@/server/actions/auth";

// export function Landing({ userName }: { userName: string }) {
//   const router = useRouter();
//   const [prompt, setPrompt] = useState("");
//   const [result, setResult] = useState<string | null>(null);

//   const handlePromptSubmit = async () => {
//     if (!prompt) return;

//     try {
//       const response = await fetch('/api/openai', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ prompt }),
//       });

//       const data = await response.json();
//       setResult(data.result || "No result returned");
//     } catch (error) {
//       console.error("Error fetching data from OpenAI API:", error);
//       setResult("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <main className="flex flex-col justify-center items-center">
//       <div className="w-screen max-w-[1024px] px-4 py-16">
//         <div className="py-28 flex flex-col items-center justify-center">
//           {!userName ? (
//             <Button onClick={() => router.push('/auth/register')}>Login</Button>
//           ) : (
//             <>
//               <h1 className="text-4xl font-bold">Welcome {userName}</h1>
//               <div className="flex gap-2">
//                 <Button onClick={() => router.push('/dashboard')}>Dashboard</Button>
//                 <Button onClick={() => logout()}>Logout</Button>
//               </div>

//               <div className="mt-8 w-full max-w-md">
//                 <textarea
//                   value={prompt}
//                   onChange={(e) => setPrompt(e.target.value)}
//                   className="w-full p-2 border rounded"
//                   placeholder="Submit your crime evidence here..."
//                 />
//                 <Button onClick={handlePromptSubmit} className="mt-2 w-full">
//                   Submit Evidence
//                 </Button>
//                 {result && (
//                   <div className="mt-4 p-4 border rounded bg-gray-100">
//                     <p className="whitespace-pre-wrap">{result}</p>
//                   </div>
//                 )}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </main>
//   );
// }

