export interface Person {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: string; // Can be 'student', 'teacher'
}
export interface PersonId extends Person {
  id: string;
}
