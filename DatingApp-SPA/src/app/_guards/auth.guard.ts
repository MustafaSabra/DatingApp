import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/Auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
constructor(private auth: AuthService, private router: Router , private alertify: AlertifyService){}
  canActivate(): boolean {
    if (this.auth.loggedin()){
      return true;
    }
    this.alertify.error('You SHall Not Pass !!!');
    this.router.navigate(['home']);
    return false;
  }
}
