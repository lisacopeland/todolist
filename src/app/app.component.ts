import { Component, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { TaskItem, TaskItemId } from './models/todolist.model';
import { TaskService } from './services/todolist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'todolist';

  constructor() {

  }

  ngOnInit() {

  }

}
