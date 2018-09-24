export interface TaskItem {
  description: string;
  finished: string;
}
export interface TaskItemId extends TaskItem {
  id: string;
}
