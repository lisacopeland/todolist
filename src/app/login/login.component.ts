import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signinForm: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.initSigninForm();
  }

  initSigninForm() {
    this.signinForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSignin() {
    this.authService.login(this.signinForm.value.email, this.signinForm.value.password);
  }

}
