import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserService} from "../../user.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recuperer-compte',
  templateUrl: './recuperer-compte.component.html',
  styleUrls: ['./recuperer-compte.component.css']
})
export class RecupererCompteComponent implements OnInit {
  form: FormGroup;
  sub: any;
  token:any;
  success:any;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.success = "";
    this.form = this.fb.group({
      email: '',
      password: ''
    });

    this.sub = this.route.params.subscribe(params => {
      this.token = params['token'];
    });
  }

  submit(): void {
    const formData = this.form.getRawValue();
    const data = {
      email: formData.email,
      newmdp: formData.password,
      token:this.token
    };
    console.log(data);

    this.http.post('http://localhost:8000/changePassword', data).subscribe(
      (result: any) => {
        this.success = "changed";

        console.log("success");
        this.router.navigate(['/public/loginuc', this.success]);
      },
      error => {
        console.log('error');
        console.log(data);
        console.log(error);
      }
    );
  }
}
