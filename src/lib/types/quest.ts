export interface Task {
  id: string;
  title: string;
  completed: boolean;
  type: "default" | "custom";
  timestamp: number;
  userId: string;
  xp: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  days: number;
  achieved: boolean;
}
