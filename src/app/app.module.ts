
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { AuthService } from './services/auth.service';
import { TaskService } from './services/todolist.service';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { TaskListComponent, EditTaskItemDialog } from './task-list/task-list.component';
import {ClassListComponent, EditClassroomDialog} from './class-list/class-list.component';
import { EditPersonDialog, PeopleListComponent } from './people-list/people-list.component';
import { ClassroomService } from './services/classroom.service';
import { PeopleService } from './services/person.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SignupComponent,
    HomeComponent,
    TaskListComponent,
    EditTaskItemDialog,
    ClassListComponent,
    EditClassroomDialog,
    PeopleListComponent,
    EditPersonDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AppRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule
  ],
  providers: [
    AuthService,
    TaskService,
    ClassroomService,
    PeopleService
  ],
  entryComponents: [
    EditTaskItemDialog,
    EditPersonDialog,
    EditClassroomDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
