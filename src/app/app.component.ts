import { Component, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from './auth.service';
import { TaskItem, TaskItemId } from './todolist.model';
import { TaskService } from './todolist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  myForm: FormGroup;
  signupForm: FormGroup;
  signinForm: FormGroup;
  loggedIn = false;
  userChanged: Subscription;
  tasks: Observable<TaskItem[]>;

  constructor(private taskService: TaskService,
              private authService: AuthService) {

  }

  ngOnInit() {
    this.tasks = this.taskService.getTaskItems();
    this.initSignupForm();
    this.initSigninForm();
    this.initForm();
    this.userChanged = this.authService.userChanged.subscribe(
      (email: string) => {
        console.log('user is now ' + email);
        this.loggedIn = (email) ? true : false;
    });
  }

  initForm() {
    this.myForm = new FormGroup({
      description: new FormControl('')
    });
  }

  initSignupForm() {
    this.signupForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });

  }

  initSigninForm() {
    this.signinForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });

  }

  onSignup() {
      this.authService.signup(this.signupForm.value.email, this.signupForm.value.password);
  }

  onSignin() {
    this.authService.login(this.signinForm.value.email, this.signinForm.value.password);
  }

  onLogout() {
    this.authService.logout();
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
