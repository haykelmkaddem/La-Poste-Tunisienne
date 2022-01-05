<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Carnetadresse extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'code_client',
        'destinataire',
        'nom_raison',
        'adresse',
        'c_adresse',
        'pays',
        'ville',
        'code_postal',
        'gsm',
        'telephone',
        'fax',
        'nom_aberge',
        'email',
    ];
}

