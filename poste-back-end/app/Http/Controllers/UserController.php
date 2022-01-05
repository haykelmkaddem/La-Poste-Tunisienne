<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRegisterRequest;
use App\Mail\myMail;
use App\Models\RecupererMdp;
use App\Models\User;
use App\Models\Utilisateurcommerciale;
use Haruncpi\LaravelIdGenerator\IdGenerator;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

//use Mail;

class UserController extends Controller
{
    public function index()
    {
        return User::all();
    }

    public function user(Request $request)
    {
        return $request->user();
    }

    public function registerAdmin(UserRegisterRequest $request)
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

    public function signInUser(Request $request)
    {
        $code_client = $request->username;
        $mot_de_passe = $request->password;


        if (Utilisateurcommerciale::where('code_client', $code_client)->count() <= 0) return response(array("message" => "ID does not exist"), 400);

        $user = Utilisateurcommerciale::where('code_client', $code_client)->first();

        if (password_verify($mot_de_passe, $user->mot_de_passe)) {


            return response(array("message" => "Sign In Successful", "data" => [
                "user" => $user,

            ]), 200);
        } else {
            return response(array("message" => "Wrong Credentials."), 400);
        }
    }
    public function userCom(Request $request)
    {
        $code_client = $request->id;
        $userc = Utilisateurcommerciale::where('code_client', $code_client)->first();

        return $userc;
    }
    public function sendMail(Request $request)
    {
        $token = md5(uniqid(rand(), true));
       $data = [
         'token'=> $token
       ];

       RecupererMdp::create([
           'email' => $request->email,
           'token' => $token
       ]);
       $user['to']=$request->email;
        /*Mail::send('email.name', ['data1' => $details], function ($m) {

            $m->to('bensamir.medamine@gmail.com')->subject('Contact Form Mail!');
        });
        return response()->json(["message" => "Email sent successfully."]);*/

        Mail::send('mail',$data,function ($message) use ($user){
            $message->to($user['to']);
            $message->subject('Tentative de récupération compte');
        });
    }

    public function verifyToken(Request $request){
        $token = $request->token;
        $email = $request->email;
        RecupererMdp::where('token', $token)
            ->update(['verified' => 1]);


        return redirect('http://localhost:4200/public/resetpassword/'.$token);
    }

    public function changePassword(Request $request){
        $mdp = $request->newmdp;
        $email = $request->email;
        $token = $request->token;

        $email1 = RecupererMdp::where('token', $token)
            ->where('verified', 1)
            ->where('email', $email)
            ->first()->email;
            Utilisateurcommerciale::where('email', $email1)
                ->update(['mot_de_passe' => Hash::make($mdp)]);





        return response()->json([
            'message' => 'success'
        ]);
    }



}
