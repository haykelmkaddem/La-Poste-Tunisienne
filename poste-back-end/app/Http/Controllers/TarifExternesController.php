<?php

namespace App\Http\Controllers;

use App\Models\Tarif_externe;
use Illuminate\Http\Request;

class TarifExternesController extends Controller
{
    public function index(){
        return Tarif_externe::all();
    }

    public function Add(Request $request){
        Tarif_externe::updateOrCreate(
                ['codezone' => $request->codezone,'numtranche' => $request->numtranche],
            [
                'codezone' => $request->codezone,
                'numtranche' => $request->numtranche,
                'tarif' => $request->tarif,
                'tarifems' => $request->tarifems
            ]);
    }
}
