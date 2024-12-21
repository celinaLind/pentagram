import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text } = body;
    // DONE: Call your Image Generation API here

    // verify api secret
    const apiSecret = request.headers.get("X-API-KEY");

    // if api secret is not correct don't proceed
    if (apiSecret !== process.env.API_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL("https://celinalind--sd-demo-model-generate.modal.run");

    url.searchParams.set("prompt", text);
    console.log("URL", url.toString());

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "X-API-KEY": process.env.API_KEY || "",
        Accept: "image/jpeg",
      },
    });

    // verify response status
    if (!response.ok) {
      const errorText = await response.text();
      console.error("API RESPONSE ERROR", errorText);
      throw new Error(
        "HTTP error! status: " + response.status + " message: " + errorText
      );
    }
    console.log("API RESPONSE", response);
    // verify response received is an image
    const contentType = response.headers.get("Content-Type");
    // console.log("Content-Type", contentType);
    if (!contentType || !contentType.includes("image/jpeg")) {
      throw new Error("API did not return an image)");
    }
    // Read data from the API
    const imageBuffer = await response.arrayBuffer();

    //  use the crypto library to create unique token for the name of each generated image
    const fileName = `${crypto.randomUUID()}.jpg`;
    // store filepath you get into database
    const blob = await put(fileName, imageBuffer, {
      access: "public",
      contentType: "image/jpeg",
    });

    // console.log("Blob", blob);
    // add the image URL and prompt to the database
    //  use vercel supabase to store the image URL and prompt

    // return the image URL
    return NextResponse.json({
      success: true,
      message: `Received: ${text}`,
      imageUrl: blob.url,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to process request" },
      { status: 500 }
    );
  }
}
