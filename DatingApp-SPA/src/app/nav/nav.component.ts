import { AuthService } from './../_services/Auth.service';
import { Component, OnInit, NgModule } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

   model: any = {};
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
login(){
  this.authService.login(this.model).subscribe(() => {
console.log('Logged Succesfully...' );
  }, error => {
    console.log('Failed...');
  });
}
loggedin(){
  const token = localStorage.getItem('token');
  return !!token;
}
logout(){
  localStorage.removeItem('token');
}
}
