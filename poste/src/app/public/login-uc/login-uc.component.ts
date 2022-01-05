import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../user.service";

@Component({
  selector: 'app-login-uc',
  templateUrl: './login-uc.component.html',
  styleUrls: ['./login-uc.component.css']
})
export class LoginUcComponent implements OnInit {
  form: FormGroup;
  formRecuperation: FormGroup;
  success:any;
  sub: any;
  RecEnvoye:any;
  loggedInUC: any;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    public userService: UserService,
    private route: ActivatedRoute

) { }

  ngOnInit(): void {
    this.RecEnvoye = false;
    this.form = this.fb.group({
      email: '',
      password: ''
    });
    this.formRecuperation = this.fb.group({
      emailrec: ''
    });

    this.sub = this.route.params.subscribe(params => {
      this.success = params['success'];
    });
  }
  submit(): void {
    const formData = this.form.getRawValue();
    const data = {
      username: formData.email,
      password: formData.password
    };

    this.http.post('http://localhost:8000/signin/uc', data).subscribe(
      (result: any) => {
        // localStorage.setItem('token', result.access_token);
        this.userService.loginUc(data.username);
      //  this.loggedInUC = this.userService.isUserLoggedIn();

        console.log("1");
        console.log(data.username);
        console.log("2");
        console.log("success");
        this.router.navigate(['/public/home']);
      },
      error => {
        console.log('error');
        console.log(data);
        console.log(error);
      }
    );
  }

  submitDemandeDeRecuperation(){
    //const formData = this.formRecuperation.getRawValue();

    this.http.get('http://localhost:8000/mailsend/'+this.formRecuperation.value.emailrec).subscribe(
      result => {
        this.RecEnvoye = true;
      },
      error => {
        console.log(error);
      }
    );
  }
}
