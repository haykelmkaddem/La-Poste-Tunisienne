<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Utilisateurcommerciale extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'code_client',
        'nom reson sociale',
        'mot_de_passe',
        'code_unite_com',
        'adresse',
        'cadresse',
        'localite',
        'code_postal',
        'telephone',
        'fax',
        'email',
        'REF_importateur',
        'ccp',
    ];
}
