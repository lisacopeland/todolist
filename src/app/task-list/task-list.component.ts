import {Component, Inject, OnInit} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { TaskItem, TaskItemId } from '../models/todolist.model';
import { TaskService } from '../services/todolist.service';
import { Observable } from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

export interface TaskItemData {
  description: string;
  finished: string;
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Observable<TaskItem[]>;
  myForm: FormGroup;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.tasks = this.taskService.getTaskItems();
    this.initForm();
  }

  initForm() {
    this.myForm = new FormGroup({
      description: new FormControl('')
    });
  }

  onSubmit() {
    console.log(this.myForm);
    this.taskService.addTaskItem(this.myForm.value.description);
  }

  onDelete(taskItem) {
      this.taskService.deleteTaskItem(taskItem);
  }

  onEdit(taskItem) {

  }

  updateStatus(taskItem) {
    console.log('going to update taskitem : ' + JSON.stringify(taskItem));
    this.taskService.updateTaskItemStatus(taskItem, (taskItem.finished === 'true') ? 'false' : 'true');

  }

}
@Component({
  selector: 'edit-task-item-dialog',
  templateUrl: 'edit-task-item-dialog.html',
  styleUrls: ['./edit-task-item-dialog.css']
})
export class EditTaskItemDialog {

  constructor(
    public dialogRef: MatDialogRef<EditTaskItemDialog>,
    @Inject(MAT_DIALOG_DATA) public data: TaskItemData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
