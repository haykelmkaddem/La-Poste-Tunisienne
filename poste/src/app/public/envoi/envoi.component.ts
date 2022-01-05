import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../user.service";
import {Router} from "@angular/router";
import { DatePipe } from '@angular/common';
//import * as jspdf from 'jspdf';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-envoi',
  templateUrl: './envoi.component.html',
  styleUrls: ['./envoi.component.css'],
  providers: [DatePipe]
})
export class EnvoiComponent implements OnInit {
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
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private userService: UserService,
    private router: Router,
    private datePipe: DatePipe) {
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd')
  }


  ngOnInit(): void {

    this.dernierDepot();
    this.dernierEnvoi();
    console.log("enivoi id"+this.idEnvoi);
    this.fetchPays();
    this.ajouterAdresse = true;
    this.listDesEnvois();
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
      domicialisation: ['', Validators.required]
    });

    this.dataa = localStorage.getItem('id');


    this.http.get('http://localhost:8000/mesadresses/'+this.dataa).subscribe(
      result => {
        this.adresses = result;

      },
      error => {
        //this.router.navigate(['/public/home']);
      }
    );

    this.http.get('http://localhost:8000/find/CodeHs').subscribe(
      result => {
        this.descriptions =result;


      },
      error => {
        console.log("Pas de résultats.");

      }
    );


  }
  listDesEnvois(){

  }
  dernierDepot(){
    this.http.get('http://localhost:8000/depot/'+localStorage.getItem('id')).subscribe(
      result => {
        this.depot = result;
        this.idDepot = this.depot.code_bordereau;
        this.http.get('http://localhost:8000/cloture/'+this.idEnvoi+'/'+this.idDepot+'/colis').subscribe(
          result => {
            this.ok =result;
            console.log("ok url=>",'http://localhost:8000/cloture/'+this.idEnvoi+'/'+this.idDepot+'/rapid%20poste');

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
  dernierEnvoi(){
    this.http.get('http://localhost:8000/envoiNew/'+localStorage.getItem('id')).subscribe(
      result => {
        this.envoi = result;
        this.idEnvoi = this.envoi.id;
        console.log("enivoi id 11 "+this.idEnvoi);

      },
      error => {
        console.log(error);
      }
    );
  }
  cloturerDepot(){//
    const depot = {
      id: localStorage.getItem('id'),

    };
    this.http.post('http://localhost:8000/update/depot/',depot).subscribe(
      result => {
        this.http.get('http://localhost:8000/depot/'+localStorage.getItem('id')).subscribe(
          result => {
            this.depot = result;
            this.idDepot = this.depot.code_bordereau;
            this.http.get('http://localhost:8000/cloture/'+this.idEnvoi+'/'+this.idDepot+'/colis').subscribe(
              result => {
                this.ok =result;
                console.log("ok url=>",'http://localhost:8000/cloture/'+this.idEnvoi+'/'+this.idDepot+'/rapid%20poste');

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
      },
      error => {
        //this.router.navigate(['/public/home']);
      }
    );
    this.dernierDepot();
  }
  getDest(idDest:any){
    this.ajouterAdresse = false;
    this.http.get('http://localhost:8000/adresse/'+idDest).subscribe(
      result => {
        this.selectedAdresse = result
        this.form = this.fb.group({
          destinataire: [this.selectedAdresse.destinataire, Validators.required],
          adresse: [this.selectedAdresse.adresse, Validators.required],
          pays: [this.selectedAdresse.pays, Validators.required],
          ville: [this.selectedAdresse.ville, Validators.required],
          code_postal: [this.selectedAdresse.code_postal, Validators.required],
          gsm: [this.selectedAdresse.gsm, Validators.required],
          telephone: [this.selectedAdresse.telephone, Validators.required],
          fax: [this.selectedAdresse.fax, Validators.required],
          email: [this.selectedAdresse.email, Validators.required],
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
          pays_origine1: ['', Validators.required],
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
          totDescs: [this.totDescs, Validators.required],
          categorieenvoi: ['Agroalimentaire', Validators.required],
          tarifsansremise: [this.tarifSansRemise, Validators.required],
          tarifAvecRemise: [this.tarifAvecRemise, Validators.required],
          depot: [this.idDepot, Validators.required],
          codeenvoi: [this.idEnvoi, Validators.required],
          crbt: ['', Validators.required],
          crbtBool: ['', Validators.required],
          domicialisation: ['', Validators.required]
        });
      },
      error => {
        //this.router.navigate(['/public/home']);
      }
    );

  }

  onSubmit(): void {
    this.dataa = localStorage.getItem('id');
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
  //  this.pdfCN22();
    this.myDate = new Date();
    console.log(this.myDate);

    this.http.get('http://localhost:8000/find/crbt/'+this.form.value.tarifsansremise).subscribe(
      result => {

          this.crbtValue = result;
        this.taxeReel =this.crbtValue + this.form.value.tarifsansremise;
        if (this.form.value.domicialisation == 'oui'){
          this.taxeReel += 10;
        }
        if (this.form.value.crbt == 'oui'){
          this.crbt1 = 'O';
        }else{
          this.crbt1 = 'N';
        }
        const envoiData = {
          id:this.idEnvoi,
          CODE_CLIENT: localStorage.getItem('id'),
          code_BORDREAU:this.idDepot,
          NATURE:'-',
          categorie:this.form.value.categorieenvoi,
          description:this.form.value.totDescs,
          service:'colis',
          MAILITM_WEIGHT_estime:this.form.value.totalPoids,
          TAXE_estime:this.form.value.tarifsansremise,
          taxe_avec_remise: this.form.value.tarifAvecRemise,
          INFOS_COUNTRY_DEST:this.form.value.pays,
          CUSTOMER_NAME:this.form.value.destinataire,
          CUSTOMER_ADDRESS:this.form.value.adresse,
          CUSTOMER_CITY:this.form.value.ville,
          CUSTOMER_POST_CODE:this.form.value.code_postal,
          CUSTOMER_PHONE:this.form.value.telephone,
          CUSTOMER_GSM:this.form.value.gsm,
          CUSTOMER_MAIL:this.form.value.email,
          crbt:this.form.value.crbtBool,
          Mnt_crbt:this.crbtValue.tarif,
          taxe_reel: this.tarifSansRemise,
          desc: this.form.value.code_postal,
          p1: this.form.value.adresse,
          p2: this.form.value.adresse,
          p3: this.form.value.pays,
          p4: this.form.value.ville,
          p5: this.form.value.ville,
          val1: this.form.value.code_postal,
          val2: this.form.value.code_postal,
          val3: this.form.value.code_postal,
          val4: this.form.value.code_postal,
          val5: this.form.value.code_postal,
          tsr: this.form.value.tarifsansremise,
          dom: this.form.value.domicialisation,
          pays: this.form.value.pays,
          pnet: this.form.value.totalPoids,
          tot: this.form.value.totalValeurs
        };
        this.http.post('http://localhost:8000/ajouter/envoi', envoiData).subscribe(
          response =>{
            console.log(envoiData);
            console.log("response",response);

            const pdfData = {
              desc: this.form.value.totDescs,
              p1: this.form.value.poids_net1,
              p2: this.form.value.poids_net2,
              p3: this.form.value.poids_net3,
              p4: this.form.value.poids_net4,
              p5: this.form.value.poids_net,
              val1: this.form.value.prix_total_ht1,
              val2: this.form.value.prix_total_ht2,
              val3: this.form.value.prix_total_ht3,
              val4: this.form.value.prix_total_ht4,
              val5: this.form.value.prix_total_ht,
              tsr: this.form.value.tarifsansremise,
              dom: this.form.value.domicialisation,
              crbt: this.form.value.crbtBool,
              pays: this.form.value.pays,
              pnet: this.form.value.totalPoids,
              tot: this.form.value.totalValeurs,
              id: this.form.value.codeenvoi,
              idbord: this.form.value.depot
            };
            this.http.post('http://localhost:8000/generatepdf', pdfData, {responseType:'blob'}).subscribe(
              response => {
                console.log(pdfData, response);
                const blob = new Blob([response],{type:'application/pdf'});
                if (window.navigator && window.navigator.msSaveOrOpenBlob){
                  window.navigator.msSaveOrOpenBlob(blob);
                  return;
                }
                const data = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href =data;
                link.download = this.form.value.codeenvoi+'-cn22.pdf';
                link.dispatchEvent(new MouseEvent('click',{bubbles: true,cancelable:true,view: window}));
                setTimeout(function (){
                  window.URL.revokeObjectURL(data);
                  link.remove();
                },100)
              },
              error => {
                console.log("data pdf-> ",pdfData);
                console.log(error);
              }
            );
            // this.pdfCN22();

          } ,
          error => {
            console.log("data envoi-> ",envoiData);
            console.log(error);
          }
        );
      },
      error => {
        console.log(error);

      }
    );



    const contenueEnvoisData = {
      code_envoi:this.idEnvoi,
      code_hs: this.form.value.code_hs,
      libelle_artique: this.form.value.libelle_artique,
      quantite: this.form.value.quantite,
      devise: this.form.value.devise,
      prix_total_ht: this.form.value.prix_total_ht,
      pays_origine: this.form.value.pays_origine,
      poids_net: this.form.value.poids_net,
    };
    const contenueEnvoisData1 = {
      code_envoi:this.idEnvoi,
      code_hs: this.form.value.code_hs1,
      libelle_artique: this.form.value.libelle_artique1,
      quantite: this.form.value.quantite1,
      devise: this.form.value.devise,
      prix_total_ht: this.form.value.prix_total_ht1,
      pays_origine: this.form.value.pays_origine1,
      poids_net: this.form.value.poids_net1,
    };
    const contenueEnvoisData2 = {
      code_envoi:this.idEnvoi,
      code_hs: this.form.value.code_hs2,
      libelle_artique: this.form.value.libelle_artique2,
      quantite: this.form.value.quantite2,
      devise: this.form.value.devise,
      prix_total_ht: this.form.value.prix_total_ht2,
      pays_origine: this.form.value.pays_origine2,
      poids_net: this.form.value.poids_net2,
    };
    const contenueEnvoisData3 = {
      code_envoi:this.idEnvoi,
      code_hs: this.form.value.code_hs3,
      libelle_artique: this.form.value.libelle_artique3,
      quantite: this.form.value.quantite3,
      devise: this.form.value.devise,
      prix_total_ht: this.form.value.prix_total_ht3,
      pays_origine: this.form.value.pays_origine3,
      poids_net: this.form.value.poids_net3,
    };
    const contenueEnvoisData4 = {
      code_envoi:this.idEnvoi,
      code_hs: this.form.value.code_hs4,
      libelle_artique: this.form.value.libelle_artique4,
      quantite: this.form.value.quantite4,
      devise: this.form.value.devise,
      prix_total_ht: this.form.value.prix_total_ht4,
      pays_origine: this.form.value.pays_origine4,
      poids_net: this.form.value.poids_net4
    };
  if (this.ajouterAdresse) {
  this.http.post('http://localhost:8000/ajouter/adresse', carnetAdrresseData).subscribe(
    response => console.log(this.adresses),
    error => {
      console.log(error);
    }
  );
  }
    this.http.get('http://localhost:8000/mesadresses/'+this.dataa).subscribe(
      result => {
        this.adresses = result;

      },
      error => {
        //this.router.navigate(['/public/home']);
      }
    );



    this.http.post('http://localhost:8000/ajouter/contenueEnvoi', contenueEnvoisData).subscribe(
      response =>console.log(this.adresses),
      error => {
        console.log(error);
      }

    );
    this.http.post('http://localhost:8000/ajouter/contenueEnvoi', contenueEnvoisData1).subscribe(
      response =>console.log(this.adresses),
      error => {
        console.log(error);

      }

    );
    this.http.post('http://localhost:8000/ajouter/contenueEnvoi', contenueEnvoisData2).subscribe(
      response =>console.log(this.adresses),
      error => {
        console.log(error);

      }

    );
    this.http.post('http://localhost:8000/ajouter/contenueEnvoi', contenueEnvoisData3).subscribe(
      response =>console.log(this.adresses),
      error => {

      }

    );
    this.http.post('http://localhost:8000/ajouter/contenueEnvoi', contenueEnvoisData4).subscribe(
      response =>console.log(this.adresses),
      error => {
        console.log(error);

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
                this.createDescription();
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


  }
  poid1(event:any){
    this.P1 = Number(event.target.value);
    this.totPoids = this.P + this.P1 + this.P2 + this.P3 + this.P4;
    this.numTranchee = this.numTranche1;
    this.http.get('http://localhost:8000/find/numtranche/'+this.P1).subscribe(
      result => {
        while (this.numTranche1 == this.numTranchee){
          this.numTranche1 =result;
          console.log(this.numTranche1.NumTranche);
          if (this.numTranche1 != this.numTranchee && this.codeZone1 != ""){
            this.tariff = this.tarif1;
            this.http.get('http://localhost:8000/find/tarifsansremise/'+this.numTranche1.NumTranche+'/'+this.codeZone1.codezone).subscribe(
              result => {
                while ( this.tariff == this.tarif1) {
                  this.tarif1 = result;
                  console.log(this.tarif1.tarif);
                  this.tarifSansRemise = Number(this.tarif.tarif) + Number(this.tarif1.tarif) + Number(this.tarif2.tarif) + Number(this.tarif3.tarif) + Number(this.tarif4.tarif);
                  this.createDescription();
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

  }
  poid2(event:any){
    this.P2 = Number(event.target.value);
    this.totPoids = this.P + this.P1 + this.P2 + this.P3 + this.P4;
    this.numTranchee = this.numTranche2;
    this.http.get('http://localhost:8000/find/numtranche/'+this.P2).subscribe(
      result => {
        while (this.numTranche2 == this.numTranchee){
          this.numTranche2 =result;
          console.log(this.numTranche2.NumTranche);
          if (this.numTranche2 != this.numTranchee && this.codeZone2 != ""){
            this.tariff = this.tarif2;
            this.http.get('http://localhost:8000/find/tarifsansremise/'+this.numTranche2.NumTranche+'/'+this.codeZone2.codezone).subscribe(
              result => {
                while ( this.tariff == this.tarif2) {
                  this.tarif2 = result;
                  console.log(this.tarif2.tarif);
                  this.tarifSansRemise = Number(this.tarif.tarif) + Number(this.tarif1.tarif) + Number(this.tarif2.tarif) + Number(this.tarif3.tarif) + Number(this.tarif4.tarif);
                  this.createDescription();
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

  }
  poid3(event:any){
    this.P3 = Number(event.target.value);
    this.totPoids = this.P + this.P1 + this.P2 + this.P3 + this.P4;
    this.numTranchee = this.numTranche3;
    this.http.get('http://localhost:8000/find/numtranche/'+this.P3).subscribe(
      result => {
        while (this.numTranche3 == this.numTranchee){
          this.numTranche3 =result;
          console.log(this.numTranche3.NumTranche);
          if (this.numTranche3 != this.numTranchee && this.codeZone3 != ""){
            this.tariff = this.tarif3;
            this.http.get('http://localhost:8000/find/tarifsansremise/'+this.numTranche3.NumTranche+'/'+this.codeZone3.codezone).subscribe(
              result => {
                while ( this.tariff == this.tarif3) {
                  this.tarif3 = result;
                  console.log(this.tarif3.tarif);
                  this.tarifSansRemise = Number(this.tarif.tarif) + Number(this.tarif1.tarif) + Number(this.tarif2.tarif) + Number(this.tarif3.tarif) + Number(this.tarif4.tarif);
                  this.createDescription();
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


  }
  poid4(event:any){
    this.P4 = Number(event.target.value);
    this.totPoids = this.P + this.P1 + this.P2 + this.P3 + this.P4;
    this.numTranchee = this.numTranche4;
    this.http.get('http://localhost:8000/find/numtranche/'+this.P4).subscribe(
      result => {
        while (this.numTranche4 == this.numTranchee){
          this.numTranche4 =result;
          console.log(this.numTranche4.NumTranche);
          if (this.numTranche4 != this.numTranchee && this.codeZone4 != ""){
            this.tariff = this.tarif4;
            this.http.get('http://localhost:8000/find/tarifsansremise/'+this.numTranche4.NumTranche+'/'+this.codeZone4.codezone).subscribe(
              result => {
                while ( this.tariff == this.tarif4) {
                  this.tarif4 = result;
                  console.log(this.tarif4.tarif);
                  this.tarifSansRemise = Number(this.tarif.tarif) + Number(this.tarif1.tarif) + Number(this.tarif2.tarif) + Number(this.tarif3.tarif) + Number(this.tarif4.tarif);
                  this.createDescription();
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


  }


  getQT(event:any){
    this.QT = Number(event.target.value);
    this.createDescription();
  }
  getQT1(event:any){
    this.QT1 = Number(event.target.value);
    this.createDescription();
  }
  getQT2(event:any){
    this.QT2 = Number(event.target.value);
    this.createDescription();
  }
  getQT3(event:any){
    this.QT3 = Number(event.target.value);
    this.createDescription();
  }
  getQT4(event:any){
    this.QT4 = Number(event.target.value);
    this.createDescription();
  }

  getValeur(event:any){
    this.valeur = Number(event.target.value);
    this.totValeurs = this.valeur + this.valeur1 + this.valeur2 + this.valeur3 + this.valeur4;
    this.createDescription();
  }
  getValeur1(event:any){
    this.valeur1 = Number(event.target.value);
    this.totValeurs = this.valeur + this.valeur1 + this.valeur2 + this.valeur3 + this.valeur4;
    this.createDescription();
  }
  getValeur2(event:any){
    this.valeur2 = Number(event.target.value);
    this.totValeurs = this.valeur + this.valeur1 + this.valeur2 + this.valeur3 + this.valeur4;
    this.createDescription();
  }
  getValeur3(event:any){
    this.valeur3 = Number(event.target.value);
    this.totValeurs = this.valeur + this.valeur1 + this.valeur2 + this.valeur3 + this.valeur4;
    this.createDescription();
  }
  getValeur4(event:any){
    this.valeur4 = Number(event.target.value);
    this.totValeurs = this.valeur + this.valeur1 + this.valeur2 + this.valeur3 + this.valeur4;
    this.createDescription();
  }

  createDescription(){
   // this.totDescs = '- '+ this.QT +' '+ this.desc +' '+ this.tarif.tarif +',\r\n- '+ this.QT1 +' '+ this.desc1 +' '+ this.tarif1.tarif +',\r\n- '+ this.QT2 +' '+ this.desc2 +' '+ this.tarif2.tarif +',\r\n- '+ this.QT3 +' '+ this.desc3 +' '+ this.tarif3.tarif +',\r\n- '+ this.QT4 +' '+ this.desc4 +' '+ this.tarif4.tarif;
    this.totDescs = '- '+ this.QT +' '+ this.desc +' '+ this.valeur +',\r\n- '+ this.QT1 +' '+ this.desc1 +' '+ this.valeur1 +',\r\n- '+ this.QT2 +' '+ this.desc2 +' '+ this.valeur2 +',\r\n- '+ this.QT3 +' '+ this.desc3 +' '+ this.valeur3 +',\r\n- '+ this.QT4 +' '+ this.desc4 +' '+ this.valeur4;
  }
  searchDesc(e:any){

    this.http.get('http://localhost:8000/find/CodeHs/'+e).subscribe(
      result => {
        this.descriptions =result;
        if ( this.descriptions == "" ){
          this.descriptions.nom ="Pas de résultats.";
          this.descriptions.key_word ="";
        }



      },
      error => {
        console.log(error);

      }
    );
  }
  onSelectDesc(CHS:any,description:number){


    switch(description) {
      case 0: {
        this.codeHs = CHS.code_hs;
        this.desc = CHS.key_word;
        this.createDescription();
        break;
      }
      case 1: {
        this.codeHs1 = CHS.code_hs;
        this.desc1 = CHS.key_word;
        this.createDescription();
        break;
      }
      case 2: {
        this.codeHs2 = CHS.code_hs;
        this.desc2 = CHS.key_word;
        this.createDescription();
        break;
      }
      case 3: {
        this.codeHs3 = CHS.code_hs;
        this.desc3 = CHS.key_word;
        this.createDescription();
        break;
      }
      case 4: {
        this.codeHs4 = CHS.code_hs;
        this.desc4 = CHS.key_word;
        this.createDescription();
        break;
      }
      default: {

        break;
      }
    }

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
                  this.createDescription();
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

  onChangepays1(e:any){
    this.codeZonee = this.codeZone1;
    this.http.get('http://localhost:8000/find/codezone/'+e).subscribe(
      result => {

        while (this.codeZone1 == this.codeZonee  ){
          this.codeZone1 = result;
          console.log(this.codeZone1.codezone);
          if (this.numTranche1 != "" && this.codeZone1 != this.codeZonee){
            this.tariff = this.tarif1;
            this.http.get('http://localhost:8000/find/tarifsansremise/'+this.numTranche1.NumTranche+'/'+this.codeZone1.codezone).subscribe(
              result => {
                while ( this.tariff == this.tarif1) {
                  this.tarif1 = result;
                  console.log(this.tarif1.tarif);
                  this.tarifSansRemise = Number(this.tarif.tarif) + Number(this.tarif1.tarif) + Number(this.tarif2.tarif) + Number(this.tarif3.tarif) + Number(this.tarif4.tarif);
                  this.createDescription();
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


  }

  onChangepays2(e:any){
    this.codeZonee = this.codeZone2;
    this.http.get('http://localhost:8000/find/codezone/'+e).subscribe(
      result => {

        while (this.codeZone2 == this.codeZonee  ){
          this.codeZone2 = result;
          console.log(this.codeZone2.codezone);
          if (this.numTranche2 != "" && this.codeZone2 != this.codeZonee){
            this.tariff = this.tarif2;
            this.http.get('http://localhost:8000/find/tarifsansremise/'+this.numTranche2.NumTranche+'/'+this.codeZone2.codezone).subscribe(
              result => {
                while ( this.tariff == this.tarif2) {
                  this.tarif2 = result;
                  console.log(this.tarif2.tarif);
                  this.tarifSansRemise = Number(this.tarif.tarif) + Number(this.tarif1.tarif) + Number(this.tarif2.tarif) + Number(this.tarif3.tarif) + Number(this.tarif4.tarif);
                  this.createDescription();
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
  }

  onChangepays3(e:any){
    this.codeZonee = this.codeZone3;
    this.http.get('http://localhost:8000/find/codezone/'+e).subscribe(
      result => {

        while (this.codeZone3 == this.codeZonee  ){
          this.codeZone3 = result;
          console.log(this.codeZone3.codezone);
          if (this.numTranche3 != "" && this.codeZone3 != this.codeZonee){
            this.tariff = this.tarif3;
            this.http.get('http://localhost:8000/find/tarifsansremise/'+this.numTranche3.NumTranche+'/'+this.codeZone3.codezone).subscribe(
              result => {
                while ( this.tariff == this.tarif3) {
                  this.tarif3 = result;
                  console.log(this.tarif3.tarif);
                  this.tarifSansRemise = Number(this.tarif.tarif) + Number(this.tarif1.tarif) + Number(this.tarif2.tarif) + Number(this.tarif3.tarif) + Number(this.tarif4.tarif);
                  this.createDescription();
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
  }


  onChangepays4(e:any){
    this.codeZonee = this.codeZone4;
    this.http.get('http://localhost:8000/find/codezone/'+e).subscribe(
      result => {

        while (this.codeZone4 == this.codeZonee  ){
          this.codeZone4 = result;
          console.log(this.codeZone4.codezone);
          if (this.numTranche4 != "" && this.codeZone4 != this.codeZonee){
            this.tariff = this.tarif4;
            this.http.get('http://localhost:8000/find/tarifsansremise/'+this.numTranche4.NumTranche+'/'+this.codeZone4.codezone).subscribe(
              result => {
                while ( this.tariff == this.tarif4) {
                  this.tarif4 = result;
                  console.log(this.tarif4.tarif);
                  this.tarifSansRemise = Number(this.tarif.tarif) + Number(this.tarif1.tarif) + Number(this.tarif2.tarif) + Number(this.tarif3.tarif) + Number(this.tarif4.tarif);
                  this.createDescription();
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

  }


  getNumTranche(p:any){
    this.http.get('http://localhost:8000/find/numtranche/'+p).subscribe(
      result => {
        this.numTranchee =result;

      },
      error => {
        console.log(error);

      }
    );
   //return this.numTranchee;
  }

  getTarif(nt:any,cz:any){
    //this.http.get('http://localhost:8000/find/tarifsansremise/'+nt+'/'+cz).subscribe(
    this.http.get('http://localhost:8000/find/tarifsansremise/17/NAT').subscribe(
      result => {
        this.tariff =result;
      },
      error => {
        console.log(error);
      }
    );
  }


  getCodeZone(p:any) {
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
  pdfCN22(){
    const pdfData = {
      desc: this.form.value.code_postal,
      p1: this.form.value.adresse,
      p2: this.form.value.adresse,
      p3: this.form.value.pays,
      p4: this.form.value.ville,
      p5: this.form.value.ville,
      val1: this.form.value.code_postal,
      val2: this.form.value.code_postal,
      val3: this.form.value.code_postal,
      val4: this.form.value.code_postal,
      val5: this.form.value.code_postal,
      tsr: this.form.value.tarifsansremise,
      dom: this.form.value.domicialisation,
      crbt: this.form.value.crbtVal,
      pays: this.form.value.pays,
      pnet: this.form.value.totalPoids,
      tot: this.form.value.totalValeurs,
    };
    this.http.post('http://localhost:8000/generatepdf', pdfData).subscribe(
      response => console.log(pdfData),
      error => {
        console.log("data pdf-> ",pdfData);
        console.log(error);
      }
    );
  }
}
