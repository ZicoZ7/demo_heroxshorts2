// src/lib/gif-library.ts
import { getAssetPath } from '@/lib/utils/basePath';

export interface GifEffect {
  id: number;
  name: string;
  preview: string;
  isNew?: boolean;
  isPro?: boolean;
}

export const gifEffects: GifEffect[] = [
  {
    id: 1,
    name: "GIF1",
    preview: getAssetPath("/fonts/gifs/1.gif"), // Replace with your actual GIF path
  },
  {
    id: 2,
    name: "GIF2",
    preview: getAssetPath("/fonts/gifs/2.gif"),
    isNew: true,
  },
  {
    id: 3,
    name: "GIF3",
    preview: getAssetPath("/fonts/gifs/3.gif"),
  },
  {
    id: 4,
    name: "GIF4",
    preview: getAssetPath("/fonts/gifs/4.gif"),
    isPro: true,
  },
  {
    id: 5,
    name: "GIF5",
    preview: getAssetPath("/fonts/gifs/5.gif"),
  },
  {
    id: 6,
    name: "GIF6",
    preview: getAssetPath("/fonts/gifs/6.gif"),
    isNew: true,
  },
  {
    id: 7,
    name: "GIF7",
    preview: getAssetPath("/fonts/gifs/7.gif"),
  },
  {
    id: 8,
    name: "GIF8",
    preview: getAssetPath("/fonts/gifs/8.gif"),
  },
  {
    id: 9,
    name: "GIF9",
    preview: getAssetPath("/fonts/gifs/9.gif"),
  },
  {
    id: 10,
    name: "GIF10",
    preview: getAssetPath("/fonts/gifs/10.gif"),
  },
  {
    id: 11,
    name: "GIF11",
    preview: getAssetPath("/fonts/gifs/11.gif"),
  },
  {
    id: 12,
    name: "GIF12",
    preview: getAssetPath("/fonts/gifs/12.gif"),
  },
  {
    id: 13,
    name: "GIF13",
    preview: getAssetPath("/fonts/gifs/13.gif"),
  },
  {
    id: 14,
    name: "GIF14",
    preview: getAssetPath("/fonts/gifs/14.gif"),
  },
  {
    id: 15,
    name: "GIF15",
    preview: getAssetPath("/fonts/gifs/15.gif"),
  },
  // Add more effects as needed
];