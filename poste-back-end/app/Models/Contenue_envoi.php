<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contenue_envoi extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'code_contenue',
        'code_envoi',
        'code_hs',
        'libelle_artique',
        'quantite',
        'devise',
        'prix_total_ht',
        'pays_origine',
        'poids_net',
        'index_cds'
    ];
}
