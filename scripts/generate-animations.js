/**
 * Script to generate animations for all house images
 * Run: node scripts/generate-animations.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load environment variables
const envPath = path.join(__dirname, '..', '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const REPLICATE_API_TOKEN = envContent.match(/VITE_REPLICATE_API_TOKEN=(.+)/)?.[1]?.trim();

if (!REPLICATE_API_TOKEN) {
  console.error('REPLICATE_API_TOKEN not found in .env');
  process.exit(1);
}

const API_BASE = 'https://api.replicate.com';

// Cloudinary URLs for house images
const houseImages = [
  { name: 'house1', url: 'https://res.cloudinary.com/dmuvp39ed/image/upload/v1769691541/house1_qys0gs.jpg' },
  { name: 'house2', url: 'https://res.cloudinary.com/dmuvp39ed/image/upload/v1769691541/house2_lsg8yf.jpg' },
  { name: 'house3', url: 'https://res.cloudinary.com/dmuvp39ed/image/upload/v1769691541/house3_btut5t.jpg' },
  { name: 'house4', url: 'https://res.cloudinary.com/dmuvp39ed/image/upload/v1769691540/house4_tigzup.jpg' },
  { name: 'house5', url: 'https://res.cloudinary.com/dmuvp39ed/image/upload/v1769691541/house5_ow5onz.jpg' },
];

const prompt = 'cinematic establishing shot, locked off tripod camera, gentle wind rustling tree leaves and ornamental grasses, soft clouds slowly drifting across blue sky, sunlight casting warm golden highlights, birds flying in distant background, professional real estate video, 4K quality, photorealistic';
const negativePrompt = 'morphing, warping, distortion, blur, noise, artifacts, camera shake, camera movement, pan, zoom, tilt, dark, underexposed, overexposed, desaturated, cartoon, anime, painting, illustration, cgi';

async function createPrediction(imageUrl) {
  const response = await fetch(`${API_BASE}/v1/models/wan-video/wan-2.5-i2v-fast/predictions`, {
    method: 'POST',
    headers: {
      'Authorization': `Token ${REPLICATE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      input: {
        image: imageUrl,
        prompt,
        negative_prompt: negativePrompt,
        duration: 5,
        resolution: '720p',
        enable_prompt_expansion: false,
      }
    })
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${await response.text()}`);
  }

  return response.json();
}

async function pollPrediction(predictionId) {
  const maxAttempts = 300; // ~10 minutes

  for (let i = 0; i < maxAttempts; i++) {
    const response = await fetch(`${API_BASE}/v1/predictions/${predictionId}`, {
      headers: { 'Authorization': `Token ${REPLICATE_API_TOKEN}` }
    });

    const prediction = await response.json();

    if (prediction.status === 'succeeded') {
      return prediction.output;
    }

    if (prediction.status === 'failed') {
      throw new Error(`Prediction failed: ${prediction.error}`);
    }

    process.stdout.write(`\r  Status: ${prediction.status} (${i * 2}s)`);
    await new Promise(r => setTimeout(r, 2000));
  }

  throw new Error('Timeout');
}

async function downloadVideo(url, outputPath) {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  fs.writeFileSync(outputPath, Buffer.from(buffer));
}

async function main() {
  const videosDir = path.join(__dirname, '..', 'public', 'videos');

  // Create videos directory if not exists
  if (!fs.existsSync(videosDir)) {
    fs.mkdirSync(videosDir, { recursive: true });
  }

  console.log('Starting animation generation for all house images...\n');
  console.log(`Prompt: "${prompt.substring(0, 50)}..."\n`);

  const results = {};

  for (const image of houseImages) {
    console.log(`\n[${image.name}] Starting generation...`);

    try {
      // Start prediction
      const prediction = await createPrediction(image.url);
      console.log(`  Prediction ID: ${prediction.id}`);

      // Poll for result
      const videoUrl = await pollPrediction(prediction.id);
      console.log(`\n  Video URL: ${videoUrl}`);

      // Download video
      const videoPath = path.join(videosDir, `${image.name}.mp4`);
      console.log(`  Downloading to ${videoPath}...`);
      await downloadVideo(videoUrl, videoPath);

      results[image.name] = `/videos/${image.name}.mp4`;
      console.log(`  Done!`);

    } catch (error) {
      console.error(`\n  Error: ${error.message}`);
      results[image.name] = null;
    }
  }

  // Save results
  const resultsPath = path.join(videosDir, 'animations.json');
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));

  console.log('\n\n========== RESULTS ==========');
  console.log(JSON.stringify(results, null, 2));
  console.log(`\nResults saved to: ${resultsPath}`);
}

main().catch(console.error);
