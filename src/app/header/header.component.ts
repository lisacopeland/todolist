import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn = false;
  userEmail = '';
  userChanged: Subscription;

  constructor(private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.userChanged = this.authService.userChanged.subscribe(
      (email: string) => {
        console.log('user is now ' + email);
        this.loggedIn = (email) ? true : false;
        if (this.loggedIn) {
          this.userEmail = email;
          this.router.navigate(['/tasklist']);
        }
    });
  }

  onLogout() {
    this.authService.logout();
  }

}
