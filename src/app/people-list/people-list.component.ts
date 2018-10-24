import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {Person, PersonId} from '../models/person.model';
import { PeopleService } from '../services/person.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {
  people: Observable<Person[]>;

  constructor(public dialog: MatDialog,
              private peopleService: PeopleService) { }

  ngOnInit() {
      this.people = this.peopleService.getPeople();
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
  selector: 'edit-person-dialog',
  templateUrl: 'edit-person-dialog.html',
  styleUrls: ['./edit-person-dialog.css']
})
export class EditPersonDialog implements OnInit {
  personForm: FormGroup;
  addMode;

  constructor(
    public dialogRef: MatDialogRef<EditPersonDialog>,
    @Inject(MAT_DIALOG_DATA) public data: PersonId) {}

  ngOnInit() {
    console.log('data is ' + JSON.stringify(this.data));
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
        phoneNumber: new FormControl('', Validators.required)
      });
    } else {
      this.personForm = new FormGroup({
        email: new FormControl(this.data.email, Validators.required),
        firstName: new FormControl(this.data.firstName, Validators.required),
        lastName: new FormControl(this.data.lastName, Validators.required),
        phoneNumber: new FormControl(this.data.phoneNumber, Validators.required)
      });
    }
  }

  onSave() {

    let newPerson;
    if (this.addMode) {
      newPerson = {
        email: this.personForm.value.email,
        firstName: this.personForm.value.firstName,
        lastName: this.personForm.value.lastName,
        phoneNumber: this.personForm.value.phoneNumber
      };
    } else {
      newPerson = {
        id: this.data.id,
        email: this.personForm.value.email,
        firstName: this.personForm.value.firstName,
        lastName: this.personForm.value.lastName,
        phoneNumber: this.personForm.value.phoneNumber
      };
    }
    this.dialogRef.close(newPerson);
  }

  onCancel() {
    this.dialogRef.close();
  }

}
