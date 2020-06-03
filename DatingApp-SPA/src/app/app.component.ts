import { AuthService } from './_services/Auth.service';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'DatingApp-SPA By Musa';
  jwtHelper = new JwtHelperService();
  constructor(private authService: AuthService){}
  ngOnInit(){
    const token = localStorage.getItem('token');
    if (token){
      }
    this.authService.decodedtoken = this.jwtHelper.decodeToken(token);
  }
}
