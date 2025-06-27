// src/lib/caption-styles.ts
import { CSSProperties } from 'react';

export const availableFonts = [
  'Inter',
  'Roboto Condensed',
  'Anton',
  'Montserrat',
  'Poppins',
  'Bebas Neue',
  'Rubik',
  'Open Sans',
  'Roboto',
  'SF Pro Display',
  'Impact',
  'Press Start 2P',
  'Arial'
] as const;

export type AvailableFont = typeof availableFonts[number];

export interface CaptionStyle {
  id: number;
  name: string;
  preview: string;
  textColor: string;
  backgroundColor?: string;
  fontSize: string;
  fontFamily: AvailableFont;
  position: 'top' | 'middle' | 'bottom';
  isNew?: boolean;
  isPro?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const captionStyles: CaptionStyle[] = [
  // Your existing 12 styles
  {
    id: 1,
    name: "Classic",
    preview: "Clean and clear captions",
    textColor: "#FFFFFF",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    fontSize: "24px",
    fontFamily: "Inter",
    position: "bottom",
    className: "text-white",
    style: { textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }
  },
  {
    id: 2,
    name: "Minimal",
    preview: "Simple text overlay",
    textColor: "#FFFFFF",
    fontSize: "28px",
    fontFamily: "Montserrat",
    position: "bottom",
    className: "text-white",
    style: { textShadow: '2px 2px 4px rgba(0,0,0,0.8)' },
    isNew: true,
  },
  {
    id: 3,
    name: "Bold Impact",
    preview: "Stand out captions",
    textColor: "#FFFFFF",
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    fontSize: "32px",
    fontFamily: "Anton",
    position: "bottom",
    className: "text-white font-bold",
    style: { textShadow: '2px 2px 4px rgba(0,0,0,0.8)' },
    isPro: true,
  },
  {
    id: 4,
    name: "Neon Style",
    preview: "Eye-catching text",
    textColor: "#00FF99",
    fontSize: "26px",
    fontFamily: "Poppins",
    position: "middle",
    className: "text-white",
    style: { 
      textShadow: `-1px -1px 0 #000,
                  1px -1px 0 #000,
                  -1px 1px 0 #000,
                  1px 1px 0 #000`
    },
    isNew: true,
    isPro: true,
  },
  {
    id: 5,
    name: "Subtitle Pro",
    preview: "Professional subtitles",
    textColor: "#FFFFFF",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    fontSize: "20px",
    fontFamily: "Roboto",
    position: "bottom",
    className: "text-white",
    style: { textShadow: '2px 2px 4px rgba(0,0,0,0.8)' },
  },
  {
    id: 6,
    name: "Gaming Style",
    preview: "Perfect for gameplay",
    textColor: "#FF3366",
    fontSize: "30px",
    fontFamily: "Rubik",
    position: "top",
    className: "text-white",
    style: { textShadow: '2px 2px 4px rgba(0,0,0,0.8)' },
    isPro: true,
  },
  {
    id: 7,
    name: "Karaoke",
    preview: "Perfect for music content",
    textColor: "#FFFFFF",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    fontSize: "28px",
    fontFamily: "Roboto Condensed",
    position: "bottom",
    className: "text-white",
    style: { textShadow: '2px 2px 4px rgba(0,0,0,0.8)' },
    isNew: true,
  },
  {
    id: 8,
    name: "Beasty",
    preview: "Bold and energetic",
    textColor: "#FF0000",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    fontSize: "32px",
    fontFamily: "Anton",
    position: "top",
    className: "text-white font-bold",
    style: { textShadow: '2px 2px 4px rgba(0,0,0,0.8)' },
    isPro: true,
  },
  {
    id: 9,
    name: "Deep Diver",
    preview: "Clean and professional",
    textColor: "#FFFFFF",
    fontSize: "26px",
    fontFamily: "Open Sans",
    position: "bottom",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    className: "text-white",
    style: { textShadow: '2px 2px 4px rgba(0,0,0,0.8)' },
  },
  {
    id: 10,
    name: "Youshaei",
    preview: "Modern and minimal",
    textColor: "#FFFFFF",
    fontSize: "24px",
    fontFamily: "Poppins",
    position: "bottom",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    className: "text-white",
    style: { textShadow: '2px 2px 4px rgba(0,0,0,0.8)' },
  },
  {
    id: 11,
    name: "Pod P",
    preview: "Podcast style captions",
    textColor: "#FFFFFF",
    fontSize: "28px",
    fontFamily: "Inter",
    position: "bottom",
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    className: "text-white",
    style: { textShadow: '2px 2px 4px rgba(0,0,0,0.8)' },
    isPro: true,
  },
  {
    id: 12,
    name: "Mozi",
    preview: "Creative and fun",
    textColor: "#FFD700",
    fontSize: "30px",
    fontFamily: "Bebas Neue",
    position: "middle",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    className: "text-white",
    style: { 
      textShadow: `-1px -1px 0 #000,
                  1px -1px 0 #000,
                  -1px 1px 0 #000,
                  1px 1px 0 #000`
    },
    isNew: true,
  },
  // Adding the 6 new styles with IDs starting from 13
  {
    id: 13,
    name: "Classic Alt",
    preview: "Modern classic overlay",
    textColor: "#E8E8E8",
    backgroundColor: "rgba(33, 33, 33, 0.85)",
    fontSize: "26px",
    fontFamily: "Inter",
    position: "middle",
    className: "text-white",
    style: { textShadow: '2px 2px 4px rgba(0,0,0,0.8)' },
    isNew: true,
  },
  {
    id: 14,
    name: "Minimal Plus",
    preview: "Simple text overlay",
    textColor: "#FFFFFF",
    fontSize: "28px",
    fontFamily: "SF Pro Display",
    position: "bottom",
    className: "text-white",
    style: { textShadow: '2px 2px 4px rgba(0,0,0,0.8)' },
    isNew: true,
  },
  {
    id: 15,
    name: "Bold Impact Plus",
    preview: "Stand out captions",
    textColor: "#FFFFFF",
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    fontSize: "32px",
    fontFamily: "Impact",
    position: "bottom",
    className: "text-white font-bold",
    style: { textShadow: '2px 2px 4px rgba(0,0,0,0.8)' },
    isPro: true,
  },
  {
    id: 16,
    name: "Neon Pro",
    preview: "Vibrant neon effect",
    textColor: "#FF00FF", // Hot pink
    fontSize: "28px",
    fontFamily: "Montserrat",
    position: "top",
    className: "text-white",
    style: { 
      textShadow: `-1px -1px 0 #000,
                  1px -1px 0 #000,
                  -1px 1px 0 #000,
                  1px 1px 0 #000`
    },
    isNew: true,
    isPro: true,
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Light background for contrast
  },
  {
    id: 17,
    name: "Subtitle Elite",
    preview: "Professional subtitles",
    textColor: "#FFFFFF",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    fontSize: "20px",
    fontFamily: "Arial",
    position: "bottom",
    className: "text-white",
    style: { textShadow: '2px 2px 4px rgba(0,0,0,0.8)' },
  },
  {
    id: 18,
    name: "Gaming Pro",
    preview: "Perfect for gameplay",
    textColor: "#FF3366",
    fontSize: "30px",
    fontFamily: "Press Start 2P",
    position: "top",
    className: "text-white",
    style: { textShadow: '2px 2px 4px rgba(0,0,0,0.8)' },
    isPro: true,
  }
];