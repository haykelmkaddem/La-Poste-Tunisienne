import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../user.service";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-gerer-bord',
  templateUrl: './gerer-bord.component.html',
  styleUrls: ['./gerer-bord.component.css']
})
export class GererBordComponent implements OnInit {
  form: FormGroup;
  user: any;
  dataa: any
  adresses: any;
  descriptions: any;
  selectedAdresse: any;
  ajouterAdresse: boolean;
  P: number = 0;
  P1: number = 0;
  P2: number = 0;
  P3: number = 0;
  P4: number = 0;
  valeur: any = 0;
  valeur1: any = 0;
  valeur2: any = 0;
  valeur3: any = 0;
  valeur4: any = 0;
  desc: string= "";
  desc1: string = "";
  desc2: string = "";
  desc3: string = "";
  desc4: string = "";
  totPoids: number = 0;
  totValeurs: number = 0;
  totDescs: string = "";
  pays: any = "";
  codeHs: any;
  codeHs1: any;
  codeHs2: any;
  codeHs3: any;
  codeHs4: any;
  QT: number = 0;
  QT1: number = 0;
  QT2: number = 0;
  QT3: number = 0;
  QT4: number = 0;
  depot: any;
  idDepot: any;
  codeZonee:any = "";
  codeZone:any = "";
  codeZone1:any = "";
  codeZone2:any = "";
  codeZone3:any = "";
  codeZone4:any = "";
  numTranchee:any = 0;
  numTranche:any = 0;
  numTranche1:any = 0;
  numTranche2:any = 0;
  numTranche3:any = 0;
  numTranche4:any = 0;
  tarifSansRemise:any = 0;
  tarifAvecRemise:any = 0;
  tariff:any =0;
  tariff1:any =0;
  tarif:any = 0;
  tarif1:any = 0;
  tarif2:any = 0;
  tarif3:any = 0;
  tarif4:any = 0;
  codeEnvoi:any;
  envoi: any;
  idEnvoi: any;
  listeEnvois:any;
  myDate: any;
  crbtValue:any;
  taxeReel: any;
  crbt1: any;
  ok:any;
  bord: any;
  crbtVal:any;
  poidvol:any;
  domicVal:any;
  
