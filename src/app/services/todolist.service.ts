import { TaskItem, TaskItemId } from '../models/todolist.model';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const config = {
  collection_endpoint: 'tasks'
};

@Injectable()
export class TaskService {
  private taskCollection: AngularFirestoreCollection<TaskItem>;

  constructor(private angularFirestore: AngularFirestore) {
    this.taskCollection = this.angularFirestore.collection<TaskItem>('tasks');
  }

  getTaskItems(): Observable<TaskItem[]> {
    return this.taskCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as TaskItem;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  addTaskItem(description: string) {
    const taskItem: TaskItem = { description: description, finished: 'false' };
    this.taskCollection.add(taskItem);
  }

  deleteTaskItem(taskItem) {
    this.taskCollection.doc(taskItem.id).delete();
  }

  updateTaskItemStatus(taskItem, status) {
    console.log('status is ' + status);
    this.taskCollection.doc(taskItem.id).update({ finished: status });
  }

}
