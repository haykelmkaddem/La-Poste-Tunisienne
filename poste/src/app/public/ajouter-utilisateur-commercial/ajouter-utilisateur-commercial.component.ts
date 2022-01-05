import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-ajouter-utilisateur-commercial',
  templateUrl: './ajouter-utilisateur-commercial.component.html',
  styleUrls: ['./ajouter-utilisateur-commercial.component.css']
})
export class AjouterUtilisateurCommercialComponent implements OnInit {

  form: FormGroup;
  selectedFile = null;
  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
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
  }
    onFileSelected(event:any){
      this.selectedFile = event.target.files[0];
    }

  onSubmit(): void {
    const formData = this.form.getRawValue();
    this.http.post('http://localhost:8000/ajouter/uc',formData).subscribe(
      response => console.log(response),
      error => console.log(error)
    );
  }

}
