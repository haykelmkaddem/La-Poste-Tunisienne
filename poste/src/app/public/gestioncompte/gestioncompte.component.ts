import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-gestioncompte',
  templateUrl: './gestioncompte.component.html',
  styleUrls: ['./gestioncompte.component.css']
})
export class GestioncompteComponent implements OnInit {
  form: FormGroup;
  selectedFile = null;
  listClient:any;
  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchClients();
    this.form = this.fb.group({
      nomresonsociale: ['', Validators.required],
      code_unite_com: ['', Validators.required],
      adresse: ['', Validators.required],
      cadresse: ['', Validators.required],
      localite: ['', Validators.required],
      code_postal: ['', Validators.required],
      telephone: ['', Validators.required],
      fax: ['', Validators.required],
      email: ['', Validators.required],
      REF_importateur: ['', Validators.required],
      ccp: ['', Validators.required]
    });
    console.log(this.listClient);

  }
  fetchClients(){
    this.http.get('http://localhost:8000/users').subscribe(
      result => {
        this.listClient =result;
        console.log(this.listClient);

      },
      error => {
        console.log(error);
      }
    );
  }
  onFileSelected(event:any){
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    const formData = this.form.getRawValue();
    console.log(formData);
    this.http.post('http://localhost:8000/ajouter/uc',formData).subscribe(
      response => console.log(response),
      error => console.log(error)
    );
  }
  changerEtat(code:any){
    this.http.get('http://localhost:8000/changerEtatUC/'+code).subscribe(
      response => {
        console.log(response);
        this.http.get('http://localhost:8000/users').subscribe(
          result => {
            this.listClient =result;
            console.log(this.listClient);

          },
          error => {
            console.log(error);
          }
        );
      },
      error => console.log(error)
    );
}
changerEtatTo0(code:any){
    this.http.get('http://localhost:8000/changerEtatUCTo0/'+code).subscribe(
      response => {
        console.log(response);
        this.http.get('http://localhost:8000/users').subscribe(
          result => {
            this.listClient =result;
            console.log(this.listClient);

          },
          error => {
            console.log(error);
          }
        );
      },
      error => console.log(error)
    );
}

  remplirForm(client:any){
    this.form = this.fb.group({
      nomresonsociale: [client.code_client, Validators.required],
      code_unite_com: [client["nom reson sociale"], Validators.required],
      adresse: [client.adresse, Validators.required],
      cadresse: [client.cadresse, Validators.required],
      localite: [client.localite, Validators.required],
      code_postal: [client.code_postal, Validators.required],
      telephone: [client.telephone, Validators.required],
      fax: [client.fax, Validators.required],
      email: [client.email, Validators.required],
      REF_importateur: [client.REF_importateur, Validators.required],
      ccp: [client.ccp, Validators.required]
    });
  }
}
