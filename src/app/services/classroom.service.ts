import { Classroom, ClassroomId } from '../models/classrooms.model';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/* export const config = {
  collection_endpoint: 'classrooms'
}; */

@Injectable()
export class ClassroomService {
  private classroomCollection: AngularFirestoreCollection<Classroom>;

  constructor(private angularFirestore: AngularFirestore) {
    // You do this in the constructor and then you can do any operation
    // on the collection, you don't need to do a get before you can
    // add or delete
    this.classroomCollection = this.angularFirestore.collection<Classroom>('classrooms');
  }

  getClassrooms(): Observable<Classroom[]> {
    // How can you chain a series of gets? Classroom has a reference to 'people'
    // there is probably a way to do a get of classroom which pulls in the
    // people data
    return this.classroomCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Classroom;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  addClassroom(classroom) {
    this.classroomCollection.add(classroom);
  }

  deleteClassroom(classroom) {
    this.classroomCollection.doc(classroom.id).delete();
  }

  updateClassroom(classroom) {
    this.classroomCollection.doc(classroom.id).update(classroom);
  }

}
