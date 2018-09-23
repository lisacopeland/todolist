import { Task } from './todolist.model';
import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// import { AngularFireModule } from '@angular/fire';
// import { AngularFirestoreModule } from '@angular/fire/firestore';
// import { AngularFireStorageModule } from '@angular/fire/storage';
// import { AngularFireAuthModule } from '@angular/fire/auth';


export const config = {
  collection_endpoint: 'tasks'
};

@Injectable()
export class ProductService {
  tasks: Observable<any[]>;
  // tasks: AngularFirestore<Task>;
  // private taskDoc: AngularFirestoreDocument<Task>;

  constructor(private db: AngularFirestore) {
    // this.tasks = db.collection('tasks').valueChanges();

 }

 addTask(task) {
  // this.tasks.add(task);
  }

}
