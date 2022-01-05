import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserService} from "../../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: any;
  dataa: any;
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    const data1 = {
      id: localStorage.getItem('id'),

    };
    const headers = new HttpHeaders({
      Authorization: `${localStorage.getItem('id')}`
    });
    console.log("3");
    console.log(localStorage.getItem('id'));
    this.dataa = localStorage.getItem('id');
    console.log("4");
    console.log(this.dataa);

    this.http.get('http://localhost:8000/userCom/'+this.dataa).subscribe(
      result => {
        this.user = result;
        console.log(result);
      },
      error => {
        this.userService.logout();
        //this.router.navigate(['/public/home']);
      }
    );
  }
}
