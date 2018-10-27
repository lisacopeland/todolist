import { Component, Inject, OnInit } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Person, PersonId} from '../models/person.model';
import { PeopleService } from '../services/person.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {
  people: Observable<Person[]>;
  roles = ['all', 'student', 'teacher', 'aide'];

  constructor(public dialog: MatDialog,
              private peopleService: PeopleService) { }

  ngOnInit() {
      this.getPeople();
  }

  getPeople(role?) {
    this.people = this.peopleService.getPeople('lastName', role);
  }

  onFilter($event) {
    console.log('filter selected ' + $event.value);
    if ($event.value !== 'all') {
      this.getPeople($event.value);
    } else {
      this.getPeople();
    }

  }

  onEdit(person) {
    const dialogRef = this.dialog.open(EditPersonDialog, {
      width: '550px',
      data: person
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
        this.peopleService.updatePerson(result);
      }
    });

  }

  onDelete(person) {
    this.peopleService.deletePerson(person);
  }

  onAdd() {
    const dialogRef = this.dialog.open(EditPersonDialog, {
      width: '550px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
        this.peopleService.addPerson(result);
      }
    });

  }

}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'edit-person-dialog',
  templateUrl: 'edit-person-dialog.html',
  styleUrls: ['./edit-person-dialog.css']
})
// tslint:disable-next-line:component-class-suffix
export class EditPersonDialog implements OnInit {
  personForm: FormGroup;
  addMode;
  roles = ['student', 'teacher', 'aide'];

  constructor(
    public dialogRef: MatDialogRef<EditPersonDialog>,
    @Inject(MAT_DIALOG_DATA) public data: PersonId) {}

  ngOnInit() {
    console.log('data is ' + JSON.stringify(this.data));
    console.log('this.roles is ' + this.roles);
    this.addMode = !(this.data);
    this.initForm();
  }

  initForm() {
    console.log('addmode is ' + this.addMode);
    if (this.addMode) {
      this.personForm = new FormGroup({
        email: new FormControl('', Validators.required),
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        phoneNumber: new FormControl('', Validators.required),
        role: new FormControl('student', Validators.required)
      });
    } else {
      this.personForm = new FormGroup({
        email: new FormControl(this.data.email, Validators.required),
        firstName: new FormControl(this.data.firstName, Validators.required),
        lastName: new FormControl(this.data.lastName, Validators.required),
        phoneNumber: new FormControl(this.data.phoneNumber, Validators.required),
        role: new FormControl(this.data.role, Validators.required)
      });
    }
    this.onChanges();
    console.log('personForm ' + this.personForm);
  }

  onChanges(): void {
    this.personForm.get('role').valueChanges.subscribe(val => {
        console.log('on change, val is now ' + val);
    });
  }

  onSave() {

    let newPerson: Person;
      newPerson = {
        email: this.personForm.value.email,
        firstName: this.personForm.value.firstName,
        lastName: this.personForm.value.lastName,
        phoneNumber: this.personForm.value.phoneNumber,
        role: this.personForm.value.role
      };
      if (!this.addMode) {
        Object.assign(newPerson, { id: this.data.id });
      }

    this.dialogRef.close(newPerson);
  }

  onCancel() {
    this.dialogRef.close();
  }

}
