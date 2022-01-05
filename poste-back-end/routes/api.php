<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Orion\Facades\Orion;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/', '\App\Http\Controllers\UserController@index');
Route::get('/user', '\App\Http\Controllers\UserController@user')->middleware('auth:api');
Route::get('/userCom/{id}', '\App\Http\Controllers\UserController@userCom');
// UC //
    //-> LOGIN
Route::post('/signin/uc', '\App\Http\Controllers\UserController@signInUser');


Route::post('/ajouter/adresse', '\App\Http\Controllers\CarnetAdresseController@ajouter');
Route::get('/mesadresses/{id}', '\App\Http\Controllers\CarnetAdresseController@myAdresses');
Route::get('/adresse/{id}', '\App\Http\Controllers\CarnetAdresseController@selectedAdresse');
Route::get('/adresse/delete/{id}', '\App\Http\Controllers\CarnetAdresseController@delete');
Route::get('/adresse/search/{text}', '\App\Http\Controllers\CarnetAdresseController@search');
Route::get('/find/CodeHs/{search}', '\App\Http\Controllers\CodeHsController@find');
Route::get('/find/CodeHs', '\App\Http\Controllers\CodeHsController@findAll');
Route::get('/find/codezone/{pays}', '\App\Http\Controllers\PaysController@codeZone');
Route::get('/find/numtranche/{poid}', '\App\Http\Controllers\EnvoiController@getNumTranche');
Route::get('/find/numtrancheRp/{poid}', '\App\Http\Controllers\EnvoiController@getNumTrancheRp');
Route::get('/find/crbt/{tsr}', '\App\Http\Controllers\EnvoiController@getCrbt');
Route::get('/find/tarifsansremise/{nt}/{cz}', '\App\Http\Controllers\EnvoiController@tarifSansRemise');
Route::get('/find/tarifrp/{nt}/{cz}', '\App\Http\Controllers\EnvoiController@tarifRp');
Route::get('/find/tarifemsrp/{nt}/{cz}', '\App\Http\Controllers\EnvoiController@tarifemsRp');


Route::get('/get/tarif/{poid}/{pays}/{service}', '\App\Http\Controllers\EnvoiController@gettarif');
Route::get('/cloture/{id}/{code}/{service}', '\App\Http\Controllers\EnvoiController@cloture');

Route::get('/pays', '\App\Http\Controllers\PaysController@findAll');
Route::get('/depot/{id}', '\App\Http\Controllers\BordereaudepotController@dernierDepot');
Route::get('/envoiNew/{id}', '\App\Http\Controllers\EnvoiController@dernierEnvoi');
Route::get('/prNew/{id}', '\App\Http\Controllers\EnvoiController@dernierRp');
Route::get('/envoiparb/{code}/{id}', '\App\Http\Controllers\EnvoiController@envoiParB');
Route::post('/update/depot/', '\App\Http\Controllers\BordereaudepotController@cloturerDepot');

Route::post('/ajouter/contenueEnvoi', '\App\Http\Controllers\ContenueEnvoiController@ajouter');

// DASHBOARD //
    //-> ADMIN <-//

//--> AJOUTER
Route::post('/ajouter/uc', '\App\Http\Controllers\AdminController@AddUser');//Ajouter UC
Route::post('/editUser/uc', '\App\Http\Controllers\AdminController@editUser');//Ajouter UC
Route::post('/register', '\App\Http\Controllers\UserController@register');//Ajouter Admin
Route::get('/mailsend/{email}', '\App\Http\Controllers\UserController@sendMail');//Ajouter Admin
Route::get('/recupererCompte/{token}', '\App\Http\Controllers\UserController@verifyToken');//Ajouter Admin
Route::post('/changePassword', '\App\Http\Controllers\UserController@changePassword');//Ajouter Admin


Route::post('/ajouter/bordereau', '\App\Http\Controllers\BordereaudepotController@ajouter');
Route::get('/find/bordereau/{id}', '\App\Http\Controllers\BordereaudepotController@bordParClient');
Route::post('/ajouter/envoi', '\App\Http\Controllers\EnvoiController@ajouterEnvois');
Route::post('/ajouter/pays', '\App\Http\Controllers\PaysController@addpays');
Route::post('/ajouter/zone', '\App\Http\Controllers\PaysController@addzone');

Route::post('/ajouter/Tarif/externe', '\App\Http\Controllers\TarifExternesController@Add');
Route::get('/Tarif/externe', '\App\Http\Controllers\TarifExternesController@index');

Route::post('/ajouter/Tarif/externecolis', '\App\Http\Controllers\TarifExternesColisController@Add');
Route::get('/Tarif/externecolis', '\App\Http\Controllers\TarifExternesColisController@index');



//--> AFFICHER
Route::get('/users', '\App\Http\Controllers\AdminController@listUtilisateurs');
Route::get('/changerEtatUC/{code}', '\App\Http\Controllers\AdminController@changerEtat');
Route::get('/changerEtatUCTo0/{code}', '\App\Http\Controllers\AdminController@changerEtatTo1');
Route::get('/allll', '\App\Http\Controllers\EnvoiController@alll');


Route::post('/add/contact', '\App\Http\Controllers\ContacteznousController@addContact');


Route::post('/generatepdf', '\App\Http\Controllers\PdfController@generatePdf');


Orion::resource('userC', \App\Models\Utilisateurcommerciale::class);
//Orion::resource('/carnetadresses', \App\Models\Contenue_envoi::class);


