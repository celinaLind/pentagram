"use server";
// we made the root page a server route
// and made the client route a separate component

import { generateImage } from "./actions/generate-image";
import ImageGeneration from "./components/ImageGeneration";

export default async function Home() {
  return <ImageGeneration generateImage={generateImage} />;
}
