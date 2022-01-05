import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-carnetadresses',
  templateUrl: './carnetadresses.component.html',
  styleUrls: ['./carnetadresses.component.css']
})
export class CarnetadressesComponent implements OnInit {
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
    this.fetchPays();
    console.log(localStorage.getItem('id'));
    this.form = this.fb.group({
      destinataire: ['', Validators.required],
      adresse: ['', Validators.required],
      pays: ['', Validators.required],
      ville: ['', Validators.required],
      code_postal: ['', Validators.required],
      gsm: ['', Validators.required],
      telephone: ['', Validators.required],
      fax: ['', Validators.required],
      email: ['', Validators.required],
    });
    this.dataa = localStorage.getItem('id');
    this.http.get('http://localhost:8000/mesadresses/'+this.dataa).subscribe(
      result => {
        this.adresses = result;

      },
      error => {

      }
    );
  }
  fetchPays(){
    this.http.get('http://localhost:8000/pays').subscribe(
      result => {
        this.pays =result;
      },
      error => {
        console.log(error);
      }
    );
  }
  onSubmit(): void {
    const formData = this.form.getRawValue();
    const carnetAdrresseData = {
      code_client: localStorage.getItem('id'),
      destinataire: this.form.value.destinataire,
      adresse: this.form.value.adresse,
      c_adresse: this.form.value.adresse,
      pays: this.form.value.pays,
      ville: this.form.value.ville,
      code_postal: this.form.value.code_postal,
      gsm: this.form.value.gsm,
      telephone: this.form.value.telephone,
      fax: this.form.value.fax,
      nom_aberge: this.form.value.destinataire,
      email: this.form.value.email
    };
    this.http.post('http://localhost:8000/ajouter/adresse', carnetAdrresseData).subscribe(
      response => console.log(response),
      error => {
        console.log(error);
      }
    );
  }
  remplirForm(adresse:any){
    this.form = this.fb.group({
      destinataire: [adresse.destinataire, Validators.required],
      adresse: [adresse.adresse, Validators.required],
      pays: [adresse.pays, Validators.required],
      ville: [adresse.ville, Validators.required],
      code_postal: [adresse.code_postal, Validators.required],
      gsm: [adresse.gsm, Validators.required],
      telephone: [adresse.telephone, Validators.required],
      fax: [adresse.fax, Validators.required],
      email: [adresse.email, Validators.required],
    });


  }

  addOrUpdate(){
    const formData = this.form.getRawValue();
    const carnetAdrresseData = {
      code_client: localStorage.getItem('id'),
      destinataire: this.form.value.destinataire,
      adresse: this.form.value.adresse,
      c_adresse: this.form.value.adresse,
      pays: this.form.value.pays,
      ville: this.form.value.ville,
      code_postal: this.form.value.code_postal,
      gsm: this.form.value.gsm,
      telephone: this.form.value.telephone,
      fax: this.form.value.fax,
      nom_aberge: this.form.value.destinataire,
      email: this.form.value.email
    };
    this.http.post('http://localhost:8000/ajouter/adresse', carnetAdrresseData).subscribe(
      response => {
        this.http.get('http://localhost:8000/mesadresses/'+this.dataa).subscribe(
          result => {
            this.adresses = result;

          },
          error => {

          }
        );
      },
      error => {
        console.log(error);
      }
    );
  }
  deleteAdresse(adresses:any){
    this.http.get('http://localhost:8000/adresse/delete/'+adresses.id).subscribe(
      response => {
        this.http.get('http://localhost:8000/mesadresses/'+this.dataa).subscribe(
          result => {
            this.adresses = result;

          },
          error => {

          }
        );
        console.log(this.adresses);
      },
      error => {
        console.log(error);
      }
    );
  }
  viderForm(){
    this.fetchPays();
    this.form = this.fb.group({
      destinataire: ['', Validators.required],
      adresse: ['', Validators.required],
      pays: ['', Validators.required],
      ville: ['', Validators.required],
      code_postal: ['', Validators.required],
      gsm: ['', Validators.required],
      telephone: ['', Validators.required],
      fax: ['', Validators.required],
      email: ['', Validators.required],
    });
  }
  search(t:any){
    t = (<HTMLInputElement>document.getElementById("searchText")).value;
    this.http.get('http://localhost:8000/adresse/search/'+t).subscribe(
      result => {
        this.adresses = result;
        console.log(this.adresses);
        console.log("t-> "+t);
        console.log("searchText-> "+this.searchText);
      },
      error => {
        console.log(error);
      }
    );
  }
}
