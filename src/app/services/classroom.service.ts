import { Classroom, ClassroomId } from '../models/classrooms.model';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const config = {
  collection_endpoint: 'classrooms'
};

@Injectable()
export class ClassroomService {
  private classroomCollection: AngularFirestoreCollection<Classroom>;
  tasks: Observable<ClassroomId[]>;

  constructor(private angularFirestore: AngularFirestore) {
    this.classroomCollection = this.angularFirestore.collection<Classroom>('classrooms');
  }

  getClassrooms(): Observable<Classroom[]> {
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
