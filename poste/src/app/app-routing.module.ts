import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { LoginComponent } from './public/login/login.component';
import { PublicComponent } from './public/public.component';
import { SecureComponent } from './secure/secure.component';
import {LoggedoutComponent} from './loggedout/loggedout.component';
import {RegisterComponent} from './public/register/register.component';
import {BordereauComponent} from "./public/bordereau/bordereau.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {PaysComponent} from "./public/pays/pays.component";
import {AjouterUtilisateurCommercialComponent} from "./public/ajouter-utilisateur-commercial/ajouter-utilisateur-commercial.component";
import {LoginUcComponent} from "./public/login-uc/login-uc.component";
import {EnvoiComponent} from "./public/envoi/envoi.component";
import {CarnetadressesComponent} from './public/carnetadresses/carnetadresses.component';
import {GestioncompteComponent} from './public/gestioncompte/gestioncompte.component';
import {PaystarifsComponent} from './public/paystarifs/paystarifs.component';
import {RapidposteComponent} from './public/rapidposte/rapidposte.component';
import {GestionpaysComponent} from './public/gestionpays/gestionpays.component';
import {ContactezNousComponent} from "./public/contactez-nous/contactez-nous.component";
import {RecupererCompteComponent} from "./public/recuperer-compte/recuperer-compte.component";
import {FrontRapidPosteComponent} from "./public/front-rapid-poste/front-rapid-poste.component";
import { GererBordComponent } from './public/gerer-bord/gerer-bord.component';

const routes: Routes = [
  {path: 'public',
  component: PublicComponent,
  children: [
    {path: 'loginuc', component: LoginUcComponent},
    {path: '*', component: LoginUcComponent},
    {path: 'loginuc/:success', component: LoginUcComponent},
    {path: 'ajouter', component: RegisterComponent},
    {path: 'bordereau', component: BordereauComponent},
    {path: 'pays', component: PaysComponent},
    {path: 'ajouter/utilisateur-commerciale', component: AjouterUtilisateurCommercialComponent},
    {path: 'home', component: HomeComponent},
    {path: 'carnetadresses', component: CarnetadressesComponent},
    {path: 'gestion/client', component: GestioncompteComponent},
    {path: 'gestion/paystarifs', component: PaystarifsComponent},
    {path: 'gestion/rapidposte', component: RapidposteComponent},
    {path: 'gestion/pays', component: GestionpaysComponent},
    {path: 'contactez-nous', component: ContactezNousComponent},
    {path: 'resetpassword/:token', component: RecupererCompteComponent},
    {path: 'login', component: LoginComponent},
    {path: 'envoi', component: EnvoiComponent},
    {path: 'rapidposte', component: FrontRapidPosteComponent},
    {path: 'gererbordoreau', component: GererBordComponent},

  ]
},
  {path: 'secure', component: SecureComponent},
  {path: 'loggedout', component: LoggedoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
