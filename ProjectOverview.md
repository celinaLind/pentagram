## Description

For this project, you are tasked with building an Instagram clone, where instead of users uploading pictures themselves, they can generate images with text prompts. Instead of using existing image generation APIs, you will have to host an image generation model yourself on serverless GPUs and ensure low latency for a smooth user experience.

## TODO: [~10 hours so far]

1. Incorporate Subabase database:
   - user login (clerk)
   - save image url and prompt
2. set metadata and have alt text be prompt with "prompted by ${userName}"
3. allow user to add multiple images to the page
   - it is meant to be a feed collecting images
4. Deploy to vercel (connect github, blob database, and supabase [blob and supa are already in vercel we just need to connect them to a project])
5. Make walkthrough
6. Make Linkedin Post

## Maybe:

1. Change containers to not sit idle during night time
2. Add images for image+text to image generation

## Skills

- React
- TypeScript
- Modal
- APIs
- Authentication
- Hardware
- Infrastructure

## Getting Started:

- Learn how Modal works [here](https://modal.com/docs/guide), along with the other resources provided above
- Set up the backend API using Modal that generates images from a text prompt

## Project Requirements:

- Host an image generation model (e.g., Stable Diffusion) on serverless GPUs through Modal, ensuring low-latency performance for smooth user experience.
- Create a web app that allows users to generate images from text prompts, manage their creations, and interact socially through likes, comments, and sharing features.
- Incorporate intuitive UI/UX design, authentication, and efficient image management with prompt histories.

## Challenges:

- Ensuring the hosted image generation model operates within low-latency thresholds (<2 seconds) while handling multiple concurrent requests
- Managing the dynamic scaling of GPU resources to handle demand spikes without exceeding cost or causing performance bottlenecks.
- Add the ability to search for images semantically
- Prevent harmful or inappropriate content from being generated
- Build a recommendation system that creates personalized feeds for users, balancing new content discovery with user preferences

## Resources

- [Getting started with Modal](https://modal.com/docs/examples/hello_world)
- [Building an Image Generation Pipeline on Modal](https://www.youtube.com/watch?v=sHSKArbiKmU)
- [Run Stable Diffusion as a CLI, API, and Web UI](https://modal.com/docs/examples/text_to_image)
- [MidJourney Examples](https://www.midjourney.com/explore?tab=top)
- [NVIDIA GPU Example](https://www.digitalocean.com/community/tutorials/h100_vs_other_gpus_choosing_the_right_gpu_for_your_machine_learning_workload)
- [Modal Playground](https://modal.com/playground/get_started)
- [Modal Cold Start Guide](https://modal.com/docs/guide/cold-start)
- [Image Generation Models](https://huggingface.co/models?pipeline_tag=text-to-image)
- [StabilityAI Image Generation Model](https://huggingface.co/stabilityai/sdxl-turbo)
- [Modal Web Endpoints](https://modal.com/docs/guide/webhooks)
- [Cold Start Performace with Modal](https://modal.com/docs/guide/cold-start)
- [Relational Databases](https://www.seas.upenn.edu/~zives/03f/cis550/codd.pdf)
- [Stable Diffusion 3](https://arxiv.org/pdf/2403.03206)
- [Adversial Diffusion Distillation](https://arxiv.org/pdf/2311.17042)
- [OpenAI DALL-E 3](https://cdn.openai.com/papers/dall-e-3.pdf_
- [Squeezing Large-Scale Diffusion Models for Mobile](https://arxiv.org/pdf/2307.01193)
- [Server Actions and Mutations](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Making Network Requests - Javascript](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Network_requests)
- [SQL vs NoSQL vs Blob Database Types](https://medium.com/@rganesh0203/sql-vs-nosql-vs-blobs-storages-5d088790de45#:~:text=Summary,like%20media%20files%20and%20backups.)
- [Supabase with Vercel](https://supabase.com/partners/integrations/vercel)

## Developer Notes

#### AutoPipelineForText2Image vs StableDiffusionPipeline

### ERR_INVALID_URL

Received an invalid url error because I forgot to set the base url for the fetch() request. Base url is either the local development url or the deployed production url.

    Changed fetch("/api/generate-image")
    to fetch(${baseUrl}/api/generate-image\`)
