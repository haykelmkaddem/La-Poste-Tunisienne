<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class Bordereaudepotdepot extends Model
{
    use HasFactory;

    protected $fillable = [
        'code_bordereau',
        'date_bordereau',
        'etat_borderaux',
        'code_client_depot',
        'code_client',
        'code_service',
        'validation',
        'date_validation',
        'anne_depot',
        'mois_depot',
        'montant_depot_sr',
        'montant_avec_remise',
        'mnt_tax_vd',
        'registre_decommerce',
        'reception',
        'date_reception',
        'matricule_reception',
        'demande_collecte',
        'etat_collecte',
        'date_collecte'
    ];
}
