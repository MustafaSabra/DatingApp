import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) { }
  registerMode = false;
  values: any;
  ngOnInit() {
    this.getvalues();
  }
  registerToggle(){
    this.registerMode = !this.registerMode;
  }

  getvalues(){
    this.http.get('http://localhost:5000/api/values').subscribe(response => {
      this.values = response;
    } , error => { console.log(error); } );
  }
  cancelRegisterMode(newregistermode: boolean)
  {
    this.registerMode = newregistermode;
  }

}
