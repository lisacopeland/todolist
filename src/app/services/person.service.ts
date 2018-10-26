import { Person, PersonId } from '../models/person.model';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection, AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const config = {
  collection_endpoint: 'people'
};

@Injectable()
export class PeopleService {
  private peopleCollection: AngularFirestoreCollection<Person>;
  // people: Observable<PersonId[]>;

  constructor(private angularFirestore: AngularFirestore) {
    // When you create the collection, you can specify a query
    // You can then you snapshotChanges to create the observable
    this.peopleCollection = this.angularFirestore
        .collection<Person>('people');
  }

  getPeople(sortBy): Observable<PersonId[]> {
    const thisCollection = this.angularFirestore
        .collection<Person>('people', ref => ref.orderBy(sortBy));
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

  getPerson(id, role = 'all'): Observable<any> {
    console.log('hi from getperson, id = ' + id);
    if (role !== 'all') {

    } else {
      thisCollection =
      this.angularFirestore
      .collection('people', ref => ref.where('id', '==', id));

    }

     return thisCollection.snapshotChanges().pipe(
          map(actions =>
            actions.map(a => {
              const data = a.payload.doc.data() as Person;
              console.log('Hi from getPerson :' + JSON.stringify(data));
              const payLoadId = a.payload.doc.id;
              return { payLoadId, ...data };
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
