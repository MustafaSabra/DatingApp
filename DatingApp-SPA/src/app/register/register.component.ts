import { AlertifyService } from './../_services/alertify.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './../_services/Auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private http: HttpClient, private alertify: AlertifyService) { }
model: any = {};
@Input() valuesFromHome: any;
@Output() cancelRegister = new EventEmitter();
baseUrl = 'http://localhost:5000/api/Auth/';
  ngOnInit() {
  }
  registers(){
    return this.http.post(this.baseUrl + 'register', this.model ).subscribe(() => {console.log('sucess'); });
    }

  register(){
    this.authService.register(this.model).subscribe(() => {
      this.alertify.success('Wehaaa Registered Successfuly');
      console.log('wehaaa');
    }, error => {
      this.alertify.error(error.error);
      console.log(error);
    });
    }
cancel(){
this.cancelRegister.emit(false);
console.log('cancelled...');

}
}
