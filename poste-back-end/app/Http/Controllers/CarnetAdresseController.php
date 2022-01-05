<?php

namespace App\Http\Controllers;

use App\Models\Carnetadresse;
use App\Models\Contenue_envoi;
use Illuminate\Http\Request;

class CarnetAdresseController extends Controller
{
    public function ajouter(Request $request){
        Carnetadresse::updateOrCreate(
            ['email' => $request->email],
            [
            'code_client' => $request->code_client,
            'destinataire' => $request->destinataire,
            'nom_raison' => 'nom_raison',
            'adresse' => $request->adresse,
            'c_adresse' => $request->c_adresse,
            'pays' => $request->pays,
            'ville' => $request->ville,
            'code_postal' => $request->code_postal,
            'gsm' => $request->gsm,
            'telephone' => $request->telephone,
            'fax' => $request->fax,
            'nom_aberge' => $request->nom_aberge,
            'email' => $request->email,

        ]);
        return response()->json([
            'message' => 'success',
            'data' => $request
        ]);
    }//

    public function myAdresses(Request $request)
    {
        $code_client = $request->id;
        $adresses = Carnetadresse::where('code_client', $code_client)->get();

        return $adresses;
    }

    public function selectedAdresse(Request $request)
    {
        $id = $request->id;
        $adresse = Carnetadresse::where('id', $id)->first();

        return $adresse;
    }
    public function updateAdresse(Request $request)
    {
        $id = $request->id;
        $Carnetadresse = Carnetadresse::find($id);

        $Carnetadresse->name = 'Paris to London';

        $Carnetadresse->save();
        return $Carnetadresse;
    }
    public function delete(Request $request)
    {
        $id = $request->id;
        $Carnetadresse = Carnetadresse::find($id);

        $Carnetadresse->delete();
        return response()->json([
            'message' => 'success'
        ]);
    }
    public function search(Request $request)
    {
        $text = $request->text;
        $code_client = $request->id;
        $adresses = Carnetadresse::where('destinataire', 'like', '%' . $text. '%')
            ->orWhere('email', 'like', '%' .$text. '%')
            ->orWhere('adresse', 'like', '%' .$text. '%')
            ->orWhere('pays', 'like', '%' .$text. '%')
            ->orWhere('ville', 'like', '%' .$text. '%')
            ->orWhere('telephone', 'like', '%' .$text. '%')
            ->orWhere('telephone', 'like', '%' .$text. '%')
            ->get();

        return $adresses;
    }
}
