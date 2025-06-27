// DeepSeek Types
export interface Scene {
  startTime: number;
  endTime: number;
  importance: number;
  content: string;
  style: string;
  mood: string;
  action: string;
  objects: string[];
}

export interface ContentAnalysis {
  topic: string;
  keywords: string[];
  summary: string;
  engagement: number;
  suggestedStyles: string[];
  recommendedLayouts: string[];
}

export interface StyleVariation {
  name: string;
  transitions: string[];
  effects: string[];
  colorScheme: string;
  description: string;
}

export interface DeepSeekMetadata {
  duration: number;
  frameCount: number;
  modelPath: string;
}

export interface DeepSeekResult {
  success: boolean;
  data?: {
    scenes: Scene[];
    contentAnalysis: ContentAnalysis;
    styleVariations: StyleVariation[];
    metadata: DeepSeekMetadata;
  };
  error?: {
    type: string;
    message: string;
  };
}

// Whisper Types
export interface TranscriptSegment {
  start: number;
  end: number;
  text: string;
  confidence: number;
  speaker?: string;
}

export interface Translation {
  segments: TranscriptSegment[];
  text: string;
}

export interface WhisperMetadata {
  modelPath: string;
  speakerCount: number;
}

export interface WhisperResult {
  success: boolean;
  data?: {
    transcription: string;
    segments: TranscriptSegment[];
    translations: Record<string, Translation>;
    metadata: WhisperMetadata;
  };
  error?: {
    type: string;
    message: string;
  };
}
