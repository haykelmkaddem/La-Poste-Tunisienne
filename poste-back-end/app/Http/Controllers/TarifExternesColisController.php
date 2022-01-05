<?php

namespace App\Http\Controllers;

use App\Models\Tarif_externe;
use App\Models\Tarif_externe_colis;
use Illuminate\Http\Request;

class TarifExternesColisController extends Controller
{
    public function index(){
        return Tarif_externe_colis::all();
    }

    public function Add(Request $request){
        Tarif_externe_colis::updateOrCreate(
            ['codezone' => $request->codezone,'numtranche' => $request->numtranche],
            [
                'codezone' => $request->codezone,
                'numtranche' => $request->numtranche,
                'tarif' => $request->tarif
            ]);
    }
}
