import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-pays',
  templateUrl: './pays.component.html',
  styleUrls: ['./pays.component.css']
})
export class PaysComponent implements OnInit {

  form: FormGroup;
  form1: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: ['', Validators.required],
      code: ['', Validators.required],
      name: ['', Validators.required],
      groupe: ['', Validators.required],
      codecoursier: ['', Validators.required],
      codezone: ['', Validators.required],
      langue: ['', Validators.required],
    });

    this.form1 = this.fb.group({
      id: ['', Validators.required],
      code: ['', Validators.required],
      name: ['', Validators.required],
      groupe: ['', Validators.required],
      codecoursier: ['', Validators.required],
      codezone: ['', Validators.required],
      langue: ['', Validators.required],
    });
  }

  onSubmitPays(): void {
    const formData = this.form.getRawValue();
    this.http.post('http://localhost:8000/ajouter/pays', formData).subscribe(
      response => console.log(response),
      error => console.log(error)
    );
  }

  onSubmitZone(): void {
    const formData = this.form.getRawValue();
    this.http.post('http://localhost:8000/ajouter/pays', formData).subscribe(
      response => console.log(response),
      error => console.log(error)
    );
  }
}
