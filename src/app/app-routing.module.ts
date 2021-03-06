import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { TaskListComponent } from './task-list/task-list.component';
import { ClassListComponent } from './class-list/class-list.component';
import { PeopleListComponent } from './people-list/people-list.component';

import { AuthGuard } from './auth/auth-guard.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'tasklist', component: TaskListComponent, canActivate: [AuthGuard] },
  { path: 'classlist', component: ClassListComponent, canActivate: [AuthGuard] },
  { path: 'peoplelist', component: PeopleListComponent, canActivate: [AuthGuard] }
];

/**
 * App routing module for PetStore
 *
 * @export
 * @class AppRoutingModule
 */

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
