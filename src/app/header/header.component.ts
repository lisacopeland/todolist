import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
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
    if (this.authService.isLoggedIn()) {
      this.userEmail = this.authService.getCurrentUserEmail();
      this.router.navigate(['/tasklist']);
    }
    this.userChanged = this.authService.userChanged.subscribe(
      (email: string) => {
        console.log('user is now ' + email);
        this.loggedIn = this.authService.isLoggedIn();
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
