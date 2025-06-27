export enum VideoStatus {
  UPLOADING = "UPLOADING",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED"
}

export interface Video {
  id: string;
  title: string;
  description?: string;
  url?: string;
  storagePath?: string;
  userId: string;
  projectId: string;
  status: VideoStatus;
  error?: string;
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface VideoVariation {
  id: string;
  videoId: string;
  url: string;
  type: string;
  width: number;
  height: number;
  duration: number;
  thumbnail?: string;
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface VideoExport {
  id: string;
  videoId: string;
  variationId: string;
  url: string;
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
}
