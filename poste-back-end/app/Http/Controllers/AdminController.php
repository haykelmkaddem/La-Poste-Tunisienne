<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRegisterRequest;
use App\Models\RecupererMdp;
use App\Models\User;//Admin
use App\Models\Utilisateurcommerciale;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Haruncpi\LaravelIdGenerator\IdGenerator;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class AdminController extends Controller
{

    public function user(Request $request) {
        return $request->user();
    }
    public function addAdmin(UserRegisterRequest $request)
    {

        User::create([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'login' => $request->login,
            'role' => $request->role,
            'password' => Hash::make($request->password)
        ]);
        return response()->json([
            'message' => 'success'
        ]);

    }
    public function listUtilisateurs() {
        return Utilisateurcommerciale::all();
    }
    public function addUser(Request $request)
    {
        $mdp = Str::random(8);
        $id = IdGenerator::generate(['table' => 'utilisateurcommerciales', 'field' =>'code_client', 'length' => 10, 'prefix' =>'UC-']);
        Utilisateurcommerciale::create([
            'code_client' => $id,
            'nom reson sociale' => $request->nomresonsociale ,
            'code_unite_com' => $request->code_unite_com,
            'adresse' => $request->adresse,
            'cadresse' => $request->cadresse,
            'localite' => $request->localite,
            'code_postal' => $request->code_postal,
            'telephone' => $request->telephone,
            'fax' => $request->fax,
            'email' => $request->email,
            'REF_importateur' => $request->REF_importateur,
            'ccp' => $request->ccp,
            'mot_de_passe' => Hash::make($mdp)
        ]);
        $data = [
            'login'=>  $id,
            'mdp' =>  $mdp
        ];

        $user['to']=$request->email;

        Mail::send('success',$data,function ($message) use ($user){
            $message->to($user['to']);
            $message->subject('Compte creer avec succes');
        });
        return response()->json([
            'message' => 'success',
            'code_client' => $id
        ]);

    }

    public function editUser(Request $request)
    {

        Utilisateurcommerciale::where('code_client',$request->code_client)->update([
            'nom reson sociale' => $request->nomresonsociale ,
            'code_unite_com' => $request->code_unite_com,
            'adresse' => $request->adresse,
            'cadresse' => $request->cadresse,
            'localite' => $request->localite,
            'code_postal' => $request->code_postal,
            'telephone' => $request->telephone,
            'fax' => $request->fax,
            'email' => $request->email,
            'REF_importateur' => $request->REF_importateur,
            'ccp' => $request->ccp,
            'mot_de_passe' => Hash::make($request->mot_de_passe)
        ]);
        return response()->json([
            'message' => 'success',
            'mdp' => $request->nomresonsociale,
            'code_client' => $request->mot_de_passe
        ]);
    }
    public function changerEtat(Request $request){
        $code = $request->code;
        Utilisateurcommerciale::where('code_client',$code)
            ->update(['etat' => 0]);

        return response()->json([
            'message' => 'success',
        ]);
    }
    public function changerEtatTo1(Request $request){
        $code = $request->code;
        Utilisateurcommerciale::where('code_client',$code)
            ->update(['etat' => 1]);

        return response()->json([
            'message' => 'success',
        ]);
    }
}
