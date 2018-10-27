import {Component, Inject, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { Classroom, ClassroomId } from '../models/classrooms.model';
import { ClassroomService } from '../services/classroom.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {EditPersonDialog} from '../people-list/people-list.component';
import {Person, PersonId} from '../models/person.model';
import {PeopleService} from '../services/person.service';
import {AngularFirestoreDocument, AngularFirestoreCollection} from '@angular/fire/firestore';

interface ClassDisplay {
  name: string;
  description: string;
  teacherEmail: string;
}

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent implements OnInit {

  classrooms: Observable<Classroom[]>;
  classroomArray: any[];

  constructor(public dialog: MatDialog,
              private peopleService: PeopleService,
              private classroomService: ClassroomService) { }

  ngOnInit() {
    this.classrooms = this.classroomService.getClassrooms();
  }

  getClassroomData(classroom) {
    console.log('Going to do getPerson, teacher Id is ' + classroom.teacher);
    this.peopleService.getPerson(classroom.teacher).subscribe(teacher => {
      console.log(teacher);
      return {
        className: classroom.name,
        classDescription: classroom.description,
        teacherEmail: teacher[0].email
      };
    });
  }

  onEdit(classroom) {
    const dialogRef = this.dialog.open(EditClassroomDialog, {
      width: '550px',
      data: classroom
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
        this.classroomService.updateClassroom(result);
      }
    });

  }

  onDelete(classroom) {
    this.classroomService.deleteClassroom(classroom);
  }

  onAdd() {
    const dialogRef = this.dialog.open(EditClassroomDialog, {
      width: '550px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
        this.classroomService.addClassroom(result);
      }
    });

  }

}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'edit-classroom-dialog',
  templateUrl: 'edit-classroom-dialog.html',
  styleUrls: ['./edit-classroom-dialog.css']
})
// tslint:disable-next-line:component-class-suffix
export class EditClassroomDialog implements OnInit {
  classroomForm: FormGroup;
  people: PersonId[];
  onReady = false;
  currentTeacherName = '';
  addMode;
  grades = [
    'ninth',
    'tenth',
    'eleventh',
    'twelfth'
  ];

  constructor(
    private peopleService: PeopleService,
    public dialogRef: MatDialogRef<EditClassroomDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ClassroomId) {}

  ngOnInit() {
    console.log('data is ' + JSON.stringify(this.data));
    this.addMode = !(this.data);
    this.peopleService.getPeople('email', 'teacher').subscribe(
        people => {
          console.log(people);
          this.people = people;
          this.initForm();
          this.onReady = true;
          });

  }

  initForm() {
    if (!this.addMode) {
      console.log('Going to do getPerson, teacher Id is ' + this.data.teacher);
      this.peopleService.getPerson(this.data.teacher).subscribe(teacher => {
        console.log(teacher);
        this.currentTeacherName = teacher[0].email;
        console.log('current teacher name is ' + this.currentTeacherName);
      });
    }

    console.log('addmode is ' + this.addMode);
    // console.log('going to default teacher to ' + this.people[0].id);
    if (this.addMode) {
      this.classroomForm = new FormGroup({
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        gradeLevel: new FormControl('', Validators.required),
        teacher: new FormControl(this.people[0].id, Validators.required)
      });
    } else {
      this.classroomForm = new FormGroup({
        name: new FormControl(this.data.name, Validators.required),
        description: new FormControl(this.data.description, Validators.required),
        gradeLevel: new FormControl(this.data.gradeLevel, Validators.required),
        teacher: new FormControl(this.data.teacher, Validators.required)
      });
    }
  }

  onSave() {

    let newClass;
    if (this.addMode) {
      newClass = {
        name: this.classroomForm.value.name,
        description: this.classroomForm.value.description,
        gradeLevel: this.classroomForm.value.gradeLevel,
        teacher: this.classroomForm.value.teacher
      };
    } else {
      newClass = {
        id: this.data.id,
        name: this.classroomForm.value.name,
        description: this.classroomForm.value.description,
        gradeLevel: this.classroomForm.value.gradeLevel,
        teacher: this.classroomForm.value.teacher
      };
    }
    this.dialogRef.close(newClass);
  }

  onCancel() {
    this.dialogRef.close();
  }

}
