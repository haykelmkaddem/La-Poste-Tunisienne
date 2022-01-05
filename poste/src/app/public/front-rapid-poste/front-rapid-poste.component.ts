import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../user.service";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-front-rapid-poste',
  templateUrl: './front-rapid-poste.component.html',
  styleUrls: ['./front-rapid-poste.component.css'],
  providers: [DatePipe]
})
export class FrontRapidPosteComponent implements OnInit {

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
  poidvol: number = 0;
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
  envoix: any;
  idEnvoi: any;
  idEnvoix: any;
  listeEnvois:any;
  myDate: any;
  crbtVal:any;
  domicVal:any;
  taxeReel: any;
  crbt1: any;
  ok: any;
  pv:any;
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
      service: ['', Validators.required],
      poidSaisi: ['', Validators.required],
      longeur: ['', Validators.required],
      valeurColis: ['', Validators.required],
      domicVal: ['', Validators.required],
      depot: ['', Validators.required],
      codeenvoi: ['', Validators.required],
      domicialisation: ['', Validators.required],
      crbt: ['', Validators.required],
      crbtBool: ['', Validators.required],
      poidvol: ['', Validators.required],
      hauteur: ['', Validators.required],
      largeur: ['', Validators.required],
      tariff: ['', Validators.required],

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
        this.http.get('http://localhost:8000/cloture/'+this.idEnvoi+'/'+this.idDepot+'/rapid poste').subscribe(
          result => {
            this.ok =result;
            console.log("ok url=>",'http://localhost:8000/cloture/'+this.idEnvoi+'/'+this.form.value.depot+'/rapid%20poste');

            console.log("ok info =>",this.ok);
            this.ok = this.ok.cloture;
            console.log("ok =>", this.ok);

          },
          error => {
            console.log(error);

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
    this.http.get('http://localhost:8000/prNew/'+localStorage.getItem('id')).subscribe(
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
  dernierEnvoix(){
    this.http.get('http://localhost:8000/envoiNew/'+localStorage.getItem('id')).subscribe(
      result => {
        this.envoix = result;
        this.idEnvoix = this.envoi.id;
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
        this.dernierDepot();
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
          service: ['', Validators.required],
          poidSaisi: ['', Validators.required],
          longeur: ['', Validators.required],
          valeurColis: ['', Validators.required],
          domicVal: ['', Validators.required],
          depot: [this.idDepot, Validators.required],
          codeenvoi: [this.idEnvoi, Validators.required],
          domicialisation: ['', Validators.required],
          crbt: ['', Validators.required],
          crbtBool: ['', Validators.required],
          poidvol: [0, Validators.required],
          hauteur: ['', Validators.required],
          largeur: ['', Validators.required],
          tariff: ['', Validators.required],
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
    this.myDate = new Date();
    console.log(this.myDate);

    this.http.get('http://localhost:8000/find/crbt/'+this.form.value.tarifsansremise).subscribe(
      result => {

        this.crbtVal = result;
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
          categorie:'-',
          description:'-',
          service:'rapid poste',
          MAILITM_WEIGHT_estime:this.form.value.poidvol,
          TAXE_estime:this.form.value.tariff,
          taxe_avec_remise: null,
          INFOS_COUNTRY_DEST:this.form.value.pays,
          CUSTOMER_NAME:this.form.value.destinataire,
          CUSTOMER_ADDRESS:this.form.value.adresse,
          CUSTOMER_CITY:this.form.value.ville,
          CUSTOMER_POST_CODE:this.form.value.code_postal,
          CUSTOMER_PHONE:this.form.value.telephone,
          CUSTOMER_GSM:this.form.value.gsm,
          CUSTOMER_MAIL:this.form.value.email,
          crbt:this.form.value.crbtBool,
          taxe_reel: this.tarif + this.crbtVal +this.domicVal
        };
        this.http.post('http://localhost:8000/ajouter/envoi', envoiData).subscribe(
          response => console.log(envoiData),
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

    this.dernierEnvoi();


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

    this.http.get('http://localhost:8000/get/tarif/'+this.form.value.poidvol+'/'+this.form.value.pays+'/'+this.form.value.service).subscribe(
      result => {
        this.tariff = result;
        console.log(this.tariff);
        this.tariff = this.tariff.tarif;
        this.http.get('http://localhost:8000/get/tarif/'+this.form.value.poidvol+'/'+this.form.value.pays+'/'+this.form.value.service).subscribe(
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

    this.http.get('http://localhost:8000/get/tarif/'+this.form.value.poidvol+'/'+this.form.value.pays+'/'+this.form.value.service).subscribe(
      result => {
        this.tariff = result;
        console.log(this.tariff);
        this.tariff = this.tariff.tarif;
        this.http.get('http://localhost:8000/get/tarif/'+this.form.value.poidvol+'/'+this.form.value.pays+'/'+this.form.value.service).subscribe(
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
}
