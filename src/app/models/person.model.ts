export interface Person {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}
export interface PersonId extends Person {
  id: string;
}
