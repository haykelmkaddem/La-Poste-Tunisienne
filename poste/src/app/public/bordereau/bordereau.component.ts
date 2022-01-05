import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-bordereau',
  templateUrl: './bordereau.component.html',
  styleUrls: ['./bordereau.component.css']
})
export class BordereauComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      code_bordereau: ['', Validators.required],
      date_bordereau: ['', Validators.required],
      etat_borderaux: ['', Validators.required],
      code_client_depot: ['', Validators.required],
      code_client: ['', Validators.required],
      code_service: ['', Validators.required],
      validation: ['', Validators.required],
      date_validation: ['', Validators.required],
      anne_depot: ['', Validators.required],
      mois_depot: ['', Validators.required],
      montant_depot_sr: ['', Validators.required],
      montant_avec_remise: ['', Validators.required],
      mnt_tax_vd: ['', Validators.required],
      registre_decommerce: ['', Validators.required],
      reception: ['', Validators.required],
      date_reception: ['', Validators.required],
      matricule_reception: ['', Validators.required],
      demande_collecte: ['', Validators.required],
      etat_collecte: ['', Validators.required],
      date_collecte: ['', Validators.required],
      created_at: ['', Validators.required],
      updated_at: ['', Validators.required]
    });
  }

  onSubmit(): void {
    const formData = this.form.getRawValue();
    this.http.post('http://localhost:8000/ajouter/bordereau',formData).subscribe(
      response => console.log(response),
      error => console.log(error)
    );
  }

}
