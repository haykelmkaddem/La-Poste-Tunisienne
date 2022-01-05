import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {UserService} from '../../user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loginAdmin:any;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loginAdmin=true;
    this.form = this.fb.group({
      email: '',
      password: ''
    });
  }

  submit(): void {
    const formData = this.form.getRawValue();
    const data = {
      username: formData.email,
      password: formData.password,
      grant_type: 'password',
      client_id: 2,
      client_secret: 'N5s8trxDflLTtIqZXienQvxr9ie6Ujza4s887MzN',
      scope: '*'
    };

    this.http.post('http://localhost:8000/oauth/token', data).subscribe(
      (result: any) => {
        // localStorage.setItem('token', result.access_token);
        this.userService.login(data.username);
        this.router.navigate(['/public/gestion/paystarifs']);
      },
      error => {
        console.log('error');
        console.log(data);
        console.log(error);
      }
    );
  }
}
