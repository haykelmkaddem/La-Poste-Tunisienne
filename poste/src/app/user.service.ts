import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loggedChanged:any;
  private loggedChangedUC = false;
  constructor() { }

  login(id: any): void {
    localStorage.setItem('id', id);
    localStorage.setItem('loggedinadmin', 'true');
    this.loggedChanged=true;
  }

  logout(): void {
    localStorage.removeItem('id');
    localStorage.removeItem('loggedinadmin');
    localStorage.setItem('loggedinadmin', 'false');
    this.loggedChangedUC = false;
  }

  loginUc(id: any): void {
    localStorage.setItem('id', id);
    localStorage.setItem('loggedin', 'true');
    this.loggedChanged=true;
  }

  logoutUc(): void {
    localStorage.removeItem('id');
    localStorage.removeItem('loggedin');
    localStorage.setItem('loggedin', 'false');
    this.loggedChangedUC = false;
  }

  isUserLoggedIn(){
    console.log("islogged",this.loggedChanged);
    return this.loggedChangedUC;
  }
  /*
  getUsersC(): Observable<any> {
    return this.http.get(API_URL + '/players',
      new RequestOptions({ headers: this.headers })
    )
      .map(res => res.json().data);
  }

*/

}