  pv:any;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private userService: UserService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.fetchPays();
    this.fetchBord();
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
      code_hs: ['', Validators.required],
      libelle_artique: ['', Validators.required],
      quantite: ['', Validators.required],
      devise: ['TND', Validators.required],
      prix_total_ht: ['', Validators.required],
      pays_origine: ['Pays Origine', Validators.required],
      poids_net: ['', Validators.required],
      code_hs1: ['', Validators.required],
      libelle_artique1: ['', Validators.required],
      quantite1: ['', Validators.required],
      devise1: ['', Validators.required],
      prix_total_ht1: ['', Validators.required],
      pays_origine1: ['Pays  Origine', Validators.required],
      poids_net1: ['', Validators.required],
      code_hs2: ['', Validators.required],
      libelle_artique2: ['', Validators.required],
      quantite2: ['', Validators.required],
      devise2: ['', Validators.required],
      prix_total_ht2: ['', Validators.required],
      pays_origine2: ['Pays Origine', Validators.required],
      poids_net2: ['', Validators.required],
      code_hs3: ['', Validators.required],
      libelle_artique3: ['', Validators.required],
      quantite3: ['', Validators.required],
      devise3: ['', Validators.required],
      prix_total_ht3: ['', Validators.required],
      pays_origine3: ['Pays Origine', Validators.required],
      poids_net3: ['', Validators.required],
      code_hs4: ['', Validators.required],
      libelle_artique4: ['', Validators.required],
      quantite4: ['', Validators.required],
      devise4: ['', Validators.required],
      prix_total_ht4: ['', Validators.required],
      pays_origine4: ['Pays Origine', Validators.required],
      poids_net4: ['', Validators.required],
      totalPoids: [this.totPoids, Validators.required],
      totalValeurs: [this.totValeurs, Validators.required],
      tarifsansremise: [this.tarifSansRemise, Validators.required],
      tarifAvecRemise: [this.tarifAvecRemise, Validators.required],
      totDescs: [this.totDescs, Validators.required],
      categorieenvoi: ['Agroalimentaire', Validators.required],
      depot: ['', Validators.required],
      codeenvoi: ['', Validators.required],
      crbt: ['', Validators.required],
      crbtBool: ['', Validators.required],
      domicialisation: ['', Validators.required],
      poidvol: ['', Validators.required],
      pays1: ['', Validators.required],
      hauteur: ['', Validators.required],
      largeur: ['', Validators.required],
      tariff: ['', Validators.required],
      service: ['', Validators.required]
    });

    this.dataa = localStorage.getItem('id');


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
  fetchBord(){
    this.http.get('http://localhost:8000/find/bordereau/'+localStorage.getItem('id')).subscribe(
      result => {
        this.bord =result;
      },
      error => {
        console.log(error);
      }
    );
  }

    dernierDepot(idDepot:any){
    this.http.get('http://localhost:8000/depot/'+localStorage.getItem('id')).subscribe(
      result => {
        this.depot = result;
        this.idDepot = this.depot.code_bordereau;
        this.http.get('http://localhost:8000/cloture/'+this.idEnvoi+'/'+idDepot+'/colis').subscribe(
          result => {
            this.ok =result;
            console.log("ok url=>",'http://localhost:8000/cloture/'+this.idEnvoi+'/'+idDepot+'/rapid%20poste');

            console.log("ok info =>",this.ok);
            this.ok = this.ok.cloture;
            console.log("ok =>", this.ok);

          },
          error => {
            console.log("Pas de résultats.");

          }
        );
        this.http.get('http://localhost:8000/envoiparb/'+this.idDepot+'/'+localStorage.getItem('id')).subscribe(
          result => {
            this.listeEnvois = result;
            console.log("liste+++==>",result);
            console.log("liste+++==>",this.listeEnvois);
          },
          error => {
            console.log(error);
          }
        );
      },
      error => {
        //this.router.navigate(['/public/home']);
      }
    );
  }
  poid(event:any){
    this.P = Number(event.target.value);
    this.totPoids = this.P + this.P1 + this.P2 + this.P3 + this.P4;

    this.numTranchee = this.numTranche;
    var test:boolean;
    this.http.get('http://localhost:8000/find/numtranche/'+this.P).subscribe(
      result => {
        while ( this.numTranche == this.numTranchee){

          this.numTranche =result;
          console.log(this.numTranche.NumTranche);
          if (this.numTranche != this.numTranchee && this.codeZone != ""){
            this.tariff = this.tarif;
          this.http.get('http://localhost:8000/find/tarifsansremise/'+this.numTranche.NumTranche+'/'+this.codeZone.codezone).subscribe(
            result => {
              while ( this.tariff == this.tarif) {
                this.tarif = result;
                console.log(this.tarif.tarif);
                this.tarifSansRemise = Number(this.tarif.tarif) + Number(this.tarif1.tarif) + Number(this.tarif2.tarif) + Number(this.tarif3.tarif) + Number(this.tarif4.tarif);
                this.tarifAvecRemise = this.tarifSansRemise/2;
                console.log(this.tarifSansRemise)
              }
            },
            error => {
              console.log(error);
            }
          );
          }
        }

      },
      error => {
        console.log(error);

      }
    );


  }
  onChangepays(e:any){


    this.codeZonee = this.codeZone;
    this.http.get('http://localhost:8000/find/codezone/'+e).subscribe(
      result => {

        while (this.codeZone == this.codeZonee  ){
          this.codeZone = result;
          console.log(this.codeZone.codezone);
          if (this.numTranche != "" && this.codeZone != this.codeZonee){
            this.tariff = this.tarif;
            this.http.get('http://localhost:8000/find/tarifsansremise/'+this.numTranche.NumTranche+'/'+this.codeZone.codezone).subscribe(
              result => {
                while ( this.tariff == this.tarif) {
                  this.tarif = result;
                  console.log(this.tarif.tarif);
                  this.tarifSansRemise = Number(this.tarif.tarif) + Number(this.tarif1.tarif) + Number(this.tarif2.tarif) + Number(this.tarif3.tarif) + Number(this.tarif4.tarif);
                  this.tarifAvecRemise = this.tarifSansRemise/2;
                }
              },
              error => {
                console.log(error);
              }
            );
          }


        }
      },
      error => {
        console.log(error);
      }
    );

      //this.getTarif(this.numTranche.NumTranche,this.codeZone.codezone)
      //this.valeur = this.tariff;


  }
  
  getCodeZone() {
    var i:number = 0;
    var p:any = this.form.value.pays;
    this.http.get('http://localhost:8000/find/codezone/'+p).subscribe(
      result => {
        while (this.codeZonee == "" ){
          this.codeZonee = result;
          i++;
          console.log(i);
          console.log(this.codeZonee);

        }
      },
      error => {
        console.log(error);

      }
    );


  }






  setDomicVal(){
    if (this.form.value.domicialisation == "oui"){
            this.domicVal = 10;
    }else{
      this.domicVal = 0;
    }

  }
  setCrbtVal() {
    if (this.form.value.crbtBool == "oui") {
      this.crbtVal = 5;
    } else {
      this.crbtVal = 0;
    }
  }
  calculPv(){
    this.poidvol= (this.form.value.largeur * this.form.value.hauteur * this.form.value.longeur)/4000;
  }


  getNumTranche(){

  }
  getTarif(){

    this.http.get('http://localhost:8000/get/tarif/'+this.form.value.poidvol+'/'+this.form.value.pays1+'/'+this.form.value.service).subscribe(
      result => {
        this.tariff = result;
        console.log(this.tariff);
        this.tariff = this.tariff.tarif;
        this.http.get('http://localhost:8000/get/tarif/'+this.form.value.poidvol+'/'+this.form.value.pays1+'/'+this.form.value.service).subscribe(
          result => {
            this.tariff = result;
            console.log(this.tariff);
            this.tariff = this.tariff.tarif;
          },
          error => {
            console.log(error);
          }
        );
      },
      error => {
        console.log(error);
      }
    );

  }
  getTarifServiceChange(){

    this.http.get('http://localhost:8000/get/tarif/'+this.form.value.poidvol+'/'+this.form.value.pays1+'/'+this.form.value.service).subscribe(
      result => {
        this.tariff1 = result;
        console.log(this.tariff1);
        this.tariff1 = this.tariff1.tarif;
        this.http.get('http://localhost:8000/get/tarif/'+this.form.value.poidvol+'/'+this.form.value.pays1+'/'+this.form.value.service).subscribe(
          result => {
            this.tariff1 = result;  
            console.log(this.tariff1);
            this.tariff1 = this.tariff1.tarif;
          },
          error => {
            console.log(error);
          }
        );
      },
      error => {
        console.log(error);
      }
    );




  }
}
