import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-contactez-nous',
  templateUrl: './contactez-nous.component.html',
  styleUrls: ['./contactez-nous.component.css']
})
export class ContactezNousComponent implements OnInit {
  form: FormGroup;
  pays: any = "";
  adresses: any;
  dataa:any;
  searchText:any;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      email: ['', Validators.required],
      sujet: ['', Validators.required],
      message: ['', Validators.required]
    });
  }
  onSubmit(): void {
    const formData = this.form.getRawValue();
    const contactData = {
      nom: this.form.value.nom,
      email: this.form.value.email,
      sujet: this.form.value.sujet,
      message: this.form.value.message
    };
    this.http.post('http://localhost:8000/add/contact', contactData).subscribe(
      response => console.log(response),
      error => {
        console.log(error);
      }
    );
  }
}
