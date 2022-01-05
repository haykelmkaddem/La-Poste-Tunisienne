<?php

namespace App\Http\Controllers;

use App\Models\Codespays;
use App\Models\Zone;
use Illuminate\Http\Request;

class PaysController extends Controller
{
    public function indexZone(){
        return Zone::all();
    }

    public function findAll(){
        return Codespays::all();
    }

    public function codeZone(Request $request){
        $pays = $request->pays;
        $cz = Codespays::where('name', $pays)->first('codezone');

        return $cz;
    }
    public function codePays(Request $request){
        $pays = $request->pays;
        $cz = Codespays::where('name', $pays)->first('code');

        return $cz;
    }
    public function addpays(Request $request){

        Codespays::updateOrCreate(
            ['name' => $request->name],
            [
            'code' => $request->code,
            'name' => $request->name,
            'groupe' => $request->groupe,
            'codecoursier' => $request->codecoursier,
            'codezone' => $request->codezone,
            'langue' => $request->langue
        ]);
        return response()->json([
            'message' => 'success'
        ]);
    }

    public function addzone(Request $request){

        Zone::create([
            'code_zone' => $request->code_zone,
            'nom_zone' => $request->nom_zone,
            'created_at' => $request->created_at,
            'updated_at' => $request->updated_at

        ]);
        return response()->json([
            'message' => 'success'
        ]);
    }
}
