import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-paystarifs',
  templateUrl: './paystarifs.component.html',
  styleUrls: ['./paystarifs.component.css']
})
export class PaystarifsComponent implements OnInit {

  form: FormGroup;
  selectedFile = null;
  listTarifs:any;
  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchPaysTarifs();
    this.form = this.fb.group({
      codezone: ['', Validators.required],
      numtranche: ['', Validators.required],
      tarif: ['', Validators.required]
    });
  }

  fetchPaysTarifs(){
    this.http.get('http://localhost:8000/Tarif/externecolis').subscribe(
      result => {
        this.listTarifs =result;
      },
      error => {
        console.log(error);
      }
    );
  }
  onSubmit(): void {
    const formData = this.form.getRawValue();
    this.http.post('http://localhost:8000/ajouter/Tarif/externecolis',formData).subscribe(
      response => {
        this.http.get('http://localhost:8000/Tarif/externecolis').subscribe(
          result => {
            this.listTarifs =result;
          },
          error => {
            console.log(error);
          }
        );
        console.log(response)
      },
      error => console.log(error)
    );
  }
  remplirForm(Tarifs:any){
    this.form = this.fb.group({
      codezone: [Tarifs.codezone, Validators.required],
      numtranche: [Tarifs.numtranche, Validators.required],
      tarif: [Tarifs.tarif, Validators.required],
    });
  }
}
