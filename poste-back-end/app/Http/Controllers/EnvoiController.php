<?php

namespace App\Http\Controllers;

use App\Models\Bordereaudepotdepot;
use App\Models\Codespays;
use App\Models\Envois;
use App\Models\Tarif_externe_colis;
use App\Models\Tarif_vd;
use App\Models\TarifsExterne;
use App\Models\Tranchecolis;
use App\Models\Tranchepoidexterne;
use App\Models\Utilisateurcommerciale;
use Barryvdh\DomPDF\Facade as PDF;
use Haruncpi\LaravelIdGenerator\IdGenerator;
use Illuminate\Http\Request;

class EnvoiController extends Controller
{
    public function alll(){
        return Envois::all();
    }
    public function generatePdf(Request $request){
        $data =[
            'desc'=> $request->desc,
            'p1'=> $request->p1,
            'p2'=> $request->p2,
            'p3'=> $request->p3,
            'p4'=> $request->p4,
            'p5'=> $request->p5,
            'val1'=> $request->val1,
            'val2'=> $request->val2,
            'val3'=> $request->val3,
            'val4'=> $request->val4,
            'val5'=> $request->val5,
            'tsr'=> $request->tsr,
            'dom'=> $request->dom,
            'crbt'=> $request->crbt,
            'pays'=> $request->pays,
            'pnet'=> $request->pnet,
            'tot'=> $request->tot,
        ];

        $pdf = PDF::loadView('cn22',$data);
        $pdf->setOptions(['DOMPDF_ENABLE_CSS_FLOAT' => true]);
        $pdf->download('cn22.pdf');
        return $pdf->download('cn22.pdf');
    }
    public function ajouterEnvois(Request $request){
    $infoClient =  Utilisateurcommerciale::where('code_client',$request->CODE_CLIENT)->first();
        $nom = "nom reson sociale";
        $pays = $request->ORIGINE_COUNTRY_CD;
         $code = Codespays::where('name', $pays)->first();
         $code1 = Codespays::where('name', $request->INFOS_COUNTRY_DEST)->first();
        $numB = Bordereaudepotdepot::where('code_client', $request->CODE_CLIENT)->count();
        $today = date('Y-m-d H:i:s');

        Envois::create([
            'id' => $request->id,
            'CODE_CLIENT' => $request->CODE_CLIENT,
            'code_BORDREAU' => $request->code_BORDREAU,
            'NUM_BORDREAU_CLIENT' => $numB,//a faire
            'MAILITM_FID' => '-',
            'NATURE' => $request->NATURE,
            'categorie' => $request->categorie,
            'description' => $request->description,
            'service' => $request->service,
            'MAILITM_WEIGHT_estime' => $request->MAILITM_WEIGHT_estime,
            'TAXE_estime' => $request->TAXE_estime,
            'taxe_avec_remise' => $request->taxe_avec_remise,
            'INFOS_COUNTRY_DEST' => $request->INFOS_COUNTRY_DEST,
            'DEST_COUNTRY_CD' =>  $code1->code,
            'EVT_GMT_DT' => '-',
            'CUSTOMER_NAME' => $request->CUSTOMER_NAME,
            'CUSTOMER_ADDRESS' => $request->CUSTOMER_ADDRESS,
            'CUSTOMER_CITY' => $request->CUSTOMER_CITY,
            'CUSTOMER_POST_CODE' => $request->CUSTOMER_POST_CODE,
            'CUSTOMER_PHONE' => $request->CUSTOMER_PHONE,
            'CUSTOMER_GSM' => $request->CUSTOMER_GSM,
            'CUSTOMER_MAIL' => $request->CUSTOMER_MAIL,
            'adressee_NAME' => $infoClient->$nom,
            'adressee_ADDRESS' => $infoClient->adresse,
            'adressee_CITY' => $infoClient->cadresse,
            'adressee_POST_CODE' => $infoClient->code_postal,
            'adressee_pHONE' => $infoClient->telephone,
            'adressee_GSM' => $infoClient->telephone,
            'adressee_MAIL' => $infoClient->email,
            'ORIGINE_COUNTRY_CD' => $request->ORIGINE_COUNTRY_CD,
            'INFOS_COUNTRY_CD' => $code1->code,
            'dateheuredepot' => $today ,
            'cloture' => 0,
            'crbt' => 'y',
            //'crbt' => $request->crbt,
            'Mnt_crbt' => $request->Mnt_crbt,
            'taxe_reel' => $request->taxe_reel,
            //'taxe_reel' => 1,
            'REF_client' => $infoClient->REF_client,
        ]);
        $pdf = EnvoiController::generatePdf($request);
        //generatePdf($request);
        if ($pdf == null){
            $pdfinfo = "null";
        }else{
            $pdfinfo = "notnull";
        }
        return response()->json([
            'message' => 'success',
            '$pdfinfo' => $pdfinfo

        ]);
    }
    public function dernierEnvoi(Request $request)
    {
        $id = IdGenerator::generate(['table' => 'envois', 'field' =>'id', 'length' => 11, 'prefix' =>'CN', 'reset_on_prefix_change' => true]);
        $id= $id . 'TN';
        return response()->json([
            'id' =>  $id
        ]);

    }
    public function dernierRp(Request $request)
    {
        $id = IdGenerator::generate(['table' => 'envois', 'field' =>'id', 'length' => 11, 'prefix' =>'CE', 'reset_on_prefix_change' => true]);
        $id= $id . 'TN';
        return response()->json([
            'id' =>  $id
        ]);

    }

