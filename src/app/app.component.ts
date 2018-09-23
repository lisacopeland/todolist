import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

export interface TaskItem { id: string; description: string; }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  myForm: FormGroup;
  tasks: Observable<any[]>;
  private taskList: AngularFirestoreCollection<TaskItem>;

  constructor(private angularFirestore: AngularFirestore) {
    this.taskList = angularFirestore.collection<TaskItem>('tasks');
    this.tasks = this.taskList.valueChanges();
    // this.tasks = angularFirestore.collection('tasks').valueChanges();
  }

  ngOnInit() {
    this.initForm();
  }

  addItem(description: string) {
    // Persist a document id
    const id = this.angularFirestore.createId();
    const taskItem: TaskItem = { id, description };
    this.taskList.doc(id).set(taskItem);
  }

  initForm() {
    this.myForm = new FormGroup({
      description: new FormControl('')
    });
  }

  onSubmit() {
    console.log(this.myForm);
    this.addItem(this.myForm.value.description);
  }
}
