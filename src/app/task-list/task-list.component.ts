import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { TaskItem, TaskItemId } from '../models/todolist.model';
import { TaskService } from '../services/todolist.service';
import { Observable } from 'rxjs';

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

  updateItem(taskItem) {
    this.taskService.updateTaskItem(taskItem);
  }

}
