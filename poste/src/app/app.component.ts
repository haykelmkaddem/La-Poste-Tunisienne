import {Component, OnInit} from '@angular/core';
import {UserService} from './user.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'poste';
  loggedInUC: any;
  loggedIn: any;
  loggedInAdmin:any;
  constructor(public userService: UserService, private router: Router) {

  }

  ngOnInit(): void {

      //this.loggedInUC = this.userService.isUserLoggedIn();
    //this.router.navigate(['public/loginuc']);


  }

  logoutuc(): void {
    this.userService.logoutUc();
    this.router.navigate(['public/loginuc']);
  }
  logoutadmin(): void {
    this.userService.logout();
    this.router.navigate(['public/login']);
  }
  isLoggedinUC(){
    this.loggedIn = 'true' == localStorage.getItem('loggedin');

    return this.loggedIn;
}
  isLoggedinAdmin(){
    this.loggedInAdmin = 'true' == localStorage.getItem('loggedinadmin');

    return this.loggedInAdmin;
}
}
