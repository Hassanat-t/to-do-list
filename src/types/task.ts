export interface Task {
  id: string; // UUID v4
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high"; // optional, defaults to "medium"
  createdAt: Date; // ISO string
  dueDate?: Date; // optional due date
}