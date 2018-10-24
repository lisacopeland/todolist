import { Person } from './person.model';

export interface Classroom {
  name: string;
  description: string;
  gradeLevel: string;
  room: string;
  days: string;
  teacher: Person;
}
export interface ClassroomId extends Classroom {
  id: string;
}
