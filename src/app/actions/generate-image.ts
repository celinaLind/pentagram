"use server";

export async function generateImage(text: string) {
  // this function is only for fetching the image from the API
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  try {
    const response = await fetch(`${baseUrl}/api/generate-image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // can add api key here since it is working on the server
        "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY || "",
      },
      body: JSON.stringify({ text: text }),
    });

    if (!response.ok) {
      throw new Error("HTTP error! status: " + response.status);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Server Error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to generate image",
    };
  }
}
