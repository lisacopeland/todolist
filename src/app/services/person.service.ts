import { Person, PersonId } from '../models/person.model';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const config = {
  collection_endpoint: 'people'
};

@Injectable()
export class PeopleService {
  private peopleCollection: AngularFirestoreCollection<Person>;
  people: Observable<PersonId[]>;

  constructor(private angularFirestore: AngularFirestore) {
    this.peopleCollection = this.angularFirestore.collection<Person>('people');
  }

  getPeople(): Observable<Person[]> {
    return this.peopleCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Person;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  addPerson(person: Person) {
    this.peopleCollection.add(person);
  }

  deletePerson(person) {
    this.peopleCollection.doc(person.id).delete();
  }

  updatePerson(person) {
    this.peopleCollection.doc(person.id).update(person);
  }

}
