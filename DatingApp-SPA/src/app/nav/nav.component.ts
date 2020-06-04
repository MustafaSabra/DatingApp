import { RouterModule, Router } from '@angular/router';
import { routes } from './../routes';
import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/Auth.service';
import { Component, OnInit, NgModule } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {}
  login() {
    this.authService.login(this.model).subscribe(
      () => {
        this.alertify.success('Logged Succesfully...');
        console.log('Logged Succesfully...');
      },
      (error) => {
        this.alertify.error(error);
        console.log(error);
      }, () => {
this.router.navigate(['members']);
      }
    );
  }
  loggedin() {
    return this.authService.loggedin();
    // const token = localStorage.getItem('token');
    // this.alertify.message('Logged in');
    // return !!token;
  }
  logout() {
    localStorage.removeItem('token');
    this.alertify.message('Logged out');
    this.router.navigate(['home']);
  }
}
