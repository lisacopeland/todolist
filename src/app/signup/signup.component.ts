import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.initSignupForm();
  }

  initSignupForm() {
    this.signupForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

  }

  onSignup() {
    this.authService.signup(this.signupForm.value.email, this.signupForm.value.password);
}


}