    public function tarifSansRemise(Request $request){
        //$tarifSansRemise
        $nt = $request->nt;
        $cz = $request->cz;
        $tarifSansRemise = Tarif_externe_colis::where('codezone', $cz)->where('numtranche', $nt)->first('tarif');
        return $tarifSansRemise;
    }
    public function tarifRp(Request $request){
        //$tarifSansRemise
        $nt = $request->nt;
        $cz = $request->cz;
        $tarifrp= TarifsExterne::where('codezone', $cz)->where('numtranche', $nt)->first('tarif');
        return $tarifrp;
    }
    public function tarifemsRp(Request $request){
        //$tarifSansRemise
        $nt = $request->nt;
        $cz = $request->cz;
        $tarifrp= TarifsExterne::where('codezone', $cz)->where('numtranche', $nt)->first('tarifems');
        return $tarifrp;
    }




    public function getNumTranche(Request $request){
        $poid = $request->poid;
        $NT = Tranchecolis::where('BorneInf','<=', $poid)->where('BorneSup','>=', $poid)->first('NumTranche');
        return $NT;
    }

    public function getCrbt(Request $request){
        $tsr = $request->tsr;
        $crbt = Tarif_vd::where('born_min','<=', $tsr)->where('born_max','>=', $tsr)->first('tarif');
        return $crbt;
    }
    public function envoiParB(Request $request){
      return  Envois::where('code_BORDREAU', $request->code)->where('CODE_CLIENT', $request->id)->get();
    }

    public function getNumTrancheRp(Request $request){
        $poid = $request->poid;
        $NT = Tranchepoidexterne::where('BorneInf','<=', $poid)->where('BorneSup','>=', $poid)->first('NumTranche');
        return $NT;
    }

    public function gettarif(Request $request){
        $poid = $request->poid;
        $pays = $request->pays;
        $s = $request->service;



        $cz = Codespays::where('name', $pays)->first('codezone');
        $nt = Tranchepoidexterne::where('BorneInf','<=', $poid)->where('BorneSup','>=', $poid)->first('NumTranche');

    if ($s == "ems"){
        $tarif= TarifsExterne::where('codezone', $cz->codezone)->where('numtranche', $nt->NumTranche)->first('tarifems');
        $tarif = $tarif->tarifems;
    }else
        {
        $tarif= TarifsExterne::where('codezone', $cz->codezone)->where('numtranche',  $nt->NumTranche)->first('tarif');
            $tarif = $tarif->tarif;
    }


        return response()->json([
            'poid' =>  $poid,
            'pays' =>  $pays,
            's' =>  $s,
            'cz' =>  $cz->codezone,
            'nt' =>   $nt->NumTranche,
            'tarif' =>   $tarif
        ]);


    }

