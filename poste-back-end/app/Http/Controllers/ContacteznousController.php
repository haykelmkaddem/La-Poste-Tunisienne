<?php

namespace App\Http\Controllers;

use App\Models\Contacteznous;
use Illuminate\Http\Request;

class ContacteznousController extends Controller
{
    public function addContact(Request $request){

        Contacteznous::create([
            'nom' => $request->nom,
            'email' => $request->email,
            'sujet' => $request->sujet,
            'message' => $request->message
        ]);
        return response()->json([
            'message' => 'success'
        ]);
    }
}
