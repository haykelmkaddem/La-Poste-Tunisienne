<?php

namespace App\Http\Controllers;

use App\Models\Bordereaudepotdepot;
use Haruncpi\LaravelIdGenerator\IdGenerator;
use Illuminate\Http\Request;
use phpseclib3\Math\PrimeField\Integer;

class BordereaudepotController extends Controller
{
    public function index(){
       return  Bordereaudepotdepot::all();
    }
    public function ajouter(string $n){
        $id = IdGenerator::generate(['table' => 'bordereaudepotdepots', 'field' =>'code_bordereau', 'length' => 14, 'prefix' =>'CP']);
        $id= $id . 'TN';
        Bordereaudepotdepot::create([
            'code_bordereau' =>$id,
            'date_bordereau' => date('Y-m-d'),
            'etat_borderaux' => "non-cloturer",
            'code_client_depot' => "code_client_depot",
            'code_client' => $n ,
            'code_service' => "ce",
            'validation' => 1,
            'date_validation' => date('Y-m-d'),
            'anne_depot' => date('Y'),
            'mois_depot' => date('m'),
            'montant_depot_sr' => 12,
            'montant_avec_remise' => 15,
            'mnt_tax_vd' => 13,
            'registre_decommerce' => 'registre_decommerce',
            'reception' => 5,
            'date_reception' => date('Y-m-d'),
            'matricule_reception' => 1,
            'demande_collecte' => 1,
            'etat_collecte' => 1,
            'date_collecte' => date('Y-m-d'),
        ]);
        return $id;
    }

    public function dernierDepot(Request $request)
    {
        $code_client = $request->id;
        $depot = Bordereaudepotdepot::where('code_client', $code_client)->where('etat_borderaux' , "non-cloturer")->first();

        if(!$depot){
            $this->ajouter($code_client);
            $depot = Bordereaudepotdepot::where('code_client', $code_client)->where('etat_borderaux' , "non-cloturer")->first();
        }
        return $depot;
    }

    public function cloturerDepot(Request $request)
    {
        $code_client = $request->id;
        $depot = Bordereaudepotdepot::where('code_client', $code_client)->where('etat_borderaux' , "non-cloturer")->update(['etat_borderaux' => 'cloturer']);

        return $code_client;
    }
    public function bordParClient(Request $request){
        return  Bordereaudepotdepot::where('code_client',$request->id)->get();
     }
}