    public function cloture(Request $request){

        $service = Envois::where('code_BORDREAU', $request->code)->first('service');
        if ($service == null){
            $cl = true;
        }else{
            if ($service->service == $request->service){
                $cl = true;
            }else{
                $cl = false;
            }
        }
        return response()->json([

            'service' =>  $service,
            'passed service' =>  $request->service,
            'codeenvoi' =>  $request->id,
            'code' =>  $request->code,
            'cloture' =>  $cl

        ]);
    }
    public function editEnvois(Request $request){
        $infoClient =  Utilisateurcommerciale::where('code_client',$request->CODE_CLIENT)->first();
        $nom = "nom reson sociale";
        $pays = $request->ORIGINE_COUNTRY_CD;
        $code = Codespays::where('name', $pays)->first();
        $code1 = Codespays::where('name', $request->INFOS_COUNTRY_DEST)->first();
        $numB = Bordereaudepotdepot::where('code_client', $request->CODE_CLIENT)->count();
        $today = date('Y-m-d H:i:s');

        Envois::update([
            'id' => $request->id,
            'CODE_CLIENT' => $request->CODE_CLIENT,
            'code_BORDREAU' => $request->code_BORDREAU,
            'NUM_BORDREAU_CLIENT' => $numB,//a faire
            'MAILITM_FID' => '-',
            'NATURE' => $request->NATURE,
            'categorie' => $request->categorie,
            'description' => $request->description,
            'service' => $request->service,
            'MAILITM_WEIGHT_estime' => $request->MAILITM_WEIGHT_estime,
            'TAXE_estime' => $request->TAXE_estime,
            'taxe_avec_remise' => $request->taxe_avec_remise,
            'INFOS_COUNTRY_DEST' => $request->INFOS_COUNTRY_DEST,
            'DEST_COUNTRY_CD' =>  $code1->code,
            'EVT_GMT_DT' => '-',
            'CUSTOMER_NAME' => $request->CUSTOMER_NAME,
            'CUSTOMER_ADDRESS' => $request->CUSTOMER_ADDRESS,
            'CUSTOMER_CITY' => $request->CUSTOMER_CITY,
            'CUSTOMER_POST_CODE' => $request->CUSTOMER_POST_CODE,
            'CUSTOMER_PHONE' => $request->CUSTOMER_PHONE,
            'CUSTOMER_GSM' => $request->CUSTOMER_GSM,
            'CUSTOMER_MAIL' => $request->CUSTOMER_MAIL,
            'adressee_NAME' => $infoClient->$nom,
            'adressee_ADDRESS' => $infoClient->adresse,
            'adressee_CITY' => $infoClient->cadresse,
            'adressee_POST_CODE' => $infoClient->code_postal,
            'adressee_pHONE' => $infoClient->telephone,
            'adressee_GSM' => $infoClient->telephone,
            'adressee_MAIL' => $infoClient->email,
            'ORIGINE_COUNTRY_CD' => $request->ORIGINE_COUNTRY_CD,
            'INFOS_COUNTRY_CD' => $code1->code,
            'dateheuredepot' => $today ,
            'cloture' => 0,
            'crbt' => 'y',
            //'crbt' => $request->crbt,
            'Mnt_crbt' => $request->Mnt_crbt,
            'taxe_reel' => $request->taxe_reel,
            //'taxe_reel' => 1,
            'REF_client' => $infoClient->REF_client,
        ]);
        $pdf = EnvoiController::generatePdf($request);
        //generatePdf($request);
        if ($pdf == null){
            $pdfinfo = "null";
        }else{
            $pdfinfo = "notnull";
        }
        return response()->json([
            'message' => 'success',
            '$pdfinfo' => $pdfinfo

        ]);
    }
}
