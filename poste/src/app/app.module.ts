import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicComponent } from './public/public.component';
import { PublicModule } from './public/public.module';
import { SecureComponent } from './secure/secure.component';
import { LoggedoutComponent } from './loggedout/loggedout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LogicalFileSystem} from "@angular/compiler-cli/src/ngtsc/file_system";
import {LoginComponent} from "./public/login/login.component";
import { TableauComponent } from './tableau/tableau.component';


@NgModule({
  declarations: [
    AppComponent,
    SecureComponent,
    LoggedoutComponent,
    DashboardComponent,
    TableauComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        PublicModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
