import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-gestionpays',
  templateUrl: './gestionpays.component.html',
  styleUrls: ['./gestionpays.component.css']
})
export class GestionpaysComponent implements OnInit {
  form: FormGroup;
  listPays:any;
  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      groupe: ['', Validators.required],
      codecoursier: ['', Validators.required],
      codezone: ['', Validators.required],
      langue: ['', Validators.required],
    });

    this.fetchPays();
  }
  fetchPays(){
    this.http.get('http://localhost:8000/pays').subscribe(
      result => {
        this.listPays =result;
      },
      error => {
        console.log(error);
      }
    );
  }
  onSubmitPays(): void {
    const formData = {
      code: this.form.value.code,
      name: this.form.value.name,
      groupe: this.form.value.groupe,
      codecoursier: this.form.value.codecoursier,
      codezone: this.form.value.codezone,
      langue: this.form.value.langue
    };

    console.log(formData);
    this.http.post('http://localhost:8000/ajouter/pays', formData).subscribe(
      response => {
        this.http.get('http://localhost:8000/pays').subscribe(
          result => {
            this.listPays =result;
          },
          error => {
            console.log(error);
          }
        );
        console.log(response);
      },
      error => console.log(error)
    );
  }
  remplirForm(pays:any){
    this.form = this.fb.group({
      code: [pays.code, Validators.required],
      name: [pays.name, Validators.required],
      groupe: [pays.groupe, Validators.required],
      codecoursier: [pays.codecoursier, Validators.required],
      codezone: [pays.codezone, Validators.required],
      langue: [pays.langue, Validators.required]
    });
  }

}
