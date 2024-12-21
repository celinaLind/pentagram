"use client";

import { useState } from "react";

// what exactly is the interface doing here?
// the interface is defining the props that the ImageGeneration component will receive
// why do they have to be defined in an interface?
// they have to be defined in an interface so that the typescript compiler can check that the props are being passed correctly
interface ImageGenerationProps {
  generateImage: (
    text: string
  ) => Promise<{ success: boolean; imageUrl?: string; error?: string }>;
}

export default function ImageGeneration({
  generateImage,
}: ImageGenerationProps) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await generateImage(inputText);

      // if there is a image url update setImageUrl state
      if (data!.imageUrl) {
        console.log("Image URL:", data.imageUrl);
        const img = new Image();
        img.onload = () => {
          setImageUrl(data.imageUrl!);
        };
        img.src = data.imageUrl;
      }
      setInputText("");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // DONE: Update the UI here to show the images generated

    <div className="min-h-screen flex flex-col justify-between p-8">
      <main className="flex-1">
        {/* If we have a imageURL show it here */}
        {imageUrl && (
          <div className="w-full max-w-2xl rounded-lg overflow-hidden shadow-lg">
            <img
              src={imageUrl}
              alt="Generated Artwork"
              className="w-full h-auto"
            />
          </div>
        )}
      </main>
      <footer className="w-full max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              className="flex-1 p-3 rounded-lg bg-black/[.05] dark:bg-white/[.06] border border-black/[.08] dark:border-white/[.145] focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              placeholder="Describe the image you want to generate..."
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 rounded-lg bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] transition-colors disabled:opacity-50"
            >
              {isLoading ? "Generating..." : "Generate"}
            </button>
          </div>
        </form>
      </footer>
    </div>
  );
}
