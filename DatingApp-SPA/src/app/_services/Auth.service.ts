import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  jwt = new JwtHelperService();
  decodedtoken: any;
  baseUrl = 'http://localhost:5000/api/Auth/';
  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodedtoken = this.jwt.decodeToken(user.token);
          console.log(this.decodedtoken);
        }
      })
    );
  }
  getdecodedtoken(){
    const token = localStorage.getItem('token');
    this.decodedtoken = this.jwt.decodeToken(token);
    return this.decodedtoken;
  }
  loggedin(){
    const token = localStorage.getItem('token');
    return !this.jwt.isTokenExpired(token);
  }
  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
    // .subscribe(() => {console.log('sucess'); });
  }
}
