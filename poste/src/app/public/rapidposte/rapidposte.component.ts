import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-rapidposte',
  templateUrl: './rapidposte.component.html',
  styleUrls: ['./rapidposte.component.css']
})
export class RapidposteComponent implements OnInit {
  form: FormGroup;
  listTarifs:any;
  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchTarifsExternes();
    this.form = this.fb.group({
      codezone: ['', Validators.required],
      numtranche: ['', Validators.required],
      tarif: ['', Validators.required],
      tarifems: ['', Validators.required]
    });

  }

  fetchTarifsExternes(){
    this.http.get('http://localhost:8000/Tarif/externe').subscribe(
      result => {
        this.listTarifs =result;
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit(): void {
    this.fetchTarifsExternes();
    const formData = this.form.getRawValue();
    this.http.post('http://localhost:8000/ajouter/Tarif/externe',formData).subscribe(
      response => console.log(response),
      error => console.log(error)
    );
  }
  remplirForm(Tarifs:any){
    this.form = this.fb.group({
      codezone: [Tarifs.codezone, Validators.required],
      numtranche: [Tarifs.numtranche, Validators.required],
      tarif: [Tarifs.tarif, Validators.required],
      tarifems: [Tarifs.tarifems, Validators.required]
    });
  }
}
