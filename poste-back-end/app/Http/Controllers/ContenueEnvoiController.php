<?php

namespace App\Http\Controllers;

use App\Models\Contenue_envoi;
use Illuminate\Http\Request;

class ContenueEnvoiController extends Controller
{
    public function Ajouter(Request $request){

        Contenue_envoi::create([
            'code_envoi' => $request->code_envoi,
            'code_hs' => $request->code_hs,
            'libelle_artique' => $request->libelle_artique,
            'quantite' => $request->quantite,
            'devise' => $request->devise,
            'prix_total_ht' => $request->prix_total_ht,
            'pays_origine' => $request->pays_origine,
            'poids_net' => $request->poids_net,
            'index_cds' => 1
        ]);
        return response()->json([
            'message' => 'success'
        ]);
    }
    public function edit(Request $request){

        Contenue_envoi::update([
            'code_envoi' => $request->code_envoi],
            ['code_hs' => $request->code_hs,
            'libelle_artique' => $request->libelle_artique,
            'quantite' => $request->quantite,
            'devise' => $request->devise,
            'prix_total_ht' => $request->prix_total_ht,
            'pays_origine' => $request->pays_origine,
            'poids_net' => $request->poids_net,
            'index_cds' => 1
        ]);
        return response()->json([
            'message' => 'success'
        ]);
    }
}
