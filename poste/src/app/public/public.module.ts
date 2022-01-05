import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './public.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { BordereauComponent } from './bordereau/bordereau.component';
import { PaysComponent } from './pays/pays.component';
import {AjouterUtilisateurCommercialComponent} from "./ajouter-utilisateur-commercial/ajouter-utilisateur-commercial.component";
import { LoginUcComponent } from './login-uc/login-uc.component';
import { EnvoiComponent } from './envoi/envoi.component';
import { CarnetadressesComponent } from './carnetadresses/carnetadresses.component';
import { GestioncompteComponent } from './gestioncompte/gestioncompte.component';
import { PaystarifsComponent } from './paystarifs/paystarifs.component';
import { GestionpaysComponent } from './gestionpays/gestionpays.component';
import { RapidposteComponent } from './rapidposte/rapidposte.component';
import { ContactezNousComponent } from './contactez-nous/contactez-nous.component';
import { RecupererCompteComponent } from './recuperer-compte/recuperer-compte.component';
import { FrontRapidPosteComponent } from './front-rapid-poste/front-rapid-poste.component';
import { GererBordComponent } from './gerer-bord/gerer-bord.component';



@NgModule({
  declarations: [
    PublicComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    BordereauComponent,
    PaysComponent,
    AjouterUtilisateurCommercialComponent,
    LoginUcComponent,
    EnvoiComponent,
    CarnetadressesComponent,
    GestioncompteComponent,
    PaystarifsComponent,
    GestionpaysComponent,
    RapidposteComponent,
    ContactezNousComponent,
    RecupererCompteComponent,
    FrontRapidPosteComponent,
    GererBordComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule
    ]
})
export class PublicModule { }
